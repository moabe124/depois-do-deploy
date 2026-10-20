---
format: 960x640
duration: 24s
message: "Propagar traceparent une os spans no mesmo trace e expõe o tempo parado em fila."
arc: concept-explainer with process
audience: desenvolvedor sênior full stack
mode: autonomous
music: none
captions: skipped (animação silenciosa com rótulos no diagrama)
---

## Frame 1 — Quebra de contexto, propagação e cascata

- status: animated
- src: compositions/frames/01-propagacao-waterfall.html
- type: feature_showcase
- persuasion: demonstração de causa e efeito
- beat: compreensão
- scene: Sem traceparent o consumidor cria outro trace; com traceparent o mesmo trace une API, fila e worker na cascata.
- duration: 24s
- poster: 22s
- transition_in: cut
- voiceover:

narrativeRole: mostrar por que traces quebram em fronteiras assíncronas e como a cascata conectada localiza o atraso.
keyMessage: preservar o trace-id e atualizar o parent-id conecta a operação ponta a ponta e separa execução de espera em fila.

Scene 0–8s — Sem contexto na fila: Pedidos conclui `span b2` (`140 ms`) no `trace 4bf9` e publica a mensagem sem cabeçalho `traceparent`. A linha para na fronteira; o consumidor de Estoque inicia um novo `trace 9c10` raiz (`400 ms`). Os dois rastros ficam desconectados e os `1.260 ms` de fila desaparecem entre eles.

Scene 8–16s — Propagação com `traceparent`: Pedidos executa `inject` no cabeçalho da mensagem com `00-4bf9-c3-01`. O envelope cruza a fronteira; o Estoque executa `extract`, preserva `trace 4bf9` e cria `span d4` tendo `c3` como referência causal.

Scene 16–24s — A cascata (waterfall) revela o gargalo: reunidos no `trace 4bf9`, os trechos mostram `a1 · BFF` (`1.800 ms`), `b2–c3 · Pedidos` (`140 ms`), o intervalo de `1.260 ms` aguardando na fila e `d4 · Estoque` (`400 ms`).

## Video direction

Diagrama técnico, plano e escuro. Sem camera drift, logotipo, música ou decorativos. Títulos 42px, subtítulos 28px, cartões e rótulos 26–30px, rodapé 20px. Verde indica spans correlacionados; laranja destaca quebra de contexto e espera na fila. Uma timeline pausada, determinística e reversível.
