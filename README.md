# Depois do Deploy

Leituras curtas para a jornada de desenvolvedor sênior a especialista. Um conceito de cada vez, com contexto e decisões de arquitetura.

**Site:** [Depois do Deploy](https://depois-do-deploy-moabe124.web.app).

## Biblioteca

- **System Design:** arquitetura, escala, consistência, resiliência e operação. Primeira edição: idempotência e retries seguros.
- **Conceitos de IA:** reservado para futuras edições.
- **Entrevistas:** reservado para futuras edições.
- **Certificações:** reservado para futuras edições.

Tema escuro por padrão. Cada edição começa com o objetivo de estudo e segue **conceito → problema → solução → aprofundamento → desafio**. Leitura essencial de aproximadamente 3 minutos ou completa de aproximadamente 8 minutos. Os tempos são estimativas.

## Fonte da verdade e memória

`content/catalog.json` registra títulos, objetivos, conceitos, fontes, resumos e arquivos de cada edição. `HISTORICO.md` é a versão legível gerada desse catálogo. O site também é gerado a partir dele, evitando listas divergentes.

- `presented`: edição disponível/apresentada. Não significa que o leitor a estudou.
- `studied`: estudo confirmado pelo leitor, com `studiedAt` em formato `YYYY-MM-DD`.
- A rotina considera **todos os registros** ao evitar repetições.
- `focusKey` identifica o objetivo da edição dentro da categoria. Objetivos iguais são rejeitados na validação.
- Conceitos podem reaparecer como pré-requisitos ou em aplicações mais avançadas. O agente precisa comparar objetivos e resumos; chaves diferentes não comprovam novidade semântica.

Para confirmar estudo, atualizar o registro no catálogo e executar `npm run history`. O site não registra leitura automaticamente e não oferece sincronização de progresso entre dispositivos.

## Desenvolvimento

Requer Node.js 22 ou superior. O build não depende de bibliotecas externas.

```sh
npm ci
npm run check
npm run build
npm run dev
```

O servidor local abre em `http://127.0.0.1:4173`. O Firebase publica apenas `dist/`; instruções, arquivos de trabalho e credenciais não entram nesse diretório.

```text
content/catalog.json          catálogo canônico
content/<categoria>/*.html     fontes das edições
HISTORICO.md                   histórico com resumos
site/                         biblioteca e identidade visual
scripts/                      validação, histórico, build e preview
docs/                         formato editorial e operação da rotina
firebase.json                 configuração do site de Hosting dedicado
.github/workflows/            validação a cada push/PR
```

## Publicação

O destino do Firebase fica em `.firebaserc`, com um target exclusivo `depois-do-deploy`. Nunca usar o site padrão do projeto de gestão familiar.

```sh
npm run check
npm run build
firebase deploy --only hosting:depois-do-deploy
```

Consulte [a operação da rotina](docs/ROTINA.md) e [a configuração do Firebase](docs/FIREBASE.md). A rotina diária ainda precisa ser agendada com horário e fuso definidos. GitHub Actions já valida o acervo; deploy via GitHub Actions só deve ser considerado ativo após configurar e testar a autenticação específica.

## Acrescentar uma edição

1. Ler `AGENTS.md`, `HISTORICO.md`, `content/catalog.json` e `docs/FORMATO.md`.
2. Escolher um objetivo novo dentro da categoria e confirmar que não foi abordado.
3. Criar o HTML em `content/<categoria>/`, usando a edição existente como referência visual.
4. Registrar a edição completa no catálogo.
5. Executar `npm run history`, `npm run check` e `npm run build`.
6. Verificar navegação, interações, celular e desktop.
7. Commitar, enviar ao GitHub e publicar o target dedicado do Firebase.

Para acrescentar uma categoria, basta cadastrá-la em `topics` e adicionar suas edições. A biblioteca e o histórico serão atualizados pelo build.

Referências de infraestrutura: [Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart) e [integração com GitHub](https://firebase.google.com/docs/hosting/github-integration).
