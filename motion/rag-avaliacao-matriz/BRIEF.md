---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "Separar recuperação e geração mostra onde o erro do RAG nasce antes de trocar o modelo."
destination: article-embed
aspect: 960x640
language: pt-BR
audience: desenvolvedor sênior full stack
length: 24s
angle: application
narration: no
---

## Intent

Animação didática para a primeira edição de Conceitos de IA. Mostra que uma taxa agregada de 19% de respostas erradas esconde duas falhas diferentes. Aplicando dois portões — o trecho-ouro chegou ao top-5? a resposta está correta? — as 400 perguntas caem em uma matriz 2×2: 54 erros de recuperação, 22 erros de geração e 34 acertos sem evidência.

## Customizations

Tema escuro `#191d20`; texto `#d7d9d5`; verde `#a6cdbb`; alerta `#e7b28c`; neutro `#aab1b4`; fonte genérica sans-serif na mídia. Texto grande para leitura no celular. Canvas 3:2 (`960x640`), alinhado ao formato editorial em `docs/FORMATO.md`.

## Notes

Decisões editoriais: 24 segundos, animação silenciosa, reprodução manual, uma passagem por vez. Composição preservada em `motion/rag-avaliacao-matriz/`; MP4 e poster em `site/assets/`. Integração na edição `content/conceitos-de-ia/001-avaliacao-rag.html`.

Hipóteses: 400 perguntas com um trecho-ouro anotado cada, `k = 5`, correção contra resposta de referência. Números didáticos.
