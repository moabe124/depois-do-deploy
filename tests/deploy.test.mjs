import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { prepare, checkArtifact, verify, destination } from '../scripts/deploy.mjs';

const revision = 'a'.repeat(40);
async function fixture(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'depois-deploy-test-'));
  t.after(() => {
    assert.equal(path.dirname(path.resolve(directory)), path.resolve(tmpdir()));
    assert.ok(path.basename(directory).startsWith('depois-deploy-test-'));
    return rm(directory, { recursive: true, force: true });
  });
  await mkdir(path.join(directory, 'dist/assets'), { recursive: true });
  await writeFile(path.join(directory, 'firebase.json'), JSON.stringify({ hosting: { target: destination.target, public: 'dist' } }));
  await writeFile(path.join(directory, '.firebaserc'), JSON.stringify({
    projects: { default: destination.project },
    targets: { [destination.project]: { hosting: { [destination.target]: [destination.site] } } },
  }));
  for (const [file, content] of [['index.html', '<h1>Acervo</h1>'], ['catalog.json', '{}'], ['assets/example.mp4', 'video']]) {
    await writeFile(path.join(directory, 'dist', file), content);
  }
  return directory;
}
const remote = directory => async url => {
  assert.equal(new URL(url).origin, destination.url);
  try {
    return new Response(await readFile(path.join(directory, 'dist', decodeURIComponent(new URL(url).pathname))), { status: 200 });
  } catch { return new Response('Não encontrado', { status: 404 }); }
};

test('recusa configuração com site direto, target diferente e hooks de deploy', async t => {
  const directory = await fixture(t);
  for (const hosting of [
    { target: 'default', public: 'dist' },
    { site: destination.project, public: 'dist' },
    { target: destination.target, public: 'dist', predeploy: ['outro comando'] },
  ]) {
    await writeFile(path.join(directory, 'firebase.json'), JSON.stringify({ hosting }));
    await assert.rejects(prepare(revision, directory), /Destino inválido|Hooks de Hosting/);
  }
});

test('recusa o site padrão e mapeamentos para múltiplos sites', async t => {
  const directory = await fixture(t);
  await writeFile(path.join(directory, '.firebaserc'), JSON.stringify({
    projects: { default: destination.project },
    targets: { [destination.project]: { hosting: { [destination.target]: [destination.site, destination.project] } } },
  }));
  await assert.rejects(prepare(revision, directory), /Destino inválido/);
});
test('recusa artefato alterado ou revisão diferente', async t => {
  const directory = await fixture(t);
  await prepare(revision, directory);
  await assert.rejects(checkArtifact('b'.repeat(40), directory), /Artefato não corresponde/);
  await writeFile(path.join(directory, 'dist/index.html'), 'alterado');
  await assert.rejects(checkArtifact(revision, directory), /Artefato não corresponde/);
});
test('confirma HTTP 200 e hashes, incluindo mídia', async t => {
  const directory = await fixture(t);
  await prepare(revision, directory);
  const result = await verify(revision, { directory, fetchImpl: remote(directory), attempts: 1 });
  assert.equal(result.count, 3);
});
test('falha se uma animação retornar 404 ou bytes diferentes', async t => {
  const directory = await fixture(t);
  await prepare(revision, directory);
  for (const response of [new Response('faltou', { status: 404 }), new Response('corrompido')]) {
    await assert.rejects(verify(revision, {
      directory, attempts: 1,
      fetchImpl: url => url.includes('example.mp4') ? response : remote(directory)(url),
    }), /HTTP 404|conteúdo publicado diferente/);
  }
});
test('aguarda propagação, mas não aceita a revisão antiga como sucesso', async t => {
  const directory = await fixture(t);
  await prepare(revision, directory);
  let calls = 0;
  let waits = 0;
  const result = await verify(revision, {
    directory, attempts: 2, sleep: async () => { waits++; },
    fetchImpl: url => url.includes('deploy.json') && calls++ === 0
      ? new Response(JSON.stringify({ revision: 'b'.repeat(40) })) : remote(directory)(url),
  });
  assert.equal(result.revision, revision);
  assert.equal(waits, 1);
  await assert.rejects(verify(revision, {
    directory, attempts: 1, fetchImpl: async () => new Response('{}'),
  }), /revisão esperada/);
});
