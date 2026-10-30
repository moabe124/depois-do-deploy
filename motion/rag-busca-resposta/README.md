# RAG: busca e resposta

Animação didática para a primeira edição de Conceitos de IA, no formato de composição HyperFrames 0.8.154. **23 segundos**, 960 × 640, 24 fps, sem áudio. Uma cena com três estados: o modelo sem consulta responde de memória e inventa um valor; com RAG, a busca escolhe trechos, o contexto é montado e a resposta sai com fonte; quando a busca traz o trecho desatualizado, a resposta erra junto.

## Arquivos editáveis

- `index.html`: composição principal; GSAP local.
- `compositions/frames/01-busca-resposta.html`: diagrama, estados e timeline pausada.
- `BRIEF.md`, `STORYBOARD.md`, `frame.md`: objetivo, sequência e identidade visual.
- `capture/extracted/visible-text.txt`: texto de referência do artigo.

O canvas 3:2 e a paleta seguem `docs/FORMATO.md`. Rótulos, opacidade e conectores explicitam quais trechos foram enviados, além das cores.

## Validação

Validado em 30/10/2026 com `hyperframes check` (lint, runtime, layout, movimento e contraste: 49/49 textos em WCAG AA) e snapshots em 4 s, 15,5 s e 22,5 s. A mídia em `site/assets/rag-busca-resposta.mp4` saiu da CLI oficial:

```sh
npx --yes hyperframes@0.8.154 check
npx --yes hyperframes@0.8.154 snapshot --at 4,15.5,22.5
npx --yes hyperframes@0.8.154 render --format mp4 --fps 24 --quality high --workers 1 --output ../../site/assets/rag-busca-resposta.mp4
```

O poster `site/assets/rag-busca-resposta-poster.png` é o quadro de 15,5 s do MP4 renderizado (fluxo completo com RAG). O render exige FFmpeg e o Chrome Headless Shell (`npx hyperframes browser ensure`).

## Reprodução no artigo

O artigo inicia estático e oferece controles nativos, reprodução/pausa, repetição e velocidades de 0,5× a 2×. Não há autoplay nem loop; cada reprodução tem um ciclo. A preferência de movimento reduzido pausa a mídia quando passa a ser ativada. Texto e alternativa estática funcionam sem JavaScript.

**Hipóteses:** documentos, seções e valores fictícios (política atual de R$ 150, versão antiga de 2024 com R$ 100). O modelo aparece como uma única etapa.
