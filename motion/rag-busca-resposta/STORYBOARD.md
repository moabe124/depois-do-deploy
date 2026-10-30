---
format: 960x640
duration: 23s
message: "Com RAG, o modelo consulta trechos antes de responder; se a busca errar, a resposta erra junto."
arc: concept-explainer with process
audience: desenvolvedor sênior full stack, iniciante em IA
mode: autonomous
music: none
captions: skipped (animação silenciosa com rótulos no diagrama)
---

## Frame 1 — Memória, consulta e busca errada

- status: animated
- src: compositions/frames/01-busca-resposta.html
- type: feature_showcase
- persuasion: demonstração de causa e efeito
- beat: compreensão
- scene: O mesmo pedido passa por três caminhos: só memória, RAG com o trecho certo e RAG com o trecho desatualizado.
- duration: 23s
- poster: 15.5s
- transition_in: cut
- voiceover:

narrativeRole: mostrar por que o modelo sozinho alucina sobre regras internas e como a consulta prévia resolve isso.
keyMessage: o modelo só pode usar o que recebeu; antes de culpar o modelo, veja o que ele recebeu.

Scene 0–7s — Sem RAG: `Auxílio home office?` → `Modelo` → `“R$ 80 por mês”` com o rótulo `sem fonte`. Nota: resposta convincente, mas inventada (alucinação).

Scene 7–16s — Com RAG: índice com quatro trechos; `Home office · seção 3` e `Home office · seção 4` são destacados e os outros esmaecem. Conectores levam ao `Contexto enviado` (pergunta + 2 trechos, instrução para responder só com base neles); a seta `modelo` leva a `“R$ 150 por mês” · fonte: Home office · seção 3`. Notas numeradas: busca, contexto, resposta.

Scene 16–23s — Busca errada: o índice ainda guarda `Home office · 2024`, que é o trecho destacado em laranja; `Home office · seção 3` fica esmaecido. A resposta sai `“R$ 100 por mês” · fonte: Home office · 2024`. Nota final: o modelo só pode usar o que recebeu.

## Video direction

Diagrama técnico, plano e escuro. Sem camera drift, logotipo, música ou decorativos. Títulos 42px, subtítulos 28px, cartões e rótulos 22–28px, rodapé 20px. Verde indica trecho enviado e resposta com fonte certa; laranja, palpite ou trecho desatualizado; esmaecido, trecho não enviado. Uma timeline pausada, determinística e reversível.
