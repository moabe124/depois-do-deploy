---
duration: 24
width: 960
height: 640
music: none
---

## Video direction

Uma comparação estável em duas colunas permite acompanhar o destino das mesmas dez leituras. A contagem visual explica a média antes de revelar o resultado. Silêncio, sem cortes e sem movimento ornamental.

## Frame 01

status: outline
src: index.html
duration: 24
type: explanation
headline: "Dez leituras, dois caminhos"
roles: "leituras, cache, origem, tempos individuais, médias"
rules: "svg-path-draw, stat-bars-and-fills"
asset_candidates: []
transition_in: none

0–6 s: apresentar dez leituras sem cache e o caminho à origem. Todas custam 120 ms.

6–12 s: revelar a consulta ao cache e nove hits de 2 ms.

12–17 s: revelar um miss, o caminho adicional à origem e 2 + 120 = 122 ms.

17–21 s: mostrar soma dos tempos e divisão por dez. Resultado: média 120 ms versus 14 ms; dez chamadas à origem versus uma.

21–24 s: manter a comparação para leitura. Legenda permanente: cenário hipotético, cache aquecido. O poster usa o estado final e inclui os dois caminhos.
