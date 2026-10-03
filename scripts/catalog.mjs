import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const readCatalog = () => JSON.parse(readFileSync(path.join(root, 'content/catalog.json'), 'utf8'));
export function validate(catalog = readCatalog()) {
  const topics = new Set(), ids = new Set(), focuses = new Set(), urls = new Set(), sources = new Set();
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  assert(Array.isArray(catalog.topics) && Array.isArray(catalog.lessons), 'Catálogo incompleto.');
  for (const topic of catalog.topics) {
    assert(slug.test(topic.id) && !topics.has(topic.id), `Categoria inválida ou duplicada: ${topic.id}`);
    assert(['active','planned'].includes(topic.status), `Status de categoria inválido: ${topic.id}`);
    assert(topic.name && topic.description, `Categoria sem nome ou descrição: ${topic.id}`);
    topics.add(topic.id);
  }
  for (const lesson of catalog.lessons) {
    assert(slug.test(lesson.id) && !ids.has(lesson.id), `ID inválido ou duplicado: ${lesson.id}`);
    assert(topics.has(lesson.topic), `Categoria desconhecida: ${lesson.topic}`);
    assert(slug.test(lesson.focusKey) && !focuses.has(`${lesson.topic}/${lesson.focusKey}`), `Objetivo repetido: ${lesson.focusKey}`);
    assert(['iniciante','intermediario','avancado'].includes(lesson.level), `Nível inválido: ${lesson.id}`);
    assert(['presented','studied'].includes(lesson.status), `Status inválido: ${lesson.id}`);
    const date = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
    assert(date(lesson.date), `Data inválida: ${lesson.id}`);
    assert(lesson.status !== 'studied' || date(lesson.studiedAt), `Estudada sem data confirmada: ${lesson.id}`);
    assert(lesson.status !== 'presented' || lesson.studiedAt === null, `Apresentada com data de estudo: ${lesson.id}`);
    assert(lesson.title && lesson.objective && lesson.summary, `Edição sem título, objetivo ou resumo: ${lesson.id}`);
    assert(Array.isArray(lesson.concepts) && lesson.concepts.length > 0, `Conceitos ausentes: ${lesson.id}`);
    assert(Array.isArray(lesson.references) && lesson.references.length > 0 && lesson.references.every(ref => /^https:\/\//.test(ref)), `Fontes inválidas: ${lesson.id}`);
    assert(lesson.minutes.essential > 0 && lesson.minutes.full >= lesson.minutes.essential, `Duração inválida: ${lesson.id}`);
    assert(lesson.source.startsWith(`content/${lesson.topic}/`) && lesson.source.endsWith('.html') && !lesson.source.includes('..'), `Origem inválida: ${lesson.id}`);
    assert(lesson.url.startsWith(`temas/${lesson.topic}/`) && lesson.url.endsWith('.html') && !lesson.url.includes('..'), `URL inválida: ${lesson.id}`);
    assert(!urls.has(lesson.url) && !sources.has(lesson.source), `Arquivo ou URL repetidos: ${lesson.id}`);
    assert(existsSync(path.join(root, lesson.source)), `HTML ausente: ${lesson.source}`);
    const html = readFileSync(path.join(root,lesson.source),'utf8');
    assert(/<html lang="pt-BR">/.test(html) && /<title>.+<\/title>/.test(html), `Metadados ausentes: ${lesson.id}`);
    assert(!/sk_live_|BEGIN PRIVATE KEY|ghp_[A-Za-z0-9]{20}/.test(html), `Possível credencial no HTML: ${lesson.id}`);
    ids.add(lesson.id); focuses.add(`${lesson.topic}/${lesson.focusKey}`); urls.add(lesson.url); sources.add(lesson.source);
  }
  return catalog;
}
export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
