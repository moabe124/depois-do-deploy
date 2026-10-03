import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { root, validate, escapeHtml as h } from './catalog.mjs';
import { historyText } from './history.mjs';
const catalog=validate();
if(readFileSync(path.join(root,'HISTORICO.md'),'utf8')!==historyText(catalog))throw Error('Histórico desatualizado. Execute npm run history.');
const output=path.join(root,'dist');mkdirSync(output,{recursive:true});
for(const file of ['styles.css','library.js','favicon.svg','404.html'])copyFileSync(path.join(root,'site',file),path.join(output,file));
mkdirSync(path.join(output,'assets'),{recursive:true});
for(const file of ['cafe-idempotente.gif','cafe-idempotente-poster.png'])copyFileSync(path.join(root,'site','assets',file),path.join(output,'assets',file));
const levels={iniciante:'Iniciante',intermediario:'Intermediário',avancado:'Avançado'};
const cards=[...catalog.lessons].sort((a,b)=>b.date.localeCompare(a.date)).map(l=>`<article class="lesson" data-topic="${h(l.topic)}"><div class="lesson-meta"><span>${h(catalog.topics.find(t=>t.id===l.topic).name)}</span><span>${h(l.date.split('-').reverse().join('/'))}</span></div><h2><a href="${h(l.url)}">${h(l.title)}</a></h2><p>${h(l.objective)}</p><div class="tags"><span>${levels[l.level]}</span><span>${l.minutes.essential}–${l.minutes.full} min</span><span>${l.status==='studied'?'Estudo confirmado':'Disponível'}</span></div><a class="read" href="${h(l.url)}">Ler edição <span aria-hidden="true">↗</span></a></article>`).join('\n');
const topics=catalog.topics.map(t=>`<button type="button" class="topic" data-filter="${h(t.id)}" aria-pressed="false"><span class="topic-name">${h(t.name)}</span><span class="topic-count">${catalog.lessons.filter(l=>l.topic===t.id).length} ${catalog.lessons.filter(l=>l.topic===t.id).length===1?'edição':'edições'}</span><span class="topic-description">${h(t.description)}</span></button>`).join('\n');
let home=readFileSync(path.join(root,'site/index.html'),'utf8').replace('{{TOPICS}}',topics).replace('{{LESSONS}}',cards).replace('{{COUNT}}',String(catalog.lessons.length));
writeFileSync(path.join(output,'index.html'),home);
for(const lesson of catalog.lessons){const dest=path.join(output,lesson.url);mkdirSync(path.dirname(dest),{recursive:true});let html=readFileSync(path.join(root,lesson.source),'utf8');html=html.replace('</head>','<link rel="icon" type="image/svg+xml" href="../../favicon.svg">\n<meta name="description" content="'+h(lesson.objective)+'">\n</head>');html=html.replace('<div class="wrap">','<div class="wrap"><nav aria-label="Biblioteca" style="padding-top:20px;font:14px Segoe UI,sans-serif"><a href="../../index.html">← Biblioteca / '+h(catalog.topics.find(t=>t.id===lesson.topic).name)+'</a></nav>');writeFileSync(dest,html);}
writeFileSync(path.join(output,'catalog.json'),JSON.stringify(catalog,null,2)+'\n');
console.log(`Site gerado em dist/: ${catalog.lessons.length} edição(ões).`);
