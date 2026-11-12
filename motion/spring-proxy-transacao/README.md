# Spring: proxy e transação

Animação didática para a segunda edição de Java e JVM (revisão das anotações do Spring Boot 4), no formato de composição HyperFrames 0.8.154. **24 segundos**, 960 × 640, 24 fps, sem áudio. Uma cena com três estados: outro bean chama `confirmar()` e passa pelo proxy, que abre a transação e faz commit ou rollback; `processar()` chama `this.confirmar()` na mesma classe, o proxy fica de fora e a falha na cobrança deixa o pedido confirmado sem pagamento; com `confirmar()` em `ConfirmacaoService`, a chamada atravessa o proxy e a falha desfaz o pedido.

## Arquivos editáveis

- `index.html`: composição principal; GSAP local.
- `compositions/frames/01-proxy-transacao.html`: diagrama, estados e timeline pausada.
- `BRIEF.md`, `STORYBOARD.md`, `frame.md`: objetivo, sequência e identidade visual.
- `capture/extracted/visible-text.txt`: texto de referência do artigo.

O canvas 3:2 e a paleta seguem `docs/FORMATO.md`. Rótulos, numeração dos passos do proxy e opacidade explicitam o que passou pelo proxy, o que escapou dele e o que foi desfeito, além das cores.

## Validação

Validado em 12/11/2026 com `hyperframes check` (lint, runtime, layout em 9 amostras, movimento e contraste: 68/68 textos em WCAG AA) e snapshots em 4 s, 6,5 s, 11,2 s, 15,5 s e 23 s.

```sh
npx --yes hyperframes@0.8.154 check
npx --yes hyperframes@0.8.154 snapshot --at 4,6.5,11.2,15.5,23
```

## Mídia

Com FFmpeg no PATH, a mídia saiu da CLI oficial, sem o caminho alternativo por quadros usado nas edições anteriores:

```sh
npx --yes hyperframes@0.8.154 render --format mp4 --fps 24 --quality high --workers 1 --output ../../site/assets/spring-proxy-transacao.mp4
ffmpeg -ss 15.5 -i ../../site/assets/spring-proxy-transacao.mp4 -frames:v 1 ../../site/assets/spring-proxy-transacao-poster.png
```

Resultado: `site/assets/spring-proxy-transacao.mp4`, H.264 High, yuv420p BT.709, 24 s, cerca de 780 KB. O poster `site/assets/spring-proxy-transacao-poster.png` é o quadro do próprio MP4 em 15,5 s (auto-invocação com o pedido confirmado sem pagamento), para que a imagem inicial use a mesma fonte do vídeo.

## Reprodução no artigo

O artigo inicia estático e oferece controles nativos, reprodução/pausa, repetição e velocidades de 0,5× a 2×. Não há autoplay nem loop; cada reprodução tem um ciclo. A preferência de movimento reduzido pausa a mídia quando passa a ser ativada. Texto e alternativa estática funcionam sem JavaScript. No modo apresentação, o vídeo toca com P ou um clique, sem a barra nativa.

**Hipóteses:** API de Pedidos fictícia; proxy de classe (CGLIB), o padrão do Spring Boot; a falha na cobrança é uma exceção de runtime, que provoca rollback pela regra padrão. Exceções verificadas são tratadas no texto do artigo.
