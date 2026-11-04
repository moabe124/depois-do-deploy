// Modo apresentação do artigo (obrigatório nas novas edições; ver docs/FORMATO.md).
// A edição declara os slides em <template id="apresentacao" data-tema="...">:
// - <section class="slide"> escrita à mão vira um slide 16:9 (1280×720, escalado para a tela);
// - <section class="slide" data-texto="#id"></section> traz o texto integral daquele bloco do artigo,
//   paginado em quantos slides couberem; data-parte="n" escolhe a n-ésima subseção (h3 ou details),
//   data-titulo e data-rotulo trocam o título e o sobretítulo;
// - [data-frag] aparece a cada avanço, na ordem do número (ou do documento);
// - <aside class="notes"> traz as notas do apresentador, visíveis só com a tecla N.
const template=document.getElementById('apresentacao');
if(template?.content.querySelector('.slide')&&typeof HTMLDialogElement==='function'){
  const W=1280,H=720;
  const deck=document.createElement('dialog');
  deck.className='deck';deck.setAttribute('aria-label','Apresentação do artigo');
  deck.innerHTML='<div class="deck-viewport"><div class="deck-stage" tabindex="-1"><div class="deck-bar"><span><i aria-hidden="true"></i><b>Depois do Deploy</b> · <span data-deck-tema></span></span><span class="deck-count" data-deck-count></span></div><div class="deck-slides"></div><div class="deck-progress" aria-hidden="true"><i></i></div></div></div><section class="deck-notes" aria-label="Notas do apresentador" hidden><strong data-deck-notes-title></strong><p data-deck-notes></p></section><div class="deck-controls"><button type="button" data-deck="prev">Anterior</button><button type="button" data-deck="next">Próximo</button><button type="button" data-deck="notes" aria-pressed="false">Notas (N)</button><button type="button" data-deck="black" aria-pressed="false">Tela preta (B)</button><button type="button" data-deck="full">Tela cheia (F)</button><button type="button" data-deck="close">Sair (Esc)</button></div><div class="deck-black" hidden></div><p class="deck-sr" aria-live="polite"></p>';
  const q=selector=>deck.querySelector(selector);
  const stage=q('.deck-stage'),notas=q('.deck-notes'),preto=q('.deck-black'),caixa=q('.deck-slides');
  caixa.append(template.content.cloneNode(true));
  q('[data-deck-tema]').textContent=template.dataset.tema||'';
  for(const slide of caixa.querySelectorAll(':scope > .slide'))slide.hidden=true;
  document.body.append(deck);
  // Vídeos sem a barra nativa, que poluiria a gravação: P ou um clique tocam e pausam.
  const alternarVideo=video=>video.paused?video.play().catch(()=>{}):video.pause();
  for(const video of caixa.querySelectorAll('video')){video.controls=false;video.style.cursor='pointer';video.addEventListener('click',()=>alternarVideo(video));}

  // Texto integral: copia os blocos do artigo e descarta o que não é texto de estudo.
  const IGNORAR='.eyebrow,h1,h2,summary,figure,dialog,script,template,noscript,.lab-card,.choices,.feedback,.caption,.static-option';
  function limpar(el){
    const copia=el.cloneNode(true);
    for(const x of [copia,...copia.querySelectorAll('*')]){x.removeAttribute('id');x.removeAttribute('aria-labelledby');x.removeAttribute('aria-describedby');x.removeAttribute('hidden');x.classList.remove('full-only');}
    for(const a of copia.querySelectorAll('a'))if(/^\[\d+\]$/.test(a.textContent.trim()))a.remove();
    return copia;
  }
  function blocos(el){
    if(el.matches(IGNORAR))return [];
    if(el.matches('details')){
      const titulo=document.createElement('h3'),resumo=el.querySelector('summary');
      const nivel=resumo?.querySelector('.level')?.textContent.trim(),texto=[...(resumo?.childNodes||[])].filter(n=>!(n.nodeType===1&&n.classList.contains('level'))).map(n=>n.textContent).join('').trim();
      titulo.textContent=nivel?`${nivel} · ${texto}`:texto;
      return [{el:titulo,quebra:true,manter:true},...[...(el.querySelector('.detail-body')||el).children].flatMap(blocos)];
    }
    if(el.matches('.quiz-question')){
      const itens=[],titulo=el.querySelector('h3');
      if(titulo)itens.push({el:limpar(titulo),quebra:true,manter:true});
      for(const p of el.querySelectorAll(':scope > p:not(.feedback)'))itens.push({el:limpar(p)});
      const opcoes=[...el.querySelectorAll('[data-answer]')];
      if(opcoes.length){const ol=document.createElement('ol');ol.className='slide-options';opcoes.forEach((botao,i)=>{const li=document.createElement('li'),letra=document.createElement('b');letra.textContent=String.fromCharCode(65+i);li.append(letra,...limpar(botao).childNodes);ol.append(li);});itens.push({el:ol});}
      const resposta=el.querySelector('details .detail-body');
      if(resposta){const div=document.createElement('div');div.className='slide-resposta';div.dataset.frag='';div.append(...[...resposta.children].map(limpar));itens.push({el:div});}
      return itens;
    }
    return [{el:limpar(el),manter:el.matches('h3')}];
  }
  function partes(fonte){
    const grupos=[[]];
    for(const el of fonte.children){if(el.matches('h3,details:not(.static-option)')&&grupos.at(-1).some(x=>!x.matches('.eyebrow,h1,h2')))grupos.push([]);grupos.at(-1).push(el);}
    return grupos;
  }
  // Pagina medindo no próprio palco (o dialog precisa estar aberto): cada bloco vai para o slide atual
  // até transbordar. Um título no topo do slide vira o título do slide; títulos não ficam sozinhos no fim.
  function expandir(declaracao){
    const fonte=document.querySelector(declaracao.dataset.texto);
    if(!fonte){declaracao.remove();return;}
    let titulo=declaracao.dataset.titulo||fonte.querySelector(':scope > h2, :scope > h1')?.textContent.trim()||'';
    const rotulo=declaracao.dataset.rotulo||fonte.querySelector(':scope > .eyebrow')?.textContent.trim()||'';
    const grupo=declaracao.dataset.parte===undefined?[...fonte.children]:partes(fonte)[Number(declaracao.dataset.parte)]||[];
    const fila=grupo.flatMap(blocos),titulos=new Set(fila.filter(item=>item.manter).map(item=>item.el)),paginas=[];
    const nova=()=>{const slide=document.createElement('section'),eyebrow=document.createElement('p'),h2=document.createElement('h2'),corpo=document.createElement('div');slide.className='slide slide-texto';eyebrow.className='slide-eyebrow';eyebrow.textContent=(rotulo?`${rotulo} · `:'')+'texto do artigo · 9 de 9';h2.textContent=titulo;corpo.className='slide-texto-corpo';slide.append(eyebrow,h2,corpo);caixa.insertBefore(slide,declaracao);paginas.push(slide);return corpo;};
    const transborda=corpo=>corpo.parentElement.scrollHeight>corpo.parentElement.clientHeight+1;
    const colocar=(corpo,el)=>{if(!corpo.childElementCount&&titulos.has(el)){titulo=el.textContent.trim();corpo.parentElement.querySelector('h2').textContent=titulo;}else corpo.append(el);};
    let corpo=nova();
    for(let i=0;i<fila.length;i++){
      const {el,quebra}=fila[i];
      if(quebra&&corpo.childElementCount)corpo=nova();
      colocar(corpo,el);
      if(!el.isConnected||!transborda(corpo))continue;
      // Lista longa: os itens que não cabem seguem numa lista no slide seguinte.
      if(el.matches('ol:not(.slide-options),ul')&&el.children.length>1){
        const resto=el.cloneNode(false);
        while(transborda(corpo)&&el.children.length>1)resto.prepend(el.lastElementChild);
        if(!transborda(corpo)){if(el.matches('ol'))resto.start=(el.start||1)+el.children.length;fila.splice(i+1,0,{el:resto,quebra:true});continue;}
        el.append(...resto.children);
      }
      // Não coube: o bloco, com o título que o antecede, recomeça num slide novo.
      if(corpo.childElementCount>1){
        el.remove();
        const voltar=[{el,quebra:true}],anterior=corpo.lastElementChild;
        if(titulos.has(anterior)&&corpo.childElementCount>1){anterior.remove();voltar.unshift({el:anterior,quebra:true});voltar[1].quebra=false;}
        fila.splice(i+1,0,...voltar);
        continue;
      }
      corpo.classList.add('slide-texto-denso');
    }
    const validas=paginas.filter(pagina=>{if(pagina.querySelector('.slide-texto-corpo').childElementCount)return true;pagina.remove();return false;});
    const nota=declaracao.querySelector('.notes')?.textContent.trim();
    validas.forEach((pagina,i)=>{
      const parte=validas.length>1?` · ${i+1} de ${validas.length}`:'';
      pagina.querySelector('.slide-eyebrow').textContent=(rotulo?`${rotulo} · `:'')+'texto do artigo'+parte;
      if(transborda(pagina.querySelector('.slide-texto-corpo')))pagina.classList.add('slide-rola');
      const aside=document.createElement('aside');aside.className='notes';
      aside.textContent=nota||`Texto integral do artigo${parte}. Leia ou comente os termos em negrito; o resumo vem em seguida.`;
      pagina.append(aside);pagina.hidden=true;
    });
    declaracao.remove();
  }

  let slides=[];
  function preparar(){
    for(const declaracao of [...caixa.querySelectorAll(':scope > .slide[data-texto]')])expandir(declaracao);
    slides=[...caixa.children].filter(el=>el.classList.contains('slide'));
    slides.forEach((slide,i)=>{slide.hidden=true;slide.setAttribute('role','group');slide.setAttribute('aria-roledescription','slide');slide.setAttribute('aria-label',`${i+1} de ${slides.length}`);});
  }
  const fragmentos=slide=>[...slide.querySelectorAll('[data-frag]')].map((el,i)=>({el,i,ordem:Number(el.dataset.frag)||0})).sort((a,b)=>a.ordem-b.ordem||a.i-b.i).map(item=>item.el);
  let atual=0,frag=0,telaCheiaPropria=false,ocioso=0;
  function mostrar(indice,quantos){
    slides[atual].querySelectorAll('video').forEach(video=>video.pause());
    atual=Math.max(0,Math.min(slides.length-1,indice));
    const slide=slides[atual],lista=fragmentos(slide);
    frag=Math.max(0,Math.min(quantos,lista.length));
    slides.forEach((item,i)=>{item.hidden=i!==atual;});
    lista.forEach((el,i)=>el.classList.toggle('deck-frag-hidden',i>=frag));
    q('[data-deck-count]').textContent=`${atual+1} / ${slides.length}`;
    q('.deck-progress i').style.width=`${(atual+1)/slides.length*100}%`;
    const nota=slide.querySelector('.notes');
    q('[data-deck-notes-title]').textContent=`Notas · slide ${atual+1}`;
    q('[data-deck-notes]').textContent=nota?nota.textContent.trim():'Sem notas para este slide.';
    q('.deck-sr').textContent=`Slide ${atual+1} de ${slides.length}: ${(slide.querySelector('h1,h2,.slide-quote')?.textContent||'').trim()}`;
  }
  function avancar(){const total=fragmentos(slides[atual]).length;if(frag<total)mostrar(atual,frag+1);else if(atual<slides.length-1)mostrar(atual+1,0);}
  function voltar(){if(frag>0)mostrar(atual,frag-1);else if(atual>0)mostrar(atual-1,Infinity);}
  function ajustar(){const altura=notas.hidden?0:notas.offsetHeight;deck.style.setProperty('--deck-notes',altura+'px');deck.style.setProperty('--deck-scale',String(Math.min(innerWidth/W,(innerHeight-altura)/H)));}
  function telaCheia(ligar){
    try{
      // A tela cheia vai para o próprio dialog: pedir para o documento colocaria a página por cima dos slides.
      if(ligar&&!document.fullscreenElement){telaCheiaPropria=true;deck.requestFullscreen?.()?.catch?.(()=>{telaCheiaPropria=false;});}
      else if(!ligar&&document.fullscreenElement){telaCheiaPropria=false;document.exitFullscreen().catch(()=>{});}
    }catch{telaCheiaPropria=false;}
  }
  function alternarNotas(){notas.hidden=!notas.hidden;q('[data-deck="notes"]').setAttribute('aria-pressed',String(!notas.hidden));ajustar();}
  function alternarPreto(){preto.hidden=!preto.hidden;q('[data-deck="black"]').setAttribute('aria-pressed',String(!preto.hidden));}
  function acordar(){deck.classList.remove('deck-idle');clearTimeout(ocioso);ocioso=setTimeout(()=>deck.classList.add('deck-idle'),2500);}
  function abrir(){document.body.classList.add('deck-open');deck.showModal();if(!slides.length)preparar();mostrar(atual,frag);ajustar();telaCheia(true);stage.focus();acordar();}
  const acoes={prev:voltar,next:avancar,notes:alternarNotas,black:alternarPreto,full:()=>telaCheia(!document.fullscreenElement),close:()=>deck.close()};
  q('.deck-controls').addEventListener('click',event=>{const botao=event.target.closest('[data-deck]');if(botao)acoes[botao.dataset.deck]();});
  deck.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey||event.target.closest('input,select,textarea,video'))return;
    const emBotao=Boolean(event.target.closest('button,a')),tecla=event.key;
    if(tecla==='ArrowRight'||tecla==='PageDown'||(tecla===' '&&!emBotao))avancar();
    else if(tecla==='ArrowLeft'||tecla==='PageUp')voltar();
    else if(tecla==='Home')mostrar(0,0);
    else if(tecla==='End')mostrar(slides.length-1,Infinity);
    else if(tecla==='n'||tecla==='N')alternarNotas();
    else if(tecla==='b'||tecla==='B'||tecla==='.')alternarPreto();
    else if(tecla==='f'||tecla==='F')acoes.full();
    else if(tecla==='p'||tecla==='P'){const video=slides[atual].querySelector('video');if(video)alternarVideo(video);}
    else return;
    event.preventDefault();
    // Durante a gravação, a navegação por teclado esconde os controles da tela.
    if(event.target.closest('.deck-controls'))stage.focus();
    clearTimeout(ocioso);deck.classList.add('deck-idle');
  });
  deck.addEventListener('mousemove',acordar);
  deck.addEventListener('close',()=>{document.body.classList.remove('deck-open');slides[atual]?.querySelectorAll('video').forEach(video=>video.pause());if(telaCheiaPropria)telaCheia(false);preto.hidden=true;launch.focus();});
  addEventListener('resize',()=>{if(deck.open)ajustar();});
  const launch=document.createElement('button');
  launch.type='button';launch.className='theme deck-launch';launch.textContent='Apresentar';launch.setAttribute('aria-haspopup','dialog');
  launch.addEventListener('click',abrir);
  const topo=document.querySelector('.top'),tema=document.getElementById('theme');
  if(topo){const grupo=document.createElement('div');grupo.className='top-actions';grupo.append(launch);if(tema)grupo.append(tema);topo.append(grupo);}
  if(location.hash==='#apresentacao')abrir();
}
