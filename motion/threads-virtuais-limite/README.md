# Carrier livre, permissão ocupada

Animação didática para a primeira edição de Java e JVM, criada com HyperFrames 0.8.154. **24 segundos**, 960 × 640, 24 fps, sem áudio. Uma cena com três estados: desmontagem na espera de I/O, API com permissões ocupadas, devolução da permissão e entrada da próxima tarefa.

## Arquivos editáveis

- `index.html`: composição principal montada pelo workflow faceless-explainer; GSAP local.
- `compositions/frames/01-carrier-permissao.html`: diagrama, estados e timeline pausada.
- `BRIEF.md`, `STORYBOARD.md`, `frame.md`: objetivo, sequência e identidade visual.
- `capture/extracted/visible-text.txt`: texto de referência do artigo.

O canvas 3:2 e a paleta seguem `docs/FORMATO.md`. O preset editorial-forest foi adaptado às cores e à tipografia do projeto. Não há arquivo de fonte com distribuição restrita. Rótulos explicitam os estados, além das cores.

## Comandos

Com Node.js, FFmpeg e FFprobe disponíveis no PATH:

```sh
npm run check
npx --yes hyperframes@0.8.154 snapshot --at 1,5,14,17,22
npx --yes hyperframes@0.8.154 preview --background
npx --yes hyperframes@0.8.154 render --format mp4 --fps 24 --quality high --workers 1 --output ../../site/assets/threads-virtuais-limite.mp4
```

O poster usa o estado de 14 segundos. O artigo inicia estático e oferece controles nativos, reprodução/pausa, repetição e velocidades de 0,5× a 2×. Não há autoplay nem loop; cada reprodução tem um ciclo. A preferência de movimento reduzido pausa a mídia quando passa a ser ativada. Texto e alternativa estática funcionam sem JavaScript.

**Hipóteses:** uma instância, duas permissões para legibilidade, I/O compatível, ausência de pinning. Ordem possível, sem promessa FIFO. A duração visual não representa o tempo das chamadas.
