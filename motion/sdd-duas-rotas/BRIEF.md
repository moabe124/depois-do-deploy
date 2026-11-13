---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "Sem spec, as dúvidas viram palpites dentro do código; com spec, viram perguntas antes dele, e o converge confere a entrega contra a spec."
destination: article-embed
aspect: 960x640
language: pt-BR
audience: desenvolvedor sênior full stack que já programa com agentes de IA
length: 24s
angle: concept
narration: no
---

## Intent

Animação didática da segunda edição de Conceitos de IA (SDD com o GitHub Spec Kit, nível intermediário). Mostra a mesma tarefa (cancelamento de pedido com reembolso) por duas rotas: o prompt direto, em que o agente responde sozinho às três dúvidas e a revisão encontra um reembolso em dobro; e o fluxo com spec, em que as dúvidas viram marcadores `[NEEDS CLARIFICATION]`, são decididas no `clarify` e só então viram plano, tarefas e código. Fecha com o laço `implement` → `converge`, que acrescenta tarefas até reportar `Converged`.

## Customizations

Tema escuro `#191d20`; texto `#d7d9d5`; verde `#a6cdbb`; alerta `#e7b28c`; neutro `#aab1b4`; fonte genérica sans-serif na mídia. Texto grande para leitura no celular. Canvas 3:2 (`960x640`), alinhado ao formato editorial em `docs/FORMATO.md`.

## Notes

Decisões editoriais: 24 segundos, animação silenciosa, reprodução manual, uma passagem por vez. Composição preservada em `motion/sdd-duas-rotas/`; MP4 e poster em `site/assets/`. Integração na edição `content/conceitos-de-ia/002-sdd-spec-kit.html`.

Hipóteses: API de Pedidos fictícia; fluxo do Spec Kit simplificado, sem constituição nem `analyze`; as decisões do clarify são exemplos didáticos.
