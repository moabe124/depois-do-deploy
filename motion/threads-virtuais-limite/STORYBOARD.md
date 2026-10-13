---
format: 960x640
duration: 24s
message: "Liberar a carrier durante I/O não devolve a permissão da API."
arc: concept-explainer with process
audience: desenvolvedor sênior full stack
mode: autonomous
music: none
captions: skipped (animação silenciosa com rótulos no diagrama)
---

## Frame 1 — Carrier e permissão são recursos diferentes

- status: animated
- src: compositions/frames/01-carrier-permissao.html
- type: feature_showcase
- persuasion: demonstração de causa e efeito
- beat: compreensão
- scene: A libera a carrier na espera; A e B mantêm permissões; C só entra quando A termina.
- duration: 24s
- poster: 14s
- transition_in: cut
- voiceover:

narrativeRole: distinguir recurso de execução de orçamento de chamadas em andamento.
keyMessage: a carrier pode estar livre enquanto a API continua com suas permissões ocupadas.

Scene 0–8s — A executa na carrier. Em 2s, A sai da carrier e passa para "espera por I/O"; em 4s B passa a executar nessa mesma carrier. Uma linha liga espera à API. Em 6s, mostra "Carrier reutilizada; A segue pendente". Layout: uma carrier à esquerda, API à direita, tarefas como cartões; composição com poucos rótulos. Motion: deslocamento de tarefas com transforms, SVG self-draw → svg-path-draw; estados discretos → discrete-text-sequence.

Scene 8–16s — Nova vista da mesma situação: A e B ocupam as duas permissões na API; C aguarda à esquerda. Carrier livre em faixa inferior. C se aproxima da fronteira e para. Rótulo "2 de 2 ocupadas". Nenhuma permissão é devolvida na espera de I/O. Motion: entrada em ordem, estados discretos → discrete-text-sequence.

Scene 16–24s — A termina e devolve uma permissão; só então C cruza a fronteira e ocupa a vaga de A. B continua esperando por I/O. Final "A terminou → C pode entrar"; duas permissões ocupadas novamente. Motion: SVG self-draw → svg-path-draw; troca de estados → discrete-text-sequence. Últimos 3 segundos para ler o resultado.

## Video direction

Diagrama técnico, plano e escuro. Sem camera drift, logotipo, música ou decorativos. Fonte local Segoe UI a incorporar por @font-face; títulos 40–44px, labels 28–32px, hipóteses 22px. Verde indica tarefa; texto explícito distingue execução, I/O e espera por vaga. Laranja apenas para C aguardando. Marcas de tarefas A/B/C consistentes. Fundo em clip de duração completa. Não sobrepor texto a conectores. Uma timeline pausada, determinística e reversível.
