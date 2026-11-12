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
8. **Hashtags de divulgação (obrigatório):** ao final do artigo, depois das fontes, hashtags para a descrição do vídeo no YouTube e para o post no LinkedIn. Ver [Hashtags de divulgação](#hashtags-de-divulgação-obrigatório).
9. **Apresentação (obrigatória):** o artigo inteiro em slides: o texto integral de cada parte e, no fim dela, um slide de revisão só com cards. Ver [Modo apresentação](#modo-apresentação-obrigatório).

## Leitura

- Essencial: cerca de 3 minutos. Deve conter conceito, problema, solução e pergunta, sem depender dos blocos ocultos.
- Completa: cerca de 8 minutos, com camadas opcionais. Aprofundamentos podem ultrapassar esse tempo.
- HTML independente para cada edição, sem CDN ou APIs para a leitura básica.
- Tema escuro como padrão; modo claro opcional. Não animar continuamente nem usar notificações intrusivas.
- Priorizar leitura no desktop: coluna central de até 740 px, corpo em Segoe UI/Arial a 20 px com entrelinha 1,7 e cerca de 28 px entre parágrafos. Em telas menores, adaptar a coluna e usar corpo de pelo menos 18 px. Fundo escuro `#191d20`, texto `#d7d9d5` e conceitos em peso 600; manter contraste legível também em legendas e controles. Frases memoráveis usam uma borda discreta, sem caixas grandes disputando atenção com o texto.
- Celular e teclado: conteúdo sem cortes, botões legíveis e estados com texto; não depender apenas de cor.
- Evitar introduções vagas. Informar o que será estudado no primeiro bloco.
- Destacar conceitos e garantias, sem transformar parágrafos inteiros em negrito.

## Blocos de código (estilo de editor)

Todo bloco de código aparece como num editor: fundo escuro, barra de título com o nome do arquivo e cores por tipo de trecho (palavra-chave, anotação, texto, comentário, tipo, número). O bloco continua escuro no tema claro; só a impressão usa fundo branco. `npm run check` recusa edições a partir de 12/11/2026 com `<pre>` sem `data-lang` válido.

- **Marcação:** `<pre data-lang="java" data-rotulo="PedidoService.java"><code>…</code></pre>`. O código vai em texto puro, com `&lt;` e `&amp;` escapados; nada de `<span>` à mão.
- **Linguagens:** `java`, `js`, `ts`, `sql`, `properties`, `yaml`, `json`, `bash`, `http` e `texto` (cálculos e pseudocódigo, sem cores).
- **Rótulo:** o arquivo de onde o trecho viria (`PedidoService.java`), ou um nome curto do que ele mostra (`Cabeçalho HTTP`, `Cálculo`). Para comparar versões, acrescentar `· antes` e `· depois`. Sem rótulo, a barra mostra o nome da linguagem.
- **Comentários didáticos:** o comentário aponta o detalhe que o texto explica, como `// o mesmo que this.confirmar(pedido)`. Quando ele é a explicação principal, vai em linha própria, logo acima da linha a que se refere: no celular, comentários no fim de linhas longas caem na linha de baixo e se desligam do código. Mostrar no código o que o texto descreve, inclusive o que está implícito.
- **Recursos compartilhados:** o build injeta `site/code.css` e `site/code.js` em toda edição com `<pre>`. O script colore a sintaxe sem dependências externas e acrescenta o botão **Copiar**. Sem JavaScript, o bloco mantém a moldura escura e a barra, sem cores.
- **Celular e slides:** no desktop, linhas longas rolam dentro do bloco, sem quebrar o recuo; no celular e nos slides, quebram, para os comentários não sumirem à direita, e o botão Copiar some. Blocos dentro de uma pergunta do desafio também entram no slide da pergunta.

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

## Modo apresentação (obrigatório)

Cada novo artigo inclui um modo apresentação em slides, aberto pelo botão **Apresentar** no topo da edição. O leitor grava vídeos sobre os artigos e também estuda pela apresentação. Por isso ela traz o **texto integral** do artigo, não só um resumo. `npm run check` recusa edições a partir de 31/10/2026 sem esse modo.

- **Declaração:** os slides ficam em `<template id="apresentacao" data-tema="Tema · assunto">` no HTML da edição. O build injeta `site/deck.js` e `site/deck.css` só quando o template existe. Sem JavaScript, o artigo continua completo.
- **Ordem:**
  - Abrir com um slide de título e um roteiro.
  - Para cada parte do artigo, **primeiro o texto integral; no fim, um único slide de revisão em cards**.
  - As partes são: objetivo, conceito, problema, cada subseção da solução, cada bloco do aprofundamento, desafio e fontes. Objetivo, desafio e fontes não têm revisão.
  - Animação e demonstrações entram depois do texto e antes da revisão da parte em que aparecem.
  - Fechar com a frase memorável.
- **Texto integral:** `<section class="slide" data-texto="#id-da-seção"></section>`.
  - O motor copia os blocos da seção e pagina em quantos slides forem necessários, sem transbordar.
  - `data-parte="n"` escolhe a n-ésima subseção (`h3` ou `details`). `data-titulo` e `data-rotulo` trocam o título e o sobretítulo.
  - Um título no topo da página vira o título do slide. Listas longas continuam no slide seguinte.
  - Figuras, laboratório e controles ficam de fora; marcadores de citação como [1] também, porque as fontes aparecem num slide próprio.
  - Cada pergunta do desafio vira um slide com as alternativas e a resposta revelada no avanço.
- **Revisão em cards:** um slide por parte, escrito à mão, para revisar o que acabou de ser lido. `npm run check` recusa edições a partir de 09/11/2026 com parte sem revisão no fim ou com revisão fora deste padrão.
  - Marcação: `<section class="slide slide-resumo">` com sobretítulo `NN / parte · revisão`, um título (a frase-chave da parte ou o título dela) e `<div class="slide-cards">` com de 2 a 6 `<div class="slide-card">`.
  - Cada card: o conceito em `h3` e uma frase curta que o explica, de preferência com até 90 caracteres. Opcionalmente, uma linha `<p class="slide-mono">` com o exemplo do texto (nome de evento, conta, comando).
  - Só cards: nada de listas, tabelas, código, vídeo ou frase solta fora deles. Nenhum conteúdo que não esteja no texto da parte.
  - O motor revela um card por avanço e monta a grade: 2 ou 4 cards em duas colunas; 3, 5 ou 6 em três. Se não couberem, reduz a fonte.
  - `<aside class="notes">` traz uma sugestão do que falar, visível com a tecla N.
- **Roteiro e frase final:** o roteiro revela itens um a um com `data-frag` (ou `data-frag="n"` para impor a ordem). Todo slide escrito à mão traz notas.
- **Animação e demonstrações:** a animação HyperFrames entra como slide e toca com P ou com um clique, sem a barra nativa do player. Quando houver laboratório, botões `data-lab-cenario="n"` abrem o cenário por cima dos slides.
- **Gravação:** nenhuma instrução visível no slide; dicas ficam nas notas. Os controles somem com o mouse parado. Teclas:
  - ← → e PageUp/PageDown, compatíveis com passador de slides;
  - Home e End;
  - N mostra as notas, B ativa a tela preta, F alterna a tela cheia, P toca o vídeo e Esc sai.
- **Verificação:**
  - percorrer todos os slides em 1920×1080, sem transbordo;
  - conferir que todo parágrafo, item de lista, pergunta e fonte do artigo aparece nos slides de texto;
  - conferir que cada parte termina com a revisão em cards e que os cards só retomam o que o texto disse;
  - testar notas, vídeo, demonstrações e tema claro.

Referência: [event sourcing](../content/system-design/003-event-sourcing.html) e o motor em `site/deck.js`.

## Hashtags de divulgação (obrigatório)

O leitor grava vídeos para o YouTube e publica no LinkedIn sobre cada artigo. Por isso todo artigo termina com uma seção de hashtags prontas para colar, uma por rede. `npm run check` recusa edições a partir de 04/11/2026 sem elas.

- **Posição:** `<section class="share" id="hashtags">` logo depois da seção de fontes e antes do rodapé. Não entra nos slides nem conta como texto do artigo.
- **YouTube (descrição do vídeo):** de 3 a 15 hashtags; o YouTube ignora todas se passar de 15. As três primeiras aparecem acima do título, então devem ser as mais descritivas do assunto. Sugestão: 6 a 8.
- **LinkedIn (post):** de 3 a 5, no fim do texto do post. Menos hashtags e mais específicas alcançam melhor que uma lista longa.
- **Escolha:**
  - Começar pelo conceito central (`#EventSourcing`), depois a categoria (`#SystemDesign`, `#JavaJVM`…) e o público (`#ArquiteturaDeSoftware`, `#Backend`).
  - Fechar com a marca `#DepoisDoDeploy`.
  - Sem espaços, sem repetir e em CamelCase, para leitores de tela lerem as palavras separadas. Sem acentos, para funcionar igual nas duas redes.
  - Só termos que o artigo realmente cobre. Nada de hashtag de tendência sem relação com o conteúdo.
- **Catálogo:** a lista fica em `hashtags: { youtube: [], linkedin: [] }` na edição, em `content/catalog.json`. O HTML mostra as mesmas hashtags em `<p class="share-tags" id="tags-youtube">` e `id="tags-linkedin"`, separadas por um espaço, e o check confere que são idênticas.
- **Cópia:** botão **Copiar hashtags**, escondido por padrão e mostrado por JavaScript. Sem JavaScript, o texto continua visível para copiar à mão. A mensagem de resultado usa `role="status"`. O botão não aparece na impressão.

Referência: [event sourcing](../content/system-design/003-event-sourcing.html).

## Laboratório interativo (opcional)

Quando o mecanismo estudado puder ser manipulado, a edição pode incluir um laboratório: uma simulação didática no próprio HTML, em `<dialog>` nativo e sem dependências externas.

- **Modo livre:** o leitor explora o mecanismo à vontade.
- **Roteiro guiado:** cenários numerados com "próximo passo", "passo anterior" e "recomeçar cenário", controlados pelo teclado ou passador.
- **Dados:** fictícios e determinísticos, identificados como simulação.
- **Sem JavaScript:** o laboratório não aparece, e o artigo continua completo.

Referência: o laboratório do event store na mesma edição de event sourcing.

## Novidade e encadeamento

Antes de escrever, comparar o objetivo com o histórico. Um assunto pode voltar em uma aplicação diferente e mais profunda, desde que a nova edição identifique a diferença e referencie o pré-requisito. Não contornar a prevenção de repetição renomeando o mesmo conteúdo.

Não anunciar como já publicada uma edição futura. Citações de comportamentos de fornecedores precisam ser verificadas na documentação correspondente. Diferenciar proposta didática de comportamento documentado.
