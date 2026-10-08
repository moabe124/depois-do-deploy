# Sharding — hotspot

HyperFrames 0.8.140, GSAP local, 960 × 640, 24 segundos a 24 fps, sem áudio. Cenas editáveis em `compositions/`: faixas de IDs e faixas de hash. Os seis IDs e a distribuição 2/2/2 são didáticos; não representam uma função de hash real nem uma garantia de equilíbrio.

Na raiz do repositório:

```powershell
npx --yes hyperframes@0.8.140 check motion/sharding-hotspot --at 0,4,8,10,13,16,20,23
npx --yes hyperframes@0.8.140 snapshot motion/sharding-hotspot --at 10 --no-end --output work/hotspot-poster
npx --yes hyperframes@0.8.140 render motion/sharding-hotspot --format mp4 --fps 24 --workers 1 --quality looks --output site/assets/sharding-hotspot.mp4
```

Copiar o PNG de 10 s para `site/assets/sharding-hotspot-poster.png`. Para editar em Studio, executar `npm run dev` nesta pasta. Requer FFmpeg, FFprobe e um Chrome compatível. `HYPERFRAMES_BROWSER_PATH` permite selecionar o navegador quando necessário.

Reprodução finita, somente por escolha do leitor, com pausa, repetição e velocidade no artigo. A legenda descreve a sequência, explica as hipóteses e acompanha uma imagem estática.

Validação: zero findings em lint, runtime, layout, motion e contraste, em oito tempos. Imagens de 10, 18 e 23 s e quadros do MP4 foram inspecionados.
