# Rotina de geração e publicação

Este fluxo está preparado para uma rotina recorrente do Codex. O agendamento não está ativo neste documento. A preferência do leitor é executar apenas de segunda a sexta, no fuso `America/Sao_Paulo`. Cadência e horário ainda estão em definição. É necessário confirmar acesso ao checkout, GitHub e Firebase na execução sem intervenção.

## Decisões e pendências

- **Dias:** segunda a sexta. Não executar rotinas automáticas no sábado ou domingo, nem compensar uma execução perdida gerando várias edições de uma vez.
- **Cadência e horário:** pendentes. A rotina não precisa ser diária. Não criar agendamento antes de o leitor definir esses pontos.
- **Escopo:** uma edição por execução, alternando tema, nível e tipo de conteúdo. Todas as categorias ativas do catálogo participam: System Design, Java/JVM, Angular/frontend, IA, entrevistas, certificações, dados/persistência, operação/confiabilidade e segurança. O objetivo é ampliar conhecimento técnico para crescer na carreira, conforme [PAUTA.md](PAUTA.md).
- **Formato:** cada novo artigo inclui uma animação didática com HyperFrames, conforme [FORMATO.md](FORMATO.md).

## Seleção editorial por execução

1. Considerar todas as edições do catálogo, inclusive `presented`. Usar a data editorial para ordenar; em empate, usar a posição no catálogo, mantendo novas edições ao final.
2. **Tema:** excluir o tema da edição mais recente. Entre as categorias ativas restantes, escolher aleatoriamente uma das menos presentes nas últimas seis edições gerais. Categorias sem edição contam como zero. Se houver menos de duas categorias ativas, reportar a impossibilidade de alternar, sem inventar uma categoria.
3. **Nível:** consultar as últimas seis edições do tema escolhido. Excluir o nível da edição mais recente desse tema e sortear entre os níveis menos presentes dentre os restantes. Sem histórico no tema, os três níveis são elegíveis. A alternância é por tema; temas distintos podem ter o mesmo nível em execuções consecutivas.
4. **Tipo:** escolher conceito, aplicação prática ou novidade relevante. Consultar os resumos anteriores para variar a abordagem; evitar repetir o tipo da última edição do tema quando houver uma alternativa útil. Identificar o tipo no artigo e no resumo do catálogo.
5. **Novidades:** pesquisar fontes primárias atuais, conferir data, versão e disponibilidade. Explicar o que mudou, o problema, a adoção e os limites na profundidade escolhida. Se não houver novidade relevante, produzir conceito ou aplicação prática no tema escolhido. Não preencher calendário com notícia antiga apresentada como nova.
6. **Objetivo:** comparar objetivos e resumos de todo o acervo. Trocar tema, nível ou tipo não torna automaticamente novo um objetivo já tratado.

A seleção deve cobrir todas as frentes ao longo das execuções, sem privilegiar continuamente System Design, Java ou Angular. Em certificações, ensinar conhecimento aplicável e verificar objetivos e versões oficiais da prova quando citados. Em entrevistas, trabalhar raciocínio, resolução de problemas e comunicação de decisões. Em IA, abordar fundamentos, construção de produtos, avaliação e novidades com critérios técnicos. Não presumir competência profissional a partir de um desafio.

Exemplo ilustrativo de alternância: System Design/intermediário/conceito → Java/iniciante/novidade → Angular/avançado/aplicação → System Design/avançado/aplicação. Não é um calendário fixo nem uma lista de artigos aprovados.

## Prompt durável sugerido

> Execute apenas em dias úteis, de segunda a sexta no fuso America/Sao_Paulo; se for fim de semana, encerre sem gerar ou publicar. Atualize o Depois do Deploy com uma edição em português, para um desenvolvedor sênior full stack em evolução a especialista. Trabalhe no checkout deste repositório. Leia AGENTS.md, HISTORICO.md, content/catalog.json, docs/ROTINA.md e docs/FORMATO.md antes de escolher o tema. Siga a seleção editorial de docs/ROTINA.md: alterne entre categorias ativas sem repetir o último tema, equilibre níveis dentro de cada tema e varie entre conceito, aplicação prática e novidade relevante. Compare objetivos e resumos para não repetir o foco de edições anteriores. Para novidades, consulte fontes primárias atuais e confira data, versão e disponibilidade; sem novidade relevante, escolha outro tipo de conteúdo no mesmo tema. Preserve o tema escuro, conceitos em negrito e a sequência conceito → problema → solução. Mantenha leitura essencial e completa, fontes técnicas primárias, aprofundamento opcional e um desafio. Inclua uma animação didática curta criada com HyperFrames, com reprodução e pausa, controle de velocidade, alternativa estática e respeito à preferência de movimento reduzido. Identifique tema, nível e tipo de conteúdo no artigo e registre o tipo no resumo. Cadastre a edição como apresentada; estudo exige confirmação do leitor. Atualize o histórico, valide o catálogo, gere o site, confira navegação e interações, faça commit e push para main e publique apenas hosting:depois-do-deploy no Firebase. Confirme a edição e a animação na URL publicada. Se houver uma publicação anterior incompleta, recupere-a antes de gerar conteúdo novo. Informe título, tema, nível, tipo, resumo, commit e link da edição ao concluir; informe falhas ou ação humana necessária sem alegar sucesso parcial como completo.

## Ordem operacional

0. Conferir a data em `America/Sao_Paulo`. Se for sábado ou domingo, encerrar a execução automática antes de gerar, recuperar ou publicar conteúdo. Pedidos manuais explícitos não são agendamentos.
1. Confirmar que a branch é `main` e que `git status --porcelain` está vazio. Atualizar com `git pull --ff-only`.
2. Confirmar a autenticação do GitHub e Firebase e o mapeamento exclusivo de Hosting em `.firebaserc`.
3. Ler catálogo, histórico e edição mais recente. Conferir se ela está publicada; recuperar deploy pendente antes de produzir outra.
4. Conferir se já existe uma edição na data local (`America/Sao_Paulo`), em qualquer categoria. Se existir, não criar outra sem pedido explícito. Trocar o tema não contorna o limite.
5. Selecionar tema, nível, tipo e objetivo conforme a seleção editorial acima. Escrever a edição, com ID, `focusKey`, fonte, URL, referências e resumo completos no catálogo. Criar a animação com HyperFrames, preservar sua composição em `motion/` e integrar a mídia e a imagem estática ao artigo.
6. Validar a composição e conferir a animação renderizada. Executar `npm run history`, `npm run check`, `npm run build`. Verificar desktop, celular, navegação, questionário e controles de animação, incluindo movimento reduzido e leitura sem JavaScript.
7. Fazer um commit incluindo HTML, catálogo, histórico, composição e assets da animação. Enviar com `git push origin main`; nunca usar force push.
8. Publicar com `firebase deploy --only hosting:depois-do-deploy --project gestao-familiar-1c9a1`. O mapeamento do target determina o site dedicado.
9. Verificar HTTP 200, título da edição e carregamento da animação e da imagem estática na URL publicada. Reportar commit e link.

## Recuperação

- Sem autenticação: não gerar uma edição que não possa ser concluída; avisar o leitor.
- Commit local sem push: recuperar push antes de iniciar a próxima geração.
- Push concluído sem deploy: reconstruir a mesma revisão e recuperar o deploy. Não mudar o conteúdo para contornar falhas de infraestrutura.
- Conflito ou mudança alheia: preservar arquivos e pedir intervenção. Não esconder o conflito com reset.
- Execuções concorrentes: não publicar a partir de duas cópias desatualizadas. Rejeição de push exige nova leitura do remoto antes de decidir como continuar.

## Limite atual

A publicação funciona pela CLI autenticada do Firebase. Uma rotina local depende do computador ligado, do Codex em execução e das permissões/autenticações disponíveis sem interação. Um workflow de geração em nuvem exigiria um executor de conteúdo e autenticação própria; não existe geração automática pelo GitHub Actions nesta versão.
