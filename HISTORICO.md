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

Nenhuma edição apresentada.

## Angular e frontend

Nenhuma edição apresentada.

## Conceitos de IA

Nenhuma edição apresentada.

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

Nenhuma edição apresentada.

## Segurança aplicada

Nenhuma edição apresentada.
