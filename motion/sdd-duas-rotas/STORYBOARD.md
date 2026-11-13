---
format: 960x640
duration: 24s
message: "Sem spec, as dúvidas viram palpites dentro do código; com spec, viram perguntas antes dele, e o converge confere a entrega contra a spec."
arc: concept-explainer with comparison
audience: desenvolvedor sênior full stack que já programa com agentes de IA
mode: autonomous
music: none
captions: skipped (animação silenciosa com rótulos no diagrama)
---

## Frame 1 — Duas rotas para o mesmo pedido

- status: animated
- src: compositions/frames/01-duas-rotas.html
- type: feature_showcase
- persuasion: comparação de causa e efeito
- beat: compreensão
- scene: A mesma tarefa em três estados: prompt direto com palpites silenciosos, spec com dúvidas decididas no clarify e laço de convergência.
- duration: 24s
- poster: 15.5s
- transition_in: cut
- voiceover:

narrativeRole: mostrar onde a ambiguidade é resolvida em cada rota e por que a conferência contra a spec fecha o ciclo.
keyMessage: cada dúvida respondida antes do código é um palpite a menos dentro dele.

Scene 0–8,5s — Sem spec: `Prompt “adicione cancelamento com reembolso”` → três dúvidas (`cancelar após o despacho?`, `devolver o frete?`, `gateway em timeout?`). Cada uma recebe, em laranja, um palpite (`sim`, `não`, `tenta de novo`). Linhas: `✓ código pronto, testes verdes` e `✗ revisão: reembolso em dobro no timeout`. Nota final: os testes confirmam os palpites, não o negócio.

Scene 8,5–17s — Com spec: `spec.md` com as mesmas dúvidas marcadas `NEEDS CLARIFICATION`; à direita, os passos `clarify`, `plan`, `tasks`, `implement`. O clarify acende e cada marcador dá lugar a uma decisão em verde (`só antes do despacho`, `frete devolvido`, `chave de idempotência`); depois acendem plan, tasks e implement. Linha: decisões gravadas na spec antes do plano. Nota: cada dúvida respondida é um palpite a menos.

Scene 17–24s — Convergência: `implement` → `converge` → `tasks.md`, com seta de retorno laranja (`nova passada`). Linhas: `1ª passada: 2 lacunas → +2 tarefas`, `2ª passada: 0 lacunas`, `✓ Converged`. Nota final: a entrega é conferida contra a spec, não o palpite.

## Video direction

Diagrama técnico, plano e escuro. Sem camera drift, logotipo, música ou decorativos. Títulos 42px, subtítulos 28px, caixas e rótulos 20–22px, notas 28px, rodapé 20px. Laranja indica palpite, marcador em aberto e lacuna; verde, decisão registrada e convergência. Uma timeline pausada, determinística e reversível.
