# Depois do Deploy — instruções para agentes

## Produto e leitor

O leitor é desenvolvedor sênior full stack e quer evoluir a especialista, estudando diferentes temas de desenvolvimento e arquitetura. Escrever em português do Brasil, com exemplos claros, rigor técnico e baixa carga cognitiva após um dia de trabalho. Usar “System Design” para arquitetura de sistemas; “Design System” é outro assunto.

A rotina cobre conhecimento técnico para crescimento na carreira: System Design, Java/JVM, Angular/frontend, IA, entrevistas, certificações, dados, operação/confiabilidade e segurança. Não restringir a seleção a arquitetura ou a linguagens; considerar todas as categorias ativas do catálogo.

Preservar o tema escuro, os conceitos em negrito e as frases curtas que ajudam a lembrar. Começar com o tema e o objetivo de estudo. Seguir conceito, problema e solução, nessa ordem. Não substituir conteúdo por slogans. Manter fonte técnica primária nos assuntos que exigem verificação.

## Antes de cada nova edição

1. Ler `HISTORICO.md`, `content/catalog.json`, `docs/FORMATO.md` e `docs/ROTINA.md`.
2. Comparar objetivos e resumos de todos os registros, inclusive `presented`. Não apenas títulos ou chaves.
3. Escolher objetivo novo. Reusar conceitos como pré-requisitos é permitido; revisões explícitas exigem pedido do leitor.
4. Não marcar uma edição como `studied` sem confirmação humana. Nunca inventar avaliação de nível a partir de visualizações de página.
5. Manter o catálogo como fonte canônica. Gerar o histórico com `npm run history`.

## Escopo

A rotina produz uma edição por execução e alterna entre as categorias ativas de `content/catalog.json`. Cada execução escolhe um tema diferente da anterior, um nível e um tipo de conteúdo: conceito, aplicação prática ou novidade relevante do tema. Notícias exigem consulta atual a fontes primárias e explicação do impacto técnico. Não criar novos agendamentos sem cadência e horário definidos pelo leitor.

As rotinas automáticas devem executar apenas de segunda a sexta, no fuso `America/Sao_Paulo`. Cadência e horário ainda estão em definição. A seleção editorial está em `docs/ROTINA.md` e as propostas de expansão estão em `docs/PAUTA.md`; propostas ainda não aprovadas não ativam categorias ou agendamentos.

Cada novo artigo deve incluir uma animação didática curta criada com HyperFrames, ligada ao objetivo de estudo. Seguir os controles, a alternativa estática e a acessibilidade definidos em `docs/FORMATO.md`.

Os níveis iniciante, intermediário e avançado devem alternar dentro de cada tema. Excluir o nível da última edição da categoria e escolher aleatoriamente entre os níveis menos presentes nas últimas seis edições da categoria, dentre os restantes. A edição identifica seu nível e pode oferecer perguntas nas três camadas. Em novidades, o nível descreve a profundidade da análise. Uma edição não diagnostica o nível profissional do leitor.

## Publicação e credenciais

O repositório é público. Não incluir chaves, tokens, dados pessoais privados, exemplos com credenciais nem logs de autenticação. Nunca copiar o diretório de configuração do Firebase ou GitHub para o projeto.

Usar apenas o target `hosting:depois-do-deploy` configurado em `.firebaserc`. Não publicar no site padrão do projeto de gestão familiar. Não alterar Firestore, Functions, Auth ou outros serviços desse projeto para publicar o acervo estático.

Antes de executar uma rotina, confirmar checkout limpo na branch `main` e atualizar com `git pull --ff-only`. Se houver trabalho local alheio, conflitos ou concorrência, parar a publicação e reportar. Nunca fazer force push, reset destrutivo ou apagar edições anteriores.

Executar check e build antes de commit/push. Verificar o deploy e a URL real. Se GitHub ou Firebase falhar, manter os arquivos e reportar o estado parcial; nunca anunciar publicação concluída sem confirmação.

O histórico e o catálogo são memória de conteúdo, não confirmação de deploy. Se o GitHub recebeu uma edição mas o Firebase falhou, primeiro recuperar essa publicação no próximo ciclo e não gerar outra edição para disfarçar o erro.
