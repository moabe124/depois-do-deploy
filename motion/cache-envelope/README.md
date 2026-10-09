# Dez leituras, dois caminhos

Animação didática do artigo sobre back-of-the-envelope. Composição única de 24 segundos, 960 × 640, silenciosa e determinística. CLI fixada em `hyperframes@0.8.143` no `package.json`.

O exemplo compara dez leituras diretas de 120 ms com nove hits de 2 ms e um miss de 122 ms. A média é 14 ms e as chamadas à origem caem de dez para uma. Valores hipotéticos, cache aquecido e preenchimento fora do caminho crítico. A soma de tempos individuais não é o tempo de um lote paralelo.

## Editar e exportar

Com Node.js, FFmpeg e FFprobe no PATH:

```powershell
npm run check
npm run dev -- --background
npm run render -- --quality delivery --fps 30 --workers 2 --output ../../site/assets/cache-envelope.mp4
```

`index.html` usa o GSAP local. `index.motion.json` verifica a ordem e os momentos de aparição, além dos limites da cena. `frame.md` preserva o estilo; `STORYBOARD.md` descreve os momentos. O poster corresponde ao estado final, capturado em 23,9 segundos.

## Verificação em 09/10/2026

- HyperFrames check: aprovado, sem erros de execução, layout, movimento ou contraste. 131 verificações de contraste passaram.
- Aviso de organização do Studio revisado: a cena única agrupa elementos em uma linha da timeline. O formato monolítico é intencional para este trecho curto; o aviso não afeta a reprodução ou a exportação.
- Snapshots de 4 s, 10,8 s, 15,5 s e 23,9 s inspecionados antes do render.
- Exportação MP4: 24,0 segundos, 30 fps, 960 × 640, H.264, aproximadamente 558 KB. Mídia e poster em `site/assets/`.
- Artigo: calculadora, desafio, modos de leitura, temas, movimento reduzido, larguras de 1440/390/320 px e leitura sem JavaScript verificados no navegador.
- Registro, geração de histórico e build com três edições aprovados em uma cópia temporária; integração ao catálogo canônico autorizada pelo leitor para commit e push.

Artigo em `content/system-design/002-back-of-the-envelope.html`. URL gerada: `temas/system-design/002-back-of-the-envelope.html`. O deploy de Hosting está pendente.
