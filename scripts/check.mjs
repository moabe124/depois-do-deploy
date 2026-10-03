import { readFileSync } from 'node:fs';
import path from 'node:path';
import { root, validate } from './catalog.mjs';
import { historyText } from './history.mjs';
const catalog=validate();
if(readFileSync(path.join(root,'HISTORICO.md'),'utf8')!==historyText(catalog))throw Error('Histórico desatualizado. Execute npm run history.');
console.log(`Catálogo e histórico válidos: ${catalog.lessons.length} edição(ões), ${catalog.topics.length} categorias; sem objetivos duplicados.`);
