# Formato editorial

## Direção

Um documento que o leitor consiga absorver cansado. Um objetivo principal por edição. Texto fluido, com parágrafos curtos e uma progressão explícita; profundidade por camadas, sem simplificações tecnicamente falsas.

## Estrutura

1. **Abertura:** tema, conceito ou novidade, objetivo e aplicação. Tipo de conteúdo (conceito, aplicação prática ou novidade), nível, data e duração estimada.
2. **Conceito:** definição direta, termos importantes em negrito e uma analogia breve quando ajudar.
3. **Problema:** cenário concreto; requisitos e o que acontece quando o sistema falha.
4. **Solução:** como aplicar o conceito, escolhas e compromissos. Incluir uma animação didática que esclareça a relação de causa e efeito. Diagramas e simulações adicionais entram quando ajudam a compreender.
5. **Aprofundamento:** detalhes recolhíveis, separados por base, aplicação e profundidade. Explicar garantias, concorrência, operação e limites.
6. **Desafio:** pergunta curta, feedback e resposta inicialmente escondida. Sem pontuação que finja medir competência profissional.
7. **Fecho:** uma frase memorável, seguida de fontes técnicas primárias para consulta posterior.

## Leitura

- Essencial: cerca de 3 minutos. Deve conter conceito, problema, solução e pergunta, sem depender dos blocos ocultos.
- Completa: cerca de 8 minutos, com camadas opcionais. Aprofundamentos podem ultrapassar esse tempo.
- HTML independente para cada edição, sem CDN ou APIs para a leitura básica.
- Tema escuro como padrão; modo claro opcional. Não animar continuamente nem usar notificações intrusivas.
- Priorizar leitura no desktop: coluna central de até 740 px, corpo em Segoe UI/Arial a 20 px com entrelinha 1,7 e cerca de 28 px entre parágrafos. Em telas menores, adaptar a coluna e usar corpo de pelo menos 18 px. Fundo escuro `#191d20`, texto `#d7d9d5` e conceitos em peso 600; manter contraste legível também em legendas e controles. Frases memoráveis usam uma borda discreta, sem caixas grandes disputando atenção com o texto.
- Celular e teclado: conteúdo sem cortes, botões legíveis e estados com texto; não depender apenas de cor.
- Evitar introduções vagas. Informar o que será estudado no primeiro bloco.
- Destacar conceitos e garantias, sem transformar parágrafos inteiros em negrito.

## Tipos de conteúdo

A mesma rotina alterna temas e níveis. Cada edição pode ensinar um **conceito**, explorar uma **aplicação prática** ou analisar uma **novidade** do tema. O nível indica a profundidade e os pré-requisitos do texto, inclusive em notícias.

Para novidades, começar pela mudança e seu objetivo de estudo; explicar o conceito afetado, o problema que motivou a mudança e como ela pode ser aplicada. Incluir exemplo antes/depois quando ajudar, versão, data, disponibilidade, compatibilidade e limites. Consultar fontes técnicas primárias na execução. Não confundir proposta ou preview com recurso estável, nem transformar a edição em uma lista de manchetes sem análise.

## Animação por artigo

Cada novo artigo inclui uma animação curta criada com **HyperFrames**, como a do café na edição de idempotência. Ela deve mostrar o mecanismo estudado: sequência de eventos, mudança de estado, concorrência ou comparação de comportamentos. Não usar apenas uma abertura com o título em movimento.

- **Ritmo:** uma ideia por animação, com tempo para ler os rótulos. Como referência inicial, cerca de 15 a 30 segundos; ajustar ao conceito.
- **Leitura:** iniciar com uma imagem estática e reprodução por escolha do leitor. Oferecer pausa, repetição e controle de velocidade. Não manter loop infinito; usar reprodução finita, com limite explícito de ciclos.
- **Acessibilidade:** respeitar `prefers-reduced-motion`, manter controles acessíveis por teclado, descrição textual e legenda explicativa. A leitura deve continuar completa sem reproduzir a animação e sem JavaScript.
- **Identidade:** tema escuro, texto legível no celular e conceitos consistentes com o artigo. Se a cena simplificar o sistema, explicar suas hipóteses na legenda.
- **Entrega:** preservar a composição editável em `motion/<identificador>/`; colocar a mídia exportada e a imagem estática em `site/assets/`. Escolher o formato pela legibilidade, tamanho e controles necessários, sem impor GIF a todas as edições.
- **Verificação:** validar a composição com HyperFrames, inspecionar a mídia renderizada e conferir integração no build e na publicação. O build do site não substitui a validação da animação.

Referência de composição: [Café idempotente](../motion/cafe-idempotente/README.md). Os controles atuais do artigo servem de referência para a experiência de reprodução.

## Novidade e encadeamento

Antes de escrever, comparar o objetivo com o histórico. Um assunto pode voltar em uma aplicação diferente e mais profunda, desde que a nova edição identifique a diferença e referencie o pré-requisito. Não contornar a prevenção de repetição renomeando o mesmo conteúdo.

Não anunciar como já publicada uma edição futura. Citações de comportamentos de fornecedores precisam ser verificadas na documentação correspondente. Diferenciar proposta didática de comportamento documentado.
