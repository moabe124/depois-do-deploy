# Rotina de geração e publicação

Este fluxo está preparado para uma rotina diária do Codex. O agendamento não está ativo neste documento. É necessário definir horário e confirmar acesso ao checkout, GitHub e Firebase na execução unattended.

## Prompt durável sugerido

> Atualize o Depois do Deploy com uma edição de System Design em português, para um desenvolvedor sênior full stack em evolução a especialista. Trabalhe no checkout deste repositório. Leia AGENTS.md, HISTORICO.md, content/catalog.json e docs/FORMATO.md antes de escolher o tema. Compare objetivos e resumos para não repetir o foco de edições anteriores. Escolha aleatoriamente entre os níveis menos presentes nas últimas seis edições. Preserve o tema escuro, conceitos em negrito e a sequência conceito → problema → solução. Mantenha leitura essencial e completa, fontes técnicas primárias, aprofundamento opcional e um desafio. Cadastre a edição como apresentada; estudo exige confirmação do leitor. Atualize o histórico, valide o catálogo, gere o site, confira navegação e interações, faça commit e push para main e publique apenas hosting:depois-do-deploy no Firebase. Confirme a edição na URL publicada. Se houver uma publicação anterior incompleta, recupere-a antes de gerar conteúdo novo. Informe título, tema, resumo, commit e link da edição ao concluir; informe falhas ou ação humana necessária sem alegar sucesso parcial como completo.

## Ordem operacional

1. Confirmar que a branch é `main` e que `git status --porcelain` está vazio. Atualizar com `git pull --ff-only`.
2. Confirmar a autenticação do GitHub e Firebase e o mapeamento exclusivo de Hosting em `.firebaserc`.
3. Ler catálogo, histórico e edição mais recente. Conferir se ela está publicada; recuperar deploy pendente antes de produzir outra.
4. Conferir se já existe uma edição da categoria na data local (`America/Sao_Paulo`). Se existir, não criar outra sem pedido explícito.
5. Selecionar objetivo novo e escrever a edição, com ID, `focusKey`, fonte, URL, referências e resumo completos no catálogo.
6. Executar `npm run history`, `npm run check`, `npm run build`. Verificar desktop, celular, navegação e interação principal.
7. Fazer um commit incluindo HTML, catálogo e histórico. Enviar com `git push origin main`; nunca usar force push.
8. Publicar com `firebase deploy --only hosting:depois-do-deploy --project gestao-familiar-1c9a1`. O mapeamento do target determina o site dedicado.
9. Verificar HTTP 200 e o título da edição na URL publicada. Reportar commit e link.

## Recuperação

- Sem autenticação: não gerar uma edição que não possa ser concluída; avisar o leitor.
- Commit local sem push: recuperar push antes de iniciar a próxima geração.
- Push concluído sem deploy: reconstruir a mesma revisão e recuperar o deploy. Não mudar o conteúdo para contornar falhas de infraestrutura.
- Conflito ou mudança alheia: preservar arquivos e pedir intervenção. Não esconder o conflito com reset.
- Execuções concorrentes: não publicar a partir de duas cópias desatualizadas. Rejeição de push exige nova leitura do remoto antes de decidir como continuar.

## Limite atual

A publicação funciona pela CLI autenticada do Firebase. Uma rotina local depende do computador ligado, do Codex em execução e das permissões/autenticações disponíveis sem interação. Um workflow de geração em nuvem exigiria um executor de conteúdo e autenticação própria; não existe geração automática pelo GitHub Actions nesta versão.
