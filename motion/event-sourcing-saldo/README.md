# Event sourcing: fatos e saldo

Animação didática para a terceira edição de System Design, no formato de composição HyperFrames 0.8.154. **24 segundos**, 960 × 640, 24 fps, sem áudio. Uma cena com três estados: numa tabela comum, cada atualização sobrescreve o saldo e o motivo se perde; com event sourcing, quatro eventos são anexados em ordem e o saldo é calculado a partir deles; uma expiração indevida é corrigida por um quinto evento, sem editar o evento 4.

## Arquivos editáveis

- `index.html`: composição principal; GSAP local.
- `compositions/frames/01-fatos-saldo.html`: diagrama, estados e timeline pausada.
- `BRIEF.md`, `STORYBOARD.md`, `frame.md`: objetivo, sequência e identidade visual.
- `capture/extracted/visible-text.txt`: texto de referência do artigo.

O canvas 3:2 e a paleta seguem `docs/FORMATO.md`. Rótulos, numeração dos eventos e opacidade explicitam o que foi sobrescrito, anexado e corrigido, além das cores.

## Validação

Validado em 30/10/2026 com `hyperframes check` (lint, runtime, layout, movimento e contraste: 87/87 textos em WCAG AA) e snapshots em 6,5 s, 10,5 s, 15,5 s, 17,8 s e 23 s.

```sh
npx --yes hyperframes@0.8.154 check
npx --yes hyperframes@0.8.154 snapshot --at 6.5,10.5,15.5,17.8,23
```

## Mídia

Nesta máquina, `hyperframes render` parou na verificação inicial porque FFmpeg e FFprobe não estavam no PATH. A mídia foi gerada com a captura do próprio HyperFrames e codificada à parte:

1. `npx --yes hyperframes@0.8.154 snapshot --at <0, 1/24, 2/24, …, 575/24>` capturou os 576 quadros (24 fps × 24 s).
2. Os quadros foram renumerados em ordem (`f0000.png` … `f0575.png`) e codificados em H.264 com um FFmpeg local que oferece o encoder do Media Foundation:

```sh
ffmpeg -framerate 24 -i f%04d.png -vf "scale=out_color_matrix=bt709:out_range=tv,format=nv12" -c:v h264_mf -rate_control quality -quality 60 -movflags +faststart raw.mp4
ffmpeg -i raw.mp4 -c copy -bsf:v "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0" -movflags +faststart ../../site/assets/event-sourcing-saldo.mp4
```

Resultado: `site/assets/event-sourcing-saldo.mp4`, H.264 Constrained Baseline, yuv420p BT.709, 24 s, cerca de 870 KB. O poster `site/assets/event-sourcing-saldo-poster.png` é o quadro capturado em 15,5 s (log com quatro eventos e saldo 300). Com FFmpeg completo no PATH, o caminho preferido continua sendo a CLI oficial:

```sh
npx --yes hyperframes@0.8.154 render --format mp4 --fps 24 --quality high --workers 1 --output ../../site/assets/event-sourcing-saldo.mp4
```

## Reprodução no artigo

O artigo inicia estático e oferece controles nativos, reprodução/pausa, repetição e velocidades de 0,5× a 2×. Não há autoplay nem loop; cada reprodução tem um ciclo. A preferência de movimento reduzido pausa a mídia quando passa a ser ativada. Texto e alternativa estática funcionam sem JavaScript.

**Hipóteses:** programa de pontos, cliente e valores fictícios. A projeção aparece atualizada logo após cada evento; o atraso de projeções assíncronas é tratado no texto do artigo.
