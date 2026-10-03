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

Nenhuma edição apresentada.

## Operação e confiabilidade

Nenhuma edição apresentada.

## Segurança aplicada

Nenhuma edição apresentada.
