# Firebase Hosting

## Destino

Projeto escolhido: `gestao-familiar-1c9a1`. O acervo usa um site adicional, mapeado exclusivamente ao target `depois-do-deploy`. O site padrão de gestão familiar não deve ser alterado. Ambos os sites compartilham o projeto e as cotas de Hosting.

Site dedicado: `depois-do-deploy-moabe124`. URL: https://depois-do-deploy-moabe124.web.app.

`firebase.json` publica apenas os arquivos estáticos de `dist/`. Não há banco de dados, Functions ou credenciais do Firebase no navegador. O acervo será acessível publicamente pela URL do Hosting.

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
