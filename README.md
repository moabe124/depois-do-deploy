# Depois do Deploy

Leituras curtas para a jornada de desenvolvedor sênior a especialista. Um conceito de cada vez, com contexto e decisões de arquitetura.

**Site:** [Depois do Deploy](https://depois-do-deploy-moabe124.web.app).

## Biblioteca

- **System Design:** arquitetura, escala, consistência, resiliência e operação. Primeira edição: idempotência e retries seguros.
- **Java e JVM:** conceitos, aplicações e novidades da linguagem e da plataforma.
- **Angular e frontend:** conceitos, arquitetura e novidades do framework.
- **Conceitos de IA:** fundamentos, aplicações, avaliação e novidades.
- **Entrevistas:** raciocínio, comunicação técnica e resolução de problemas.
- **Certificações:** trilhas e conceitos com aplicação além da prova.
- **Dados e persistência:** modelagem, consultas, transações e armazenamento.
- **Operação e confiabilidade:** observabilidade, entrega e diagnóstico em produção.
- **Segurança aplicada:** autorização, proteção de dados e desenvolvimento seguro.

Tema escuro por padrão. Cada edição começa com o objetivo de estudo e segue **conceito → problema → solução → aprofundamento → desafio**. Cada novo artigo inclui uma animação didática com HyperFrames, com controles de reprodução e alternativa estática. Leitura essencial de aproximadamente 3 minutos ou completa de aproximadamente 8 minutos. Os tempos são estimativas.

A rotina alterna temas ativos e níveis, com uma edição por execução. O conteúdo pode ser um conceito, uma aplicação prática ou uma novidade relevante, sempre com objetivo de estudo e impacto técnico explicado. A seleção está em [docs/ROTINA.md](docs/ROTINA.md).

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

Consulte [a operação da rotina](docs/ROTINA.md) e [a configuração do Firebase](docs/FIREBASE.md). A rotina deve executar apenas de segunda a sexta, no fuso `America/Sao_Paulo`; cadência e horário ainda estão em definição. As propostas de novos temas estão em [docs/PAUTA.md](docs/PAUTA.md). GitHub Actions já valida o acervo; deploy via GitHub Actions só deve ser considerado ativo após configurar e testar a autenticação específica.

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
