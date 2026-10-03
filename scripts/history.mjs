import { writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, validate } from './catalog.mjs';
export function historyText(catalog = validate()) {
  const sorted = [...catalog.lessons].sort((a,b)=>b.date.localeCompare(a.date));
  const lines = ['# Histórico de temas — Depois do Deploy', '', '> Gerado a partir de `content/catalog.json`. Não editar este arquivo diretamente.', '', '“Apresentado” significa que a edição existe e foi disponibilizada no acervo. “Estudado” exige confirmação do leitor. Para evitar repetição, considerar ambos os estados.', ''];
  for(const topic of catalog.topics){
    lines.push(`## ${topic.name}`, '');
    const lessons=sorted.filter(l=>l.topic===topic.id);
    if(!lessons.length)lines.push('Nenhuma edição apresentada.', '');
    for(const lesson of lessons)lines.push(`### ${lesson.id} — ${lesson.title}`, '', `- Data: ${lesson.date}`, `- Nível: ${lesson.level}`, `- Estado: ${lesson.status==='studied'?'estudado':'apresentado'}`, ...(lesson.studiedAt?[`- Estudo confirmado em: ${lesson.studiedAt}`]:[]), `- Identidade do objetivo: \`${lesson.focusKey}\``, `- Objetivo: ${lesson.objective}`, `- Conceitos: ${lesson.concepts.join(', ')}`, `- Edição: [HTML](${lesson.source})`, '', lesson.summary, '');
  }
  return lines.join('\n');
}
export function writeHistory(catalog){writeFileSync(path.join(root,'HISTORICO.md'),historyText(catalog));}
if(import.meta.url===pathToFileURL(process.argv[1]).href){writeHistory(validate());console.log('Histórico atualizado.');}
