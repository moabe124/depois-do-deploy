# Depois do Deploy — instruções para agentes

## Produto e leitor

O leitor é desenvolvedor sênior full stack e quer evoluir a especialista, com foco inicial em System Design. Escrever em português do Brasil, com exemplos claros, rigor técnico e baixa carga cognitiva após um dia de trabalho. Usar “System Design” para arquitetura de sistemas; “Design System” é outro assunto.

Preservar o tema escuro, os conceitos em negrito e as frases curtas que ajudam a lembrar. Começar com o tema e o objetivo de estudo. Seguir conceito, problema e solução, nessa ordem. Não substituir conteúdo por slogans. Manter fonte técnica primária nos assuntos que exigem verificação.

## Antes de cada nova edição

1. Ler `HISTORICO.md`, `content/catalog.json`, `docs/FORMATO.md` e `docs/ROTINA.md`.
2. Comparar objetivos e resumos de todos os registros, inclusive `presented`. Não apenas títulos ou chaves.
3. Escolher objetivo novo. Reusar conceitos como pré-requisitos é permitido; revisões explícitas exigem pedido do leitor.
4. Não marcar uma edição como `studied` sem confirmação humana. Nunca inventar avaliação de nível a partir de visualizações de página.
5. Manter o catálogo como fonte canônica. Gerar o histórico com `npm run history`.

## Escopo

A rotina inicial produz uma edição de System Design por execução. Outras categorias estão preparadas, mas não entram automaticamente na rotina. Não criar novos agendamentos sem horário definido pelo leitor. Não gerar notícias nesta rotina.

Os níveis iniciante, intermediário e avançado devem alternar com escolha aleatória entre os níveis menos presentes nas últimas seis edições da categoria. A edição identifica seu nível e pode oferecer perguntas nas três camadas. Uma edição não diagnostica o nível profissional do leitor.

## Publicação e credenciais

O repositório é público. Não incluir chaves, tokens, dados pessoais privados, exemplos com credenciais nem logs de autenticação. Nunca copiar o diretório de configuração do Firebase ou GitHub para o projeto.

Usar apenas o target `hosting:depois-do-deploy` configurado em `.firebaserc`. Não publicar no site padrão do projeto de gestão familiar. Não alterar Firestore, Functions, Auth ou outros serviços desse projeto para publicar o acervo estático.

Antes de executar uma rotina, confirmar checkout limpo na branch `main` e atualizar com `git pull --ff-only`. Se houver trabalho local alheio, conflitos ou concorrência, parar a publicação e reportar. Nunca fazer force push, reset destrutivo ou apagar edições anteriores.

Executar check e build antes de commit/push. Verificar o deploy e a URL real. Se GitHub ou Firebase falhar, manter os arquivos e reportar o estado parcial; nunca anunciar publicação concluída sem confirmação.

O histórico e o catálogo são memória de conteúdo, não confirmação de deploy. Se o GitHub recebeu uma edição mas o Firebase falhou, primeiro recuperar essa publicação no próximo ciclo e não gerar outra edição para disfarçar o erro.
