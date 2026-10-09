# CD no GitHub

O workflow **Publicar Firebase** publica o site dedicado depois que **Validar acervo** termina com sucesso em um push para `main`. Pull requests apenas validam. A criação e a revisão dos artigos continuam no fluxo editorial; o GitHub automatiza a entrega do conteúdo commitado.

## Próximos artigos

1. Criar a edição, a animação e o registro no catálogo conforme `AGENTS.md` e `docs/ROTINA.md`.
2. Executar `npm run history`, `npm run check` e `npm run build`; conferir a edição no navegador.
3. Fazer commit e `git push origin main`.
4. Acompanhar **Validar acervo** e **Publicar Firebase** em [Actions](https://github.com/moabe124/depois-do-deploy/actions).
5. Confirmar a edição em https://depois-do-deploy-moabe124.web.app. O resumo do CD registra o commit publicado.

Não é necessário executar `firebase deploy` a cada artigo. Para recuperar uma publicação, usar **Run workflow** em **Publicar Firebase**, selecionando `main`. A execução manual repete a validação e o build.

## Garantias

- O build usa o SHA exato validado, registra hashes em `dist/deploy.json` e transfere `dist/` como artefato entre os jobs. O deploy não reconstrói o conteúdo.
- Publicações são serializadas. Uma revisão que já não é a ponta de `main` é ignorada antes da autenticação; o pipeline da revisão mais recente faz a publicação.
- A CLI está fixada em `firebase-tools@15.33.0`; as Actions estão fixadas pelo SHA.
- O destino é conferido: projeto `gestao-familiar-1c9a1`, target `hosting:depois-do-deploy`, site `depois-do-deploy-moabe124`, diretório `dist/`.
- O comando publica somente Hosting. Regras do Firestore, provedores de Auth e dados familiares não fazem parte do fluxo.
- Após publicar, o CD verifica HTTP 200 e hashes de todos os arquivos na URL real, incluindo artigos, animações e posters. Uma URL servindo outro commit não é sucesso.

## Autenticação

O GitHub usa OIDC e Workload Identity Federation com conta de serviço dedicada. Não há chave JSON permanente nem `FIREBASE_TOKEN` no repositório ou nos secrets.

Variáveis de Actions, sem credenciais:

| Variável | Valor |
| --- | --- |
| `FIREBASE_WORKLOAD_IDENTITY_PROVIDER` | `projects/719117952307/locations/global/workloadIdentityPools/depois-deploy/providers/github-main` |
| `FIREBASE_DEPLOY_SERVICE_ACCOUNT` | `depois-deploy-hosting@gestao-familiar-1c9a1.iam.gserviceaccount.com` |

O provider aceita somente o repositório de ID `1402535996`, do owner de ID `12815833`, na branch `refs/heads/main`, usando `.github/workflows/firebase-deploy.yml`. Para publicar, a conta precisa de `roles/firebasehosting.admin` e `roles/serviceusage.apiKeysViewer`, papéis documentados para a CLI de Hosting. A federação pode impersonar essa conta via `roles/iam.workloadIdentityUser`.

Os papéis de Hosting são concedidos no projeto compartilhado. A restrição ao site dedicado é aplicada pelo target, pela conferência de configuração e pelo comando do workflow; não é uma política IAM por site. Não conceder papéis de Firestore, Auth, Editor ou Owner à conta. Mudanças no workflow e no mapeamento do target exigem revisão.

## Recuperação

Se o CI falhar, corrigir o conteúdo antes de publicar. Se o CD falhar, manter a mesma edição e recuperar a execução em Actions; não gerar outra edição para esconder uma publicação incompleta. Conferir ambos os workflows e o commit em `/deploy.json`, além da página real, antes de anunciar publicação concluída.

Com trabalho local alheio, preservá-lo e seguir a regra do checkout limpo da rotina. O CD publica somente o que chegou à `main`, não arquivos locais.

Referências: [ADC na Firebase CLI](https://firebase.google.com/docs/cli#cli-ci-systems), [federação para pipelines](https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines), [Action de autenticação](https://github.com/google-github-actions/auth) e [papéis de Hosting](https://firebase.google.com/docs/projects/iam/roles-predefined-product#firebase-hosting-roles).
