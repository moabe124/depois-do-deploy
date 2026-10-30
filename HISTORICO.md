# Histórico de temas — Depois do Deploy

> Gerado a partir de `content/catalog.json`. Não editar este arquivo diretamente.

“Apresentado” significa que a edição existe e foi disponibilizada no acervo. “Estudado” exige confirmação do leitor. Para evitar repetição, considerar ambos os estados.

## System Design

### system-design-002 — Back-of-the-envelope: estime antes de decidir

- Data: 2026-10-09
- Nível: avancado
- Estado: apresentado
- Identidade do objetivo: `estimativa-ordem-grandeza-hipoteses-unidades`
- Objetivo: Transformar uma pergunta de System Design em uma estimativa de carga e armazenamento, usando hipóteses explícitas, unidades e cenários para orientar a próxima medição.
- Conceitos: back-of-the-envelope, ordem de grandeza, hipóteses, fronteira de medição, análise dimensional, arredondamento, taxa média e pico, retenção, análise de sensibilidade, planejamento de capacidade, Lei de Little, média ponderada
- Edição: [HTML](content/system-design/002-back-of-the-envelope.html)

Aplicação prática: ensinar o método de back-of-the-envelope com uma estimativa guiada de eventos por segundo e armazenamento. Explicita fronteira, hipóteses, unidades e arredondamento; testa sensibilidade, réplicas, pico e falha. Cache aparece como exemplo opcional de média ponderada, não como objetivo da edição.

### system-design-001 — Idempotência e retries seguros

- Data: 2026-10-02
- Nível: intermediario
- Estado: apresentado
- Identidade do objetivo: `idempotencia-retries-pagamentos`
- Objetivo: Repetir uma intenção de pagamento após timeout sem duplicar a cobrança e recuperar o estado após uma falha parcial.
- Conceitos: idempotência, retry, timeout, chave de idempotência, restrição única, reconciliação, falha parcial, retenção
- Edição: [HTML](content/system-design/001-idempotencia.html)

Timeout não confirma falha. Uma identidade estável, reserva atômica e idempotência no provedor permitem repetir tentativas com segurança. Reconciliação recupera operações pendentes; retenção e coordenação entre regiões limitam a garantia.

## Java e JVM

### java-jvm-001 — Threads virtuais: libere a espera, controle a concorrência

- Data: 2026-10-13
- Nível: intermediario
- Estado: apresentado
- Identidade do objetivo: `threads-virtuais-carriers-limite-dependencia`
- Objetivo: Entender como threads virtuais liberam a carrier durante I/O compatível e separar esse mecanismo do controle de chamadas simultâneas a uma API com semáforo compartilhado e espera limitada.
- Conceitos: thread virtual, thread de plataforma, carrier, I/O bloqueante, concorrência, paralelismo, semáforo, controle de admissão, timeout, pinning
- Edição: [HTML](content/java-jvm/001-threads-virtuais.html)

Conceito: acompanhar uma consulta de cotações para distinguir thread virtual, carrier e permissão. Explica desmontagem durante I/O, executor por tarefa, semáforo compartilhado, espera limitada, timeouts e orçamento local versus global. Aprofundamentos tratam CPU, ciclo de vida do executor e pinning conforme a versão da JVM.

## Angular e frontend

Nenhuma edição apresentada.

## Conceitos de IA

### conceitos-de-ia-001 — Avaliação de RAG: descubra se o erro está na busca ou na resposta

- Data: 2026-10-30
- Nível: avancado
- Estado: apresentado
- Identidade do objetivo: `avaliacao-rag-recuperacao-geracao-erro-padrao`
- Objetivo: Diagnosticar se as respostas erradas de um assistente com RAG nascem na recuperação ou na geração, medindo recall@k e correção separadamente, calibrando o juiz LLM e usando erro padrão pareado antes de decidir trocar o modelo.
- Conceitos: RAG, recuperação, geração, trecho-ouro, recall@k, precision@k, fidelidade, correção, juiz LLM, viés de posição, erro padrão, análise pareada, erro padrão clusterizado
- Edição: [HTML](content/conceitos-de-ia/001-avaliacao-rag.html)

Aplicação prática: acompanhar um assistente de políticas com 19% de erro em 400 perguntas e a proposta de trocar o modelo. Separa recuperação (trecho-ouro no top-k, recall@k) e geração (correção e fidelidade) em uma matriz 2×2: 54 erros de recuperação, 22 de geração e 34 acertos sem evidência. Aprofundamentos tratam precision@k e escolha de k, fidelidade versus correção, calibração e viés de posição do juiz LLM, e erro padrão pareado e clusterizado ao comparar versões.

## Entrevistas

Nenhuma edição apresentada.

## Certificações

Nenhuma edição apresentada.

## Dados e persistência

### dados-persistencia-001 — Sharding: como dividir dados entre servidores

- Data: 2026-10-07
- Nível: intermediario
- Estado: apresentado
- Identidade do objetivo: `sharding-chave-localidade-hotspots`
- Objetivo: Escolher uma chave de sharding a partir das consultas e reconhecer o que fazer quando a carga se concentra ou atravessa shards.
- Conceitos: sharding, escala horizontal, chave de sharding, colocalização, hotspot, hash, scatter-gather, rebalanceamento, transações distribuídas, réplicas de leitura
- Edição: [HTML](content/dados-persistencia/001-sharding.html)

Aplicação prática: acompanhar um sistema de pedidos para entender shard, tenant e chave de distribuição. Explica passo a passo a consulta dirigida, a colocalização, o hotspot de uma empresa e o relatório global. Aprofundamentos mostram hash, buckets, transações e migração, sempre ligados ao mesmo exemplo.

## Operação e confiabilidade

### operacao-confiabilidade-001 — Traces distribuídos: siga a requisição sem perder o contexto

- Data: 2026-10-20
- Nível: avancado
- Estado: apresentado
- Identidade do objetivo: `traces-propagacao-contexto-spans-amostragem`
- Objetivo: Diagnosticar onde uma requisição gasta tempo entre serviços e filas, preservando a propagação do cabeçalho W3C traceparent, escolhendo entre hierarquia pai-filho e span links e reconhecendo o impacto da amostragem.
- Conceitos: rastreamento distribuído, trace, span, propagação de contexto, traceparent, tracestate, injeção e extração, span link, head sampling, tail sampling
- Edição: [HTML](content/operacao-confiabilidade/001-traces-contexto.html)

Aplicação prática: seguir uma compra lenta entre BFF, API de Pedidos e Worker de Estoque para reconstruir a cascata com W3C Trace Context (traceparent). Explica injeção e extração nos cabeçalhos da fila, diferença entre execução e espera em fila, escolha entre parent_id e Span Links em lotes e o compromisso entre head sampling e tail sampling.

## Segurança aplicada

Nenhuma edição apresentada.
