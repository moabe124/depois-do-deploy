# Firebase Hosting

## Destino

Projeto escolhido: `gestao-familiar-1c9a1`. O acervo usa um site adicional, mapeado exclusivamente ao target `depois-do-deploy`. O site padrão de gestão familiar não deve ser alterado. Ambos os sites compartilham o projeto e as cotas de Hosting.

Site dedicado: `depois-do-deploy-moabe124`. URL: https://depois-do-deploy-moabe124.web.app.

`firebase.json` publica apenas os arquivos de `dist/`. O acervo é público. O progresso usa Firestore e login Google no app web dedicado. Não há Functions nem credenciais administrativas no navegador; a configuração pública do SDK está em `site/firebase-config.js`.

## Progresso privado

Caminho: `depoisDoDeploy/{uid}/lessons/{lessonId}`. Cada documento contém `read`, `readAt`, `quiz` e `updatedAt`. O questionário registra versão, respostas atuais, acertos, total e contagem de respostas. A biblioteca recalcula o resultado usando a definição versionada do questionário. É autoavaliação, não um mecanismo antifraude de prova.

O usuário autenticado e com email verificado pode acessar somente seu próprio UID. Login Google, marcação de leitura e resultados sincronizam entre dispositivos. Marcar como não lido mantém o resultado do desafio. Sair da conta limpa os indicadores da tela.

O fragmento `firebase/progress.rules` foi integrado às regras existentes. A regra familiar ampla precisa excluir a collection `depoisDoDeploy`, pois regras permissivas sobrepostas são combinadas por OR. A política familiar continua aplicada a todos os demais caminhos. As regras de todo o projeto são compartilhadas: **não fazer deploy do fragmento isolado** e preservar o bloco do Depois do Deploy ao publicar futuras regras pelo projeto de gestão familiar.

Os domínios `depois-do-deploy-moabe124.web.app` e `depois-do-deploy-moabe124.firebaseapp.com` estão autorizados para login, além dos domínios anteriores. Auth e cotas do banco são compartilhados. As collections familiares não são consultadas por este site.

## Publicar pelo checkout

```sh
firebase login
npm ci
npm run check
npm run build
firebase deploy --only hosting:depois-do-deploy --project gestao-familiar-1c9a1
```

Se a CLI não estiver no PATH, usar o caminho da instalação local. Não commitar esse caminho pessoal no código.

## Deploy pelo GitHub Actions

A validação do acervo está em `.github/workflows/validate.yml`. Após sucesso em um push para `main`, `.github/workflows/firebase-deploy.yml` publica automaticamente no **target exclusivo** `depois-do-deploy` e verifica o commit e os arquivos na URL real. Pull requests apenas validam.

O CD usa credenciais temporárias via OIDC, com conta de serviço dedicada e sem chave JSON permanente. Para os próximos artigos, basta validar, fazer commit/push e acompanhar os dois workflows. Consulte [DEPLOY.md](DEPLOY.md) para operação, permissões e recuperação.

Referência: [Deploy via GitHub](https://firebase.google.com/docs/hosting/github-integration).
