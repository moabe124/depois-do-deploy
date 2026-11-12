---
format: 960x640
duration: 24s
message: "@Transactional só age quando a chamada passa pelo proxy; a auto-invocação com this pula o proxy e roda sem transação."
arc: concept-explainer with process
audience: desenvolvedor sênior full stack, revisando anotações do Spring Boot
mode: autonomous
music: none
captions: skipped (animação silenciosa com rótulos no diagrama)
---

## Frame 1 — Pelo proxy, por fora dele e a correção

- status: animated
- src: compositions/frames/01-proxy-transacao.html
- type: feature_showcase
- persuasion: demonstração de causa e efeito
- beat: compreensão
- scene: A mesma confirmação de pedido em três estados: chamada externa pelo proxy, auto-invocação que pula o proxy e chamada por outro bean.
- duration: 24s
- poster: 15.5s
- transition_in: cut
- voiceover:

narrativeRole: mostrar que a anotação não age sozinha; quem abre a transação é o proxy, e só a chamada que passa por ele ganha o comportamento.
keyMessage: só a chamada que passa pelo proxy ganha a transação.

Scene 0–8s — Chamada externa: `PedidoController` → `Proxy · @Transactional` → `PedidoService · confirmar()`. No proxy acendem, em ordem, `1 · abre a transação`, `2 · chama o método real` e `3 · commit ou rollback`. Linha: quem injeta `PedidoService` recebe o proxy, não o objeto real.

Scene 8–16,5s — Auto-invocação: o proxy repassa `processar()` para o objeto real. Dentro de `PedidoService`, uma seta laranja liga `processar()` a `confirmar() @Transactional` com o rótulo `this.confirmar() · sem passar pelo proxy`. O proxy esmaece (`fora do caminho de this`). Linhas: `✓ pedido gravado como CONFIRMADO`, `✗ cobrança recusada: exceção`, `✗ sem transação, nada é desfeito`. Nota: pedido confirmado sem pagamento.

Scene 16,5–24s — Correção: `PedidoService · processar()` → `Proxy · @Transactional` → `ConfirmacaoService · confirmar()`. O proxy abre a transação; a cobrança falha com exceção de runtime; `3 · rollback` acende em verde e a linha final diz que o pedido também é desfeito. Nota final: só a chamada que passa pelo proxy ganha a transação.

## Video direction

Diagrama técnico, plano e escuro. Sem camera drift, logotipo, música ou decorativos. Títulos 42px, subtítulos 28px, caixas e rótulos 20–22px, notas 28px, rodapé 20px. Verde indica a infraestrutura que atendeu a anotação e o rollback; laranja, a chamada que escapou do proxy e o dado que ficou inconsistente. Uma timeline pausada, determinística e reversível.
