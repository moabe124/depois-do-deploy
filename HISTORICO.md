# Histórico de temas — Depois do Deploy

> Gerado a partir de `content/catalog.json`. Não editar este arquivo diretamente.

“Apresentado” significa que a edição existe e foi disponibilizada no acervo. “Estudado” exige confirmação do leitor. Para evitar repetição, considerar ambos os estados.

## System Design

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

### dados-persistencia-001 — Sharding e escala horizontal: a chave e os limites

- Data: 2026-10-07
- Nível: intermediario
- Estado: apresentado
- Identidade do objetivo: `sharding-chave-localidade-hotspots`
- Objetivo: Escolher uma chave de sharding a partir das consultas e reconhecer o que fazer quando a carga se concentra ou atravessa shards.
- Conceitos: sharding, escala horizontal, chave de sharding, colocalização, hotspot, hash, scatter-gather, rebalanceamento, transações distribuídas, réplicas de leitura
- Edição: [HTML](content/dados-persistencia/001-sharding.html)

Aplicação prática: dividir pedidos de um SaaS entre shards exige equilibrar distribuição e localidade. A edição explica hotspots, scatter-gather, colocalização, transações, unicidade e migração. Compara réplicas de leitura, cache, separação de análises, sharding e SQL distribuído pelo gargalo e pelas garantias necessárias.

## Operação e confiabilidade

Nenhuma edição apresentada.

## Segurança aplicada

Nenhuma edição apresentada.
