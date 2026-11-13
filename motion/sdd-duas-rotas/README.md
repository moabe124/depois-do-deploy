# SDD: duas rotas para o mesmo pedido

Animação didática para a segunda edição de Conceitos de IA (SDD com o GitHub Spec Kit), no formato de composição HyperFrames 0.8.154. **24 segundos**, 960 × 640, 24 fps, sem áudio. Uma cena com três estados: o prompt direto, em que o agente responde sozinho às três dúvidas do cancelamento e a revisão encontra um reembolso em dobro; o fluxo com spec, em que as mesmas dúvidas viram marcadores `NEEDS CLARIFICATION`, são decididas no `clarify` e só então viram plano, tarefas e código; e o laço `implement` → `converge`, que acrescenta tarefas até reportar `Converged`.

## Arquivos editáveis

- `index.html`: composição principal; GSAP local.
- `compositions/frames/01-duas-rotas.html`: diagrama, estados e timeline pausada.
- `BRIEF.md`, `STORYBOARD.md`, `frame.md`: objetivo, sequência e identidade visual.
- `capture/extracted/visible-text.txt`: texto de referência da animação.

O canvas 3:2 e a paleta seguem `docs/FORMATO.md`. Rótulos com ✓ e ✗, além das cores, distinguem palpite, marcador em aberto e lacuna (laranja) de decisão registrada e convergência (verde).

## Validação

Validada em 13/11/2026 com `hyperframes check` (lint, runtime, layout em 9 amostras, movimento e contraste: 55/55 textos em WCAG AA) e snapshots em 7,5 s, 12 s, 15,5 s e 23,5 s.

```sh
npx --yes hyperframes@0.8.154 check
npx --yes hyperframes@0.8.154 snapshot --at 7.5,12,15.5,23.5
```

## Mídia

```sh
npx --yes hyperframes@0.8.154 render --format mp4 --fps 24 --quality high --workers 1 --output ../../site/assets/sdd-duas-rotas.mp4
ffmpeg -ss 15.5 -i ../../site/assets/sdd-duas-rotas.mp4 -frames:v 1 ../../site/assets/sdd-duas-rotas-poster.png
```

Resultado: `site/assets/sdd-duas-rotas.mp4`, H.264 High, yuv420p, 24 s, cerca de 790 KB. O poster `site/assets/sdd-duas-rotas-poster.png` é o quadro do próprio MP4 em 15,5 s (dúvidas decididas na spec e passos acesos), para que a imagem inicial use a mesma fonte do vídeo.

## Reprodução no artigo

O artigo inicia estático e oferece controles nativos, reprodução/pausa, repetição e velocidades de 0,5× a 2×. Não há autoplay nem loop; cada reprodução tem um ciclo. A preferência de movimento reduzido pausa a mídia quando passa a ser ativada. Texto e alternativa estática funcionam sem JavaScript. No modo apresentação, o vídeo toca com P ou um clique, sem a barra nativa.

**Hipóteses:** API de Pedidos fictícia; fluxo do Spec Kit simplificado, sem constituição nem `analyze`; as decisões do clarify e o número de lacunas são exemplos didáticos.
