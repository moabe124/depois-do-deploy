# Histórico de temas — Depois do Deploy

> Gerado a partir de `content/catalog.json`. Não editar este arquivo diretamente.

“Apresentado” significa que a edição existe e foi disponibilizada no acervo. “Estudado” exige confirmação do leitor. Para evitar repetição, considerar ambos os estados.

## System Design

### system-design-003 — Event sourcing: guarde os fatos, derive o estado

- Data: 2026-10-30
- Nível: iniciante
- Estado: apresentado
- Identidade do objetivo: `event-sourcing-fatos-estado-projecoes`
- Objetivo: Entender o que é event sourcing: guardar cada mudança como um evento imutável, calcular o estado atual a partir desses eventos e criar projeções para leitura, reconhecendo quando o padrão compensa e quando é custo desnecessário.
- Conceitos: event sourcing, evento, armazenamento de eventos, append-only, fluxo de eventos, comando, projeção, evento compensatório, consistência eventual, concorrência otimista, snapshot, versionamento de eventos, CQRS
- Edição: [HTML](content/system-design/003-event-sourcing.html)

Conceito: uma carteira de pontos em CRUD sobrescreve o saldo e não explica para onde foram 900 pontos; uma tabela de histórico paralela diverge do saldo. Apresenta event sourcing como anexar fatos imutáveis ao fluxo de cada carteira e derivar o saldo aplicando-os em ordem; separa comando, evento e projeção; corrige uma expiração indevida com evento compensatório; e compara quando o padrão compensa e quando o CRUD basta. Aprofundamentos opcionais tratam a diferença para mensageria e CQRS, projeções com atraso e idempotentes, concorrência otimista com versão esperada, snapshots, versionamento de eventos, replay com sistemas externos e dados pessoais. Inclui um laboratório interativo (event store simulado da carteira) com modo apresentação em seis cenários guiados.

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

### conceitos-de-ia-001 — RAG: o assistente consulta seus documentos antes de responder

- Data: 2026-10-30
- Nível: iniciante
- Estado: apresentado
- Identidade do objetivo: `rag-fundamentos-busca-resposta`
- Objetivo: Entender o que é RAG e por que ele existe: como um assistente busca trechos dos seus documentos e responde com base neles, e por que uma resposta errada pode nascer na busca ou na resposta.
- Conceitos: RAG, modelo de linguagem, alucinação, busca (recuperação), resposta (geração), trecho, índice, contexto, fonte da resposta, embedding, busca por palavra-chave
- Edição: [HTML](content/conceitos-de-ia/001-rag-busca-resposta.html)

Conceito: um assistente de RH ligado direto ao modelo inventa o valor do auxílio home office, porque o modelo nunca leu a política interna. Apresenta RAG como consultar antes de responder: preparar trechos em um índice, buscar os mais relacionados, montar o contexto com instrução para responder só com base neles e devolver a resposta com a fonte. Ensina a perguntar em qual etapa o erro nasceu (busca ou resposta) antes de trocar o modelo. Aprofundamentos opcionais tratam embeddings e busca por palavra-chave, trechos que perdem o contexto, quando dispensar a busca e como começar a testar as duas etapas.

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
