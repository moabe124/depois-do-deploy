---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "Com event sourcing, o sistema guarda os fatos e calcula o saldo a partir deles; uma correção entra como fato novo."
destination: article-embed
aspect: 960x640
language: pt-BR
audience: desenvolvedor sênior full stack, iniciante em event sourcing
length: 24s
angle: concept
narration: no
---

## Intent

Animação didática para a terceira edição de System Design, em nível iniciante. Mostra três momentos de uma carteira de pontos: numa tabela comum, cada atualização sobrescreve o saldo e o cliente não consegue saber para onde foram os pontos; com event sourcing, quatro eventos são anexados em ordem e o saldo é calculado a partir deles; quando a expiração se revela indevida, a correção entra como um quinto evento e o evento 4 continua no histórico.

## Customizations

Tema escuro `#191d20`; texto `#d7d9d5`; verde `#a6cdbb`; alerta `#e7b28c`; neutro `#aab1b4`; fonte genérica sans-serif na mídia. Texto grande para leitura no celular. Canvas 3:2 (`960x640`), alinhado ao formato editorial em `docs/FORMATO.md`.

## Notes

Decisões editoriais: 24 segundos, animação silenciosa, reprodução manual, uma passagem por vez. Composição preservada em `motion/event-sourcing-saldo/`; MP4 e poster em `site/assets/`. Integração na edição `content/system-design/003-event-sourcing.html`.

Hipóteses: programa de pontos, cliente e valores fictícios. A projeção aparece atualizada logo após cada evento; o atraso de projeções assíncronas é tratado no texto do artigo.
