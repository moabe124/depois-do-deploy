import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Edições a partir desta data precisam do modo apresentação em slides (docs/FORMATO.md).
const PRESENTATION_SINCE = '2026-10-31';
// Edições a partir desta data fecham cada parte da apresentação com uma revisão só de cards (docs/FORMATO.md).
const REVIEW_CARDS_SINCE = '2026-11-09';
// Edições a partir desta data precisam das hashtags de divulgação (docs/FORMATO.md).
const HASHTAGS_SINCE = '2026-11-04';
// Edições a partir desta data marcam cada bloco de código com a linguagem, para o estilo de editor (docs/FORMATO.md).
const CODE_EDITOR_SINCE = '2026-11-12';
const CODE_LANGS = ['java','js','ts','sql','properties','yaml','json','bash','http','texto'];
const HASHTAG = /^#[\p{L}\p{N}_]+$/u;
export const readCatalog =() => JSON.parse(readFileSync(path.join(root, 'content/catalog.json'), 'utf8'));
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
    if(lesson.quiz){
      assert(typeof lesson.quiz.version==='string' && lesson.quiz.questions.length>0 && lesson.quiz.questions.length<=50, `Questionário inválido: ${lesson.id}`);
      const questions=new Set();
      for(const q of lesson.quiz.questions){
        assert(slug.test(q.id) && !questions.has(q.id) && q.options.includes(q.correct), `Pergunta inválida: ${lesson.id}/${q.id}`);
        assert(html.includes(`data-question-id="${q.id}"`) && q.options.every(option=>html.includes(`data-answer="${option}"`)), `Pergunta sem controles no HTML: ${lesson.id}/${q.id}`);
        questions.add(q.id);
      }
    }
    if(lesson.date>=PRESENTATION_SINCE){
      assert(html.includes('<template id="apresentacao"'), `Modo apresentação ausente: ${lesson.id}`);
      assert(html.includes('data-texto="'), `Apresentação sem slides de texto integral: ${lesson.id}`);
    }
    if(lesson.date>=REVIEW_CARDS_SINCE||html.includes('slide-resumo')){
      const deck=html.match(/<template id="apresentacao"[^>]*>([\s\S]*?)<\/template>/)?.[1]||'';
      const slides=[...deck.matchAll(/<section class="slide([^"]*)"([^>]*)>([\s\S]*?)<\/section>/g)].map(([,classes,attrs,body])=>({revisao:/\bslide-resumo\b/.test(classes),texto:attrs.match(/data-texto="([^"]+)"/)?.[1],body}));
      for(const slide of slides.filter(s=>s.revisao)){
        const cards=(slide.body.match(/class="slide-card[" ]/g)||[]).length;
        assert(cards>=2 && cards<=6 && slide.body.includes('<aside class="notes">') && !/<(?:ul|ol|table|pre|video)\b|slide-(?:list|table|code|race|key|demo)/.test(slide.body), `Revisão da apresentação precisa de 2 a 6 cards, notas e nada além dos cards: ${lesson.id}`);
      }
      // Cada parte de estudo (todo texto integral de seção #id, exceto o desafio) termina com exatamente uma revisão.
      slides.forEach((slide,i)=>{
        if(!slide.texto?.startsWith('#') || slide.texto==='#challenge')return;
        const fim=slides.findIndex((s,j)=>j>i && s.texto),grupo=slides.slice(i+1,fim<0?slides.length:fim);
        assert(grupo.filter(s=>s.revisao).length===1 && grupo.at(-1)?.revisao, `Parte da apresentação sem uma revisão em cards no fim: ${lesson.id}/${slide.texto}`);
      });
    }
    if(lesson.date>=HASHTAGS_SINCE||lesson.hashtags){
      const limits={youtube:[3,15],linkedin:[3,5]};
      assert(lesson.hashtags && typeof lesson.hashtags==='object', `Hashtags ausentes: ${lesson.id}`);
      for(const [network,[min,max]] of Object.entries(limits)){
        const tags=lesson.hashtags[network];
        assert(Array.isArray(tags) && tags.length>=min && tags.length<=max, `Hashtags de ${network} devem ter de ${min} a ${max}: ${lesson.id}`);
        assert(tags.every(tag=>HASHTAG.test(tag)) && new Set(tags.map(tag=>tag.toLowerCase())).size===tags.length, `Hashtag inválida ou repetida em ${network}: ${lesson.id}`);
        assert(html.includes(`id="tags-${network}">${tags.join(' ')}</p>`), `Hashtags de ${network} do HTML diferem do catálogo: ${lesson.id}`);
      }
    }
    if(lesson.date>=CODE_EDITOR_SINCE){
      for(const [tag] of html.matchAll(/<pre\b[^>]*>/g))assert(CODE_LANGS.includes(tag.match(/data-lang="([^"]+)"/)?.[1]), `Bloco de código sem data-lang válido (${CODE_LANGS.join(', ')}): ${lesson.id}`);
    }
    for(const [,id] of html.matchAll(/data-texto="#([^"]+)"/g))assert(html.includes(`id="${id}"`), `Slide de texto aponta para seção inexistente: ${lesson.id}/#${id}`);
    assert(/<html lang="pt-BR">/.test(html) && /<title>.+<\/title>/.test(html), `Metadados ausentes: ${lesson.id}`);
    assert(!/sk_live_|BEGIN PRIVATE KEY|ghp_[A-Za-z0-9]{20}/.test(html), `Possível credencial no HTML: ${lesson.id}`);
    ids.add(lesson.id); focuses.add(`${lesson.topic}/${lesson.focusKey}`); urls.add(lesson.url); sources.add(lesson.source);
  }
  return catalog;
}
export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
