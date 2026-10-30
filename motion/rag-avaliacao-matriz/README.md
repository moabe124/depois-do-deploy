# Matriz de avaliação de RAG

Animação didática para a primeira edição de Conceitos de IA, no formato de composição HyperFrames 0.8.154. **24 segundos**, 960 × 640, 24 fps, sem áudio. Uma cena com três estados: taxa de erro agregada (19% em 400 perguntas), portões separados de recuperação (`recall@5`) e geração, e matriz 2×2 que mostra onde cada erro nasce.

## Arquivos editáveis

- `index.html`: composição principal; GSAP local.
- `compositions/frames/01-matriz-rag.html`: diagrama, estados e timeline pausada.
- `BRIEF.md`, `STORYBOARD.md`, `frame.md`: objetivo, sequência e identidade visual.
- `capture/extracted/visible-text.txt`: texto de referência do artigo.

O canvas 3:2 e a paleta seguem `docs/FORMATO.md`. Rótulos e bordas (sólida, tracejada, laranja) explicitam os estados, além das cores.

## Validação pendente

A mídia em `site/assets/rag-avaliacao-matriz.mp4` foi gerada em um ambiente sem acesso ao registro npm, portanto **sem a CLI do HyperFrames**. A timeline registrada em `window.__timelines['01-matriz-rag']` foi buscada (`seek`) quadro a quadro em Chromium headless, 576 quadros a 24 fps, e codificada com FFmpeg (H.264 High, yuv420p, CRF 20, `+faststart`). A composição é determinística: apenas `seek`, sem `Math.random` ou rede.

Antes de considerar a animação validada, rodar localmente:

```sh
npm run check
npx --yes hyperframes@0.8.154 snapshot --at 2,6,10,14,18,23
npx --yes hyperframes@0.8.154 render --format mp4 --fps 24 --quality high --workers 1 --output ../../site/assets/rag-avaliacao-matriz.mp4
```

`check` cobre lint, runtime, layout, movimento e contraste. O `render` substitui o MP4 provisório pela saída oficial; o poster usa o estado de 23 segundos.

## Reprodução no artigo

O artigo inicia estático e oferece controles nativos, reprodução/pausa, repetição e velocidades de 0,5× a 2×. Não há autoplay nem loop; cada reprodução tem um ciclo. A preferência de movimento reduzido pausa a mídia quando passa a ser ativada. Texto e alternativa estática funcionam sem JavaScript.

**Hipóteses:** conjunto de avaliação didático com 400 perguntas, um trecho-ouro anotado por pergunta, `k = 5` trechos enviados ao modelo e correção julgada contra uma resposta de referência. Os números não vêm de um sistema real.
