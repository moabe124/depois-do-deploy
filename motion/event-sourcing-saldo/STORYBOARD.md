---
format: 960x640
duration: 24s
message: "Com event sourcing, o sistema guarda os fatos e calcula o saldo a partir deles; uma correção entra como fato novo."
arc: concept-explainer with process
audience: desenvolvedor sênior full stack, iniciante em event sourcing
mode: autonomous
music: none
captions: skipped (animação silenciosa com rótulos no diagrama)
---

## Frame 1 — Sobrescrever, anexar e corrigir

- status: animated
- src: compositions/frames/01-fatos-saldo.html
- type: feature_showcase
- persuasion: demonstração de causa e efeito
- beat: compreensão
- scene: A mesma carteira de pontos passa por três momentos: tabela que sobrescreve o saldo, eventos que derivam o saldo e correção registrada como evento novo.
- duration: 24s
- poster: 15.5s
- transition_in: cut
- voiceover:

narrativeRole: mostrar por que guardar só o estado atual apaga a explicação e como o log de eventos preserva os fatos e permite derivar o estado.
keyMessage: o saldo é consequência; o evento é o fato. O passado não se edita: a correção é um fato novo.

Scene 0–8s — Tabela comum: `Tabela carteiras · cliente 42 · saldo` começa em `1.200`. As operações `Resgate −400` e `Expiração −500` chegam por setas laranja; o número vira `800` e depois `300`, e aparece `valor anterior apagado`. As operações esmaecem. Chega a pergunta do cliente: `“Eu tinha 1.200. Cadê meus pontos?”`.

Scene 8–16,5s — Event sourcing: `Eventos da carteira 42` recebe, um por vez, `#1 PontosCreditados +1.000`, `#2 PontosCreditados +200`, `#3 PontosResgatados −400` e `#4 PontosExpirados −500`. O quadro `Saldo · projeção` acompanha: `1.000`, `1.200`, `800`, `300`. Notas: evento é um fato que não se edita; saldo = eventos aplicados em ordem; o histórico explica o 300.

Scene 16,5–24s — Correção: o evento `#4` fica destacado em laranja (expiração indevida) e permanece na lista. Entra `#5 ExpiracaoEstornada +500`, em verde, e o saldo passa para `800`. Nota final: o passado não se edita; a correção é um fato novo.

## Video direction

Diagrama técnico, plano e escuro. Sem camera drift, logotipo, música ou decorativos. Títulos 42px, subtítulos 28px, cartões e rótulos 22–28px, valor do saldo 52px, rodapé 20px. Laranja indica sobrescrita ou fato contestado; verde, evento anexado e correção; esmaecido, operação cujo motivo se perdeu. Uma timeline pausada, determinística e reversível.
