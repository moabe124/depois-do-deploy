# Propagação de contexto e cascata de traces

Animação didática para a primeira edição de Operação e confiabilidade, criada com HyperFrames 0.8.154. **24 segundos**, 960 × 640, 24 fps, sem áudio. Uma cena com três estados: rastro quebrado na fronteira da fila sem `traceparent`, propagação com `inject`/`extract` do cabeçalho W3C `traceparent` e cascata (*waterfall*) completa expondo o tempo parado na fila.

## Arquivos editáveis

- `index.html`: composição principal montada pelo workflow faceless-explainer; GSAP local.
- `compositions/frames/01-propagacao-waterfall.html`: diagrama, estados e timeline pausada.
- `BRIEF.md`, `STORYBOARD.md`, `frame.md`: objetivo, sequência e identidade visual.
- `capture/extracted/visible-text.txt`: texto de referência do artigo.

O canvas 3:2 e a paleta seguem `docs/FORMATO.md`. Rótulos explicitam os estados, além das cores.

## Comandos

Com Node.js, FFmpeg e FFprobe disponíveis no PATH:

```sh
npm run check
npx --yes hyperframes@0.8.154 snapshot --at 1,5,10,13,18,22
npx --yes hyperframes@0.8.154 preview --background
npx --yes hyperframes@0.8.154 render --format mp4 --fps 24 --quality high --workers 1 --output ../../site/assets/traces-contexto.mp4
```

O poster usa o estado de 22 segundos. O artigo inicia estático e oferece controles nativos, reprodução/pausa, repetição e velocidades de 0,5× a 2×. Não há autoplay nem loop; cada reprodução tem um ciclo. A preferência de movimento reduzido pausa a mídia quando passa a ser ativada. Texto e alternativa estática funcionam sem JavaScript.

**Hipóteses:** identificadores abreviados (`4bf9`, `9c10`, `a1`–`d4`) para legibilidade, relógios sincronizados entre os processos, uma mensagem por pedido. A duração visual não está na escala dos milissegundos.
