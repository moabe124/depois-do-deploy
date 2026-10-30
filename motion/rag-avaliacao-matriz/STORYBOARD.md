---
format: 960x640
duration: 24s
message: "Separar recuperação e geração mostra onde o erro do RAG nasce antes de trocar o modelo."
arc: concept-explainer with process
audience: desenvolvedor sênior full stack
mode: autonomous
music: none
captions: skipped (animação silenciosa com rótulos no diagrama)
---

## Frame 1 — Taxa agregada, portões e matriz

- status: animated
- src: compositions/frames/01-matriz-rag.html
- type: feature_showcase
- persuasion: demonstração de causa e efeito
- beat: compreensão
- scene: Uma taxa de erro de 19% vira uma matriz 2×2 ao medir recuperação e geração separadamente.
- duration: 24s
- poster: 23s
- transition_in: cut
- voiceover:

narrativeRole: mostrar por que a taxa agregada leva à decisão errada (trocar o modelo) e como dois portões localizam o erro.
keyMessage: o modelo não pode usar a evidência que não recebeu; meça a recuperação antes de culpar a geração.

Scene 0–7s — Taxa agregada: contador sobe a `19%` (76 de 400 respostas erradas). Surge a proposta da equipe: "trocar o modelo?". Nota: um único número não diz em que etapa o erro nasceu.

Scene 7–16s — Dois portões: recuperação divide as 400 perguntas em `312 · trecho-ouro no top-5` e `88 · trecho-ouro ausente` (`recall@5 = 78%`). Setas levam à geração: `290 certas · 22 erradas` e `34 certas · 54 erradas`.

Scene 16–24s — Matriz 2×2: linhas (trecho-ouro no top-5 / ausente) × colunas (correta / errada). Destaques sucessivos: `54 · erro de recuperação` (71% dos erros), `22 · erro de geração` (29%), `34 · acerto sem evidência`. Subtítulo: trocar o modelo ataca no máximo 22 dos 76 erros.

## Video direction

Diagrama técnico, plano e escuro. Sem camera drift, logotipo, música ou decorativos. Títulos 42px, subtítulos 28px, cartões e rótulos 22–28px, número de destaque 120px, rodapé 20px. Verde indica evidência recuperada; laranja, falha de recuperação; tracejado neutro, acerto sem evidência. Uma timeline pausada, determinística e reversível.
