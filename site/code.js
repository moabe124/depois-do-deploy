// Blocos de código com aparência de editor (docs/FORMATO.md › Blocos de código).
// Destaca a sintaxe de <pre data-lang="..."><code> sem dependências externas e acrescenta o botão Copiar.
// O texto do código não muda: só ganha <span class="tk-..."> em volta dos trechos reconhecidos.
const palavras = lista => `\\b(?:${lista.split(' ').join('|')})\\b`;
const TEXTO = `"(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'`;
const NUMERO = `\\b\\d[\\d_]*(?:\\.\\d+)?[LlFfDd]?\\b`;
const TIPO = `\\b[A-Z][A-Za-z0-9_]*\\b`;
const FUNCAO = `\\b[a-z_$][\\w$]*(?=\\s*\\()`;
const JAVA = 'abstract assert boolean break byte case catch char class continue default do double else enum extends final finally float for if implements import instanceof int interface long new package private protected public record return short static super switch synchronized this throw throws transient try var void volatile while yield true false null';
const JS = 'async await break case catch class const continue default delete do else export extends false finally for from function if import in instanceof let new null of return static super switch this throw true try typeof undefined var void while yield';
const SQL = 'select from where join inner left right outer on and or not null is in as group by order having limit offset insert into values update set delete create table index primary key foreign references distinct count sum avg min max between like case when then else end union all asc desc';
const LINGUAGENS = {
  java: { nome: 'Java', regras: [['comentario', `//[^\\n]*|/\\*[\\s\\S]*?\\*/`], ['texto', TEXTO], ['anotacao', `@[A-Za-z_][\\w]*`], ['palavra', palavras(JAVA)], ['numero', NUMERO], ['tipo', TIPO], ['funcao', FUNCAO]] },
  js: { nome: 'JavaScript', regras: [['comentario', `//[^\\n]*|/\\*[\\s\\S]*?\\*/`], ['texto', TEXTO + '|`(?:[^`\\\\]|\\\\.)*`'], ['palavra', palavras(JS)], ['numero', NUMERO], ['tipo', TIPO], ['funcao', FUNCAO]] },
  sql: { nome: 'SQL', flags: 'i', regras: [['comentario', `--[^\\n]*`], ['texto', `'(?:[^'\\n]|'')*'`], ['palavra', palavras(SQL)], ['numero', NUMERO]] },
  properties: { nome: 'Properties', flags: 'm', regras: [['comentario', `^\\s*[#!][^\\n]*`], ['chave', `^[\\w.\\-\\[\\]<>]+(?=\\s*[=:])`], ['numero', NUMERO]] },
  yaml: { nome: 'YAML', flags: 'm', regras: [['comentario', `#[^\\n]*`], ['texto', TEXTO], ['chave', `^\\s*[\\w.\\-]+(?=:)`], ['numero', NUMERO]] },
  json: { nome: 'JSON', regras: [['chave', `"(?:[^"\\\\\\n]|\\\\.)*"(?=\\s*:)`], ['texto', TEXTO], ['palavra', palavras('true false null')], ['numero', NUMERO]] },
  bash: { nome: 'Terminal', regras: [['comentario', `#[^\\n]*`], ['texto', TEXTO], ['palavra', palavras('npm npx node git cd export sudo curl')]] },
  http: { nome: 'HTTP', flags: 'm', regras: [['chave', `^[\\w-]+(?=:)`], ['palavra', palavras('GET POST PUT PATCH DELETE HTTP')]] },
  texto: { nome: 'Texto', regras: [] }
};
LINGUAGENS.ts = { ...LINGUAGENS.js, nome: 'TypeScript' };
for (const lang of Object.values(LINGUAGENS)) {
  if (lang.regras.length) lang.re = new RegExp(lang.regras.map(([nome, fonte]) => `(?<${nome}>${fonte})`).join('|'), 'g' + (lang.flags || ''));
}

function destacar(code, lang) {
  const texto = code.textContent, frag = document.createDocumentFragment();
  let fim = 0;
  for (const m of texto.matchAll(lang.re)) {
    if (!m[0]) continue;
    const tipo = Object.keys(m.groups).find(k => m.groups[k] !== undefined);
    if (m.index > fim) frag.append(texto.slice(fim, m.index));
    const span = document.createElement('span');
    span.className = 'tk-' + tipo; span.textContent = m[0];
    frag.append(span); fim = m.index + m[0].length;
  }
  frag.append(texto.slice(fim));
  code.replaceChildren(frag);
}

for (const pre of document.querySelectorAll('pre[data-lang]')) {
  const code = pre.querySelector(':scope > code'), lang = LINGUAGENS[pre.dataset.lang];
  if (!code) continue;
  if (!pre.dataset.rotulo && lang) pre.dataset.rotulo = lang.nome;
  // Só destaca código em texto puro, para não desfazer marcação escrita à mão.
  if (lang?.re && !code.children.length) destacar(code, lang);
  if (!navigator.clipboard) continue;
  const botao = document.createElement('button');
  botao.type = 'button'; botao.className = 'code-copy'; botao.textContent = 'Copiar';
  botao.setAttribute('aria-label', `Copiar código${pre.dataset.rotulo ? ' de ' + pre.dataset.rotulo : ''}`);
  botao.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(code.textContent); botao.textContent = 'Copiado'; }
    catch { botao.textContent = 'Selecione e copie'; }
    setTimeout(() => { botao.textContent = 'Copiar'; }, 2000);
  });
  pre.prepend(botao);
}
