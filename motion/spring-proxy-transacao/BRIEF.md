---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "@Transactional só age quando a chamada passa pelo proxy; a auto-invocação com this pula o proxy e roda sem transação."
destination: article-embed
aspect: 960x640
language: pt-BR
audience: desenvolvedor sênior full stack, revisando anotações do Spring Boot
length: 24s
angle: concept
narration: no
---

## Intent

Animação didática da segunda edição de Java e JVM (revisão das anotações do Spring Boot 4, nível iniciante). Mostra três momentos de uma confirmação de pedido: outro bean chama `confirmar()` e passa pelo proxy, que abre a transação e faz commit ou rollback; `processar()` chama `this.confirmar()` na mesma classe, o proxy fica de fora e a falha na cobrança deixa o pedido confirmado sem pagamento; com `confirmar()` em `ConfirmacaoService`, a chamada atravessa o proxy e a falha desfaz tudo.

## Customizations

Tema escuro `#191d20`; texto `#d7d9d5`; verde `#a6cdbb`; alerta `#e7b28c`; neutro `#aab1b4`; fonte genérica sans-serif na mídia. Texto grande para leitura no celular. Canvas 3:2 (`960x640`), alinhado ao formato editorial em `docs/FORMATO.md`.

## Notes

Decisões editoriais: 24 segundos, animação silenciosa, reprodução manual, uma passagem por vez. Composição preservada em `motion/spring-proxy-transacao/`; MP4 e poster em `site/assets/`. Integração na edição `content/java-jvm/002-spring-boot-anotacoes.html`.

Hipóteses: API de Pedidos fictícia; proxy de classe (CGLIB), o padrão do Spring Boot; a falha é uma exceção de runtime, que provoca rollback pela regra padrão. Exceções verificadas são tratadas no texto do artigo.
