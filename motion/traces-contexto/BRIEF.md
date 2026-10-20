---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "Propagar traceparent une os spans no mesmo trace e expõe o tempo parado em fila."
destination: article-embed
aspect: 960x640
language: pt-BR
audience: desenvolvedor sênior full stack
length: 24s
angle: application
narration: no
---

## Intent

Animação didática para a primeira edição de Operação e confiabilidade. Mostra a diferença entre um rastro quebrado por falta de propagação de contexto na fila, a injeção e extração do cabeçalho W3C `traceparent` e a cascata (waterfall) resultante revelando o tempo de espera antes do consumidor.

## Customizations

Tema escuro `#191d20`; texto `#d7d9d5`; verde `#a6cdbb`; alerta `#e7b28c`; fonte Segoe UI/Arial. Texto grande para leitura no celular. Canvas 3:2 (`960x640`), alinhado ao formato editorial em `docs/FORMATO.md`.

## Notes

Decisões editoriais: 24 segundos, animação silenciosa, reprodução manual, uma passagem por vez. Composição preservada em `motion/traces-contexto/`; MP4 e poster em `site/assets/`. Integração na edição `content/operacao-confiabilidade/001-traces-contexto.html`.

Hipóteses: identificadores abreviados (`4bf9`, `9c10`, `a1`–`d4`) para legibilidade, relógios sincronizados entre serviços, uma mensagem por pedido. A duração visual não está na escala dos milissegundos.
