# Sharding — roteamento

HyperFrames 0.8.140, GSAP local, 960 × 640, 24 segundos a 24 fps, sem áudio. Duas cenas editáveis em `compositions/`: consulta por tenant e agregação global. O tempo de resposta é fictício.

Na raiz do repositório:

```powershell
npx --yes hyperframes@0.8.140 check motion/sharding-roteamento --at 0,4,8,12,16,18,21,23
npx --yes hyperframes@0.8.140 snapshot motion/sharding-roteamento --at 8 --no-end --output work/routing-poster
npx --yes hyperframes@0.8.140 render motion/sharding-roteamento --format mp4 --fps 24 --workers 1 --quality looks --output site/assets/sharding-roteamento.mp4
```

Copiar o PNG de 8 s para `site/assets/sharding-roteamento-poster.png`. Para editar em Studio, executar `npm run dev` nesta pasta. O render precisa de FFmpeg e FFprobe no PATH. Se o navegador empacotado não iniciar, selecionar um Chrome compatível com `HYPERFRAMES_BROWSER_PATH` e repetir `check`.

O artigo usa MP4 com poster inicial, controles nativos, pausa que preserva a posição, repetição manual e velocidade de 0,5× a 2×. Não há autoplay nem loop. A preferência de movimento reduzido também pausa um vídeo em execução quando ativada. A alternativa estática e a legenda permitem estudar sem reproduzir.

Validação: zero findings em lint, runtime, layout, motion e contraste, em oito tempos. Imagens de 8, 18 e 23 s e quadros do MP4 foram inspecionados.
