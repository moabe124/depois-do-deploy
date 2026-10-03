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

## Deploy pelo GitHub Actions (opcional)

A validação do acervo está em `.github/workflows/validate.yml`. Ela não publica o site. O fluxo diário local pode fazer push e deploy pela CLI já autenticada.

Para publicação em nuvem, configurar posteriormente a autenticação dedicada e um workflow que faça build e deploy no **target exclusivo** `depois-do-deploy`. A integração oficial do Firebase pode criar o workflow e armazenar a credencial no GitHub como secret. Nunca salvar a credencial em arquivos versionados. Usar as permissões mínimas adequadas ao destino.

Referência: [Deploy via GitHub](https://firebase.google.com/docs/hosting/github-integration).
