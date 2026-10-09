import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const destination = Object.freeze({
  project: 'gestao-familiar-1c9a1',
  target: 'depois-do-deploy',
  site: 'depois-do-deploy-moabe124',
  url: 'https://depois-do-deploy-moabe124.web.app',
});
const root = fileURLToPath(new URL('../', import.meta.url));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const json = async file => JSON.parse(await readFile(file, 'utf8'));

function assertRevision(revision) {
  if (!/^[a-f0-9]{40}$/.test(revision ?? '')) throw Error('Informe o SHA completo do commit.');
}

export async function checkDestination(directory = root) {
  const config = await json(path.join(directory, 'firebase.json'));
  const rc = await json(path.join(directory, '.firebaserc'));
  const sites = rc.targets?.[destination.project]?.hosting?.[destination.target];
  if (rc.projects?.default !== destination.project ||
      Array.isArray(config.hosting) || config.hosting?.target !== destination.target ||
      config.hosting?.public !== 'dist' || config.hosting?.site ||
      !Array.isArray(sites) || sites.length !== 1 || sites[0] !== destination.site) {
    throw Error('Destino inválido: somente o target e o site dedicados são permitidos.');
  }
  if (config.hosting.predeploy || config.hosting.postdeploy) {
    throw Error('Hooks de Hosting devem ser revisados antes de habilitar no CD.');
  }
}

async function listFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) files.push(...await listFiles(path.join(directory, entry.name), relative + '/'));
    else if (entry.isFile() && relative !== 'deploy.json') files.push(relative);
    else if (!entry.isFile()) throw Error(`Tipo de arquivo não permitido: ${relative}`);
  }
  return files.sort();
}

async function manifest(directory, revision) {
  assertRevision(revision);
  const dist = path.join(directory, 'dist');
  const files = await listFiles(dist);
  if (!files.includes('index.html') || !files.includes('catalog.json')) throw Error('Build incompleto.');
  const hashes = {};
  for (const file of files) hashes[file] = sha256(await readFile(path.join(dist, file)));
  return { revision, site: destination.site, files: hashes };
}

export async function prepare(revision, directory = root) {
  await checkDestination(directory);
  const data = await manifest(directory, revision);
  await writeFile(path.join(directory, 'dist/deploy.json'), JSON.stringify(data, null, 2) + '\n');
  return data;
}

export async function checkArtifact(revision, directory = root) {
  await checkDestination(directory);
  const expected = await manifest(directory, revision);
  const recorded = await json(path.join(directory, 'dist/deploy.json'));
  if (JSON.stringify(recorded) !== JSON.stringify(expected)) throw Error('Artefato não corresponde à revisão ou aos arquivos registrados.');
  return expected;
}

export async function verify(revision, {
  directory = root, fetchImpl = fetch, attempts = 6,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
} = {}) {
  const expected = await checkArtifact(revision, directory);
  const entries = Object.entries(expected.files);
  const request = async file => {
    const encoded = file.split('/').map(encodeURIComponent).join('/');
    const response = await fetchImpl(`${destination.url}/${encoded}?revision=${revision}`, {
      cache: 'no-store', signal: AbortSignal.timeout(30_000), redirect: 'error',
    });
    if (response.status !== 200) throw Error(`${file}: HTTP ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  };
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const published = JSON.parse((await request('deploy.json')).toString('utf8'));
      if (JSON.stringify(published) !== JSON.stringify(expected)) throw Error('A URL ainda não serve a revisão esperada.');
      // Quatro requisições simultâneas; inclui HTML, catálogo, animações e posters.
      for (let start = 0; start < entries.length; start += 4) {
        await Promise.all(entries.slice(start, start + 4).map(async ([file, hash]) => {
          if (sha256(await request(file)) !== hash) throw Error(`${file}: conteúdo publicado diferente do build.`);
        }));
      }
      return { revision, count: entries.length, url: destination.url };
    } catch (error) {
      if (attempt === attempts) throw error;
      console.log(`Verificação ${attempt}/${attempts}: ${error.message} Nova tentativa em 10 s.`);
      await sleep(10_000);
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command, revision] = process.argv.slice(2);
  try {
    if (command === 'prepare') {
      const data = await prepare(revision);
      console.log(`Build registrado: ${data.revision}, ${Object.keys(data.files).length} arquivos.`);
    } else if (command === 'check') {
      await checkArtifact(revision);
      console.log('Target dedicado e artefato conferidos.');
    } else if (command === 'verify') {
      const result = await verify(revision);
      console.log(`Publicação confirmada: ${result.revision}, ${result.count} arquivos em ${result.url}.`);
    } else throw Error('Uso: node scripts/deploy.mjs prepare|check|verify <commit-sha>');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
