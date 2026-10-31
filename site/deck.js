// Modo apresentação do artigo. A edição declara os slides em <template id="apresentacao" data-tema="...">:
// cada <section class="slide"> vira um slide 16:9 (1280×720, escalado para a tela);
// [data-frag] aparece a cada avanço, na ordem do número (ou do documento);
// <aside class="notes"> traz as notas do apresentador, visíveis só com a tecla N.
const template=document.getElementById('apresentacao');
if(template?.content.querySelector('.slide')&&typeof HTMLDialogElement==='function'){
  const W=1280,H=720;
  const deck=document.createElement('dialog');
  deck.className='deck';deck.setAttribute('aria-label','Apresentação do artigo');
  deck.innerHTML='<div class="deck-viewport"><div class="deck-stage" tabindex="-1"><div class="deck-bar"><span><i aria-hidden="true"></i><b>Depois do Deploy</b> · <span data-deck-tema></span></span><span class="deck-count" data-deck-count></span></div><div class="deck-slides"></div><div class="deck-progress" aria-hidden="true"><i></i></div></div></div><section class="deck-notes" aria-label="Notas do apresentador" hidden><strong data-deck-notes-title></strong><p data-deck-notes></p></section><div class="deck-controls"><button type="button" data-deck="prev">Anterior</button><button type="button" data-deck="next">Próximo</button><button type="button" data-deck="notes" aria-pressed="false">Notas (N)</button><button type="button" data-deck="black" aria-pressed="false">Tela preta (B)</button><button type="button" data-deck="full">Tela cheia (F)</button><button type="button" data-deck="close">Sair (Esc)</button></div><div class="deck-black" hidden></div><p class="deck-sr" aria-live="polite"></p>';
  const q=selector=>deck.querySelector(selector);
  const stage=q('.deck-stage'),notas=q('.deck-notes'),preto=q('.deck-black');
  q('.deck-slides').append(template.content.cloneNode(true));
  q('[data-deck-tema]').textContent=template.dataset.tema||'';
  const slides=[...q('.deck-slides').children].filter(el=>el.classList.contains('slide'));
  slides.forEach((slide,i)=>{slide.hidden=true;slide.setAttribute('role','group');slide.setAttribute('aria-roledescription','slide');slide.setAttribute('aria-label',`${i+1} de ${slides.length}`);});
  document.body.append(deck);
  // Vídeos sem a barra nativa, que poluiria a gravação: P ou um clique tocam e pausam.
  const alternarVideo=video=>video.paused?video.play().catch(()=>{}):video.pause();
  for(const video of q('.deck-slides').querySelectorAll('video')){video.controls=false;video.style.cursor='pointer';video.addEventListener('click',()=>alternarVideo(video));}
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
  function abrir(){document.body.classList.add('deck-open');deck.showModal();mostrar(atual,frag);ajustar();telaCheia(true);stage.focus();acordar();}
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
  deck.addEventListener('close',()=>{document.body.classList.remove('deck-open');slides[atual].querySelectorAll('video').forEach(video=>video.pause());if(telaCheiaPropria)telaCheia(false);preto.hidden=true;launch.focus();});
  addEventListener('resize',()=>{if(deck.open)ajustar();});
  const launch=document.createElement('button');
  launch.type='button';launch.className='theme deck-launch';launch.textContent='Apresentar';launch.setAttribute('aria-haspopup','dialog');
  launch.addEventListener('click',abrir);
  const topo=document.querySelector('.top'),tema=document.getElementById('theme');
  if(topo){const grupo=document.createElement('div');grupo.className='top-actions';grupo.append(launch);if(tema)grupo.append(tema);topo.append(grupo);}
  mostrar(0,0);
  if(location.hash==='#apresentacao')abrir();
}
