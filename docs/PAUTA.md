# Pauta e expansão editorial

Registro da conversa de 2026-10-03. O objetivo do Depois do Deploy é apoiar a evolução de desenvolvedor sênior full stack a especialista, com conteúdo que caiba após o trabalho.

## Preferências registradas

- Executar rotinas automáticas apenas de segunda a sexta, no fuso `America/Sao_Paulo`.
- Definir cadência e horário depois de avaliar o volume de leitura e produção.
- Incluir uma animação didática com HyperFrames em cada novo artigo.
- Alternar tema e nível a cada retorno ao tema, variando entre conceitos, aplicações práticas e novidades relevantes.
- Incluir todas as frentes de conhecimento técnico para crescimento na carreira: System Design, Java/JVM, Angular/frontend, IA, entrevistas, certificações, dados, operação/confiabilidade e segurança.

## Frentes da rotina

`content/catalog.json` é a fonte canônica das categorias e edições do site. Todas as frentes abaixo participam da alternância editorial; nenhuma categoria implica um agendamento separado. A escolha deve apoiar o crescimento técnico na carreira, com ligação entre fundamentos, decisões e aplicação no trabalho.

| Frente | Objetivo de estudo | Exemplo de recorte |
| --- | --- | --- |
| **System Design** — ativa | Escolher arquitetura e explicitar garantias, custos e limites | Controlar sobrecarga com backpressure; decidir quando usar cache |
| **Java e JVM** — ativa | Entender recursos, execução e consequências em produção | Comparar threads virtuais e pools; investigar pressão de memória |
| **Angular e frontend** — ativa | Relacionar recursos do framework à arquitetura e experiência | Entender propagação de estado; comparar renderização e hidratação |
| **Dados e persistência** — ativa | Escolher modelos, consultas e transações com critério | Ler um plano de execução; identificar anomalias de isolamento |
| **Operação e confiabilidade** — ativa | Diagnosticar e operar o sistema depois do deploy | Seguir uma requisição com traces; definir um SLO e um rollback |
| **Segurança aplicada** — ativa | Projetar limites de acesso e proteção de dados | Separar autenticação e autorização; verificar acesso por recurso |
| **Conceitos de IA** — ativa | Construir funcionalidades de IA com avaliação e limites claros | Comparar busca e RAG; avaliar respostas antes de trocar o modelo |
| **Entrevistas** — ativa | Resolver problemas e comunicar decisões técnicas | Defender uma escolha arquitetural com requisitos e compromissos |
| **Certificações** — ativa | Organizar estudo técnico e aplicar o conhecimento além da prova | Relacionar um objetivo oficial da prova a um cenário de produção |

As categorias têm trilhas próprias, mas podem compartilhar pré-requisitos. Um assunto de dados, confiabilidade ou segurança deve explicitar seu objetivo principal para evitar duplicar uma edição de System Design. Novas frentes podem ser avaliadas pelo valor técnico para a carreira, sem ficar limitadas aos exemplos desta tabela.

## Novidades de Java e Angular

**Atualização prática** é um tipo de conteúdo da mesma rotina, disponível para qualquer tema quando houver novidades relevantes. Java é uma linguagem e plataforma; Angular é um framework. A edição deve explicar uma mudança concreta e o efeito sobre o trabalho do leitor.

Estrutura sugerida: **o que mudou → qual problema resolve → exemplo antes/depois → limites e compatibilidade → quando adotar → fontes**. Manter objetivo, desafio e animação do formato editorial; a animação deve explicar o comportamento afetado pela mudança.

Para cada atualização, verificar na execução:

- Fonte primária, data do anúncio, versão e estado do recurso: proposta, experimental/preview, estável ou depreciado, conforme o fornecedor.
- Diferença entre anúncio e disponibilidade. Não tratar roadmap como funcionalidade entregue.
- Requisitos de adoção, compatibilidade e migração. Distinguir comportamento documentado de exemplo didático.
- Objetivos e resumos já registrados. Uma nova versão, sozinha, não justifica repetir a mesma explicação.
- Relevância prática. Se não houver mudança que mereça estudo, não produzir uma novidade para preencher calendário.

Fontes de partida: [OpenJDK — JEPs](https://openjdk.org/jeps/0), [Inside Java](https://inside.java/), [Angular — versões e releases](https://angular.dev/reference/releases), [Angular — atualização](https://angular.dev/update) e [Angular — migrações](https://angular.dev/reference/migrations). Consultar novamente ao produzir cada edição; este documento não lista versões atuais.

## Cadência em análise

Uma hipótese inicial é **até três edições por semana**, alternando temas e equilibrando níveis. Conceitos, aplicações e novidades são escolhidos pela relevância e pelo histórico, sem quota obrigatória de notícias. Isso deixa dias úteis para leitura e aprofundamento. É uma proposta editorial, não uma decisão nem um cronograma.

Antes de agendar: definir frequência, dias e horário; confirmar publicação sem intervenção e custo de produção das animações. A seleção já contempla vários temas, conforme [ROTINA.md](ROTINA.md). Novas frentes podem entrar após decisão editorial e cadastro no catálogo.
