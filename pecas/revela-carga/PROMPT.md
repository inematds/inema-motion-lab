# Revela carga

Uma tela de carregamento em que a marca INEMA, inteira desde o primeiro quadro, enche de âmbar de baixo para cima enquanto o contador vai de 000 a 100, e no fim tudo vira a transição que revela a página inicial escura.

## Prompt

```text
Construa uma tela de carregamento que vira transição de página: a marca INEMA aparece inteira
e vai enchendo de âmbar enquanto um contador grande vai de 000 a 100; ao chegar a 100, a marca
pulsa e some, seis colunas sobem e revelam a página inicial do INEMA.CLUB (escura), com o título
entrando palavra por palavra e uma capivara chegando para acenar.

Aparência:
- Tudo escuro, do carregador à página: fundo #0b0b0d / #111114, texto #f3efe7, acento âmbar
  #E2A23B. Nada de fundo claro.
- Tipografia (Google Fonts): títulos Sora 800; corpo Inter 400/500; rótulos e contador
  JetBrains Mono 500.
- Marca no centro (46% da altura), com 45% da altura da tela (no máximo 64% da largura):
  um círculo com um "i" vazado (ponto e haste arredondada) em SVG, usado como clip-path com
  clip-rule evenodd. A marca é legível em TODO quadro: base cinza-escura #1b1a1f dentro do
  recorte e o mesmo desenho em traço creme fino (opacidade .55) por cima. Nunca deixe parte do
  logo sumir no preto do fundo.
- Dentro do recorte, um "líquido" âmbar com borda em onda (duas ondas, #E2A23B na frente e
  #C9821F atrás) que sobe conforme a carga.
- Por fora, um anel de progresso âmbar feito de 12 arcos separados.
- Abaixo da marca, a etapa em mono pequeno: "01 / 03 · cursos", "02 / 03 · lives",
  "03 / 03 · comunidade" (número em âmbar), trocando a cada terço.
- Contador no canto inferior direito, JetBrains Mono, clamp(64px, 15vw, 180px), números
  tabulares, três dígitos; zeros à esquerda com 20% de opacidade; um "%" pequeno em âmbar.
- Linha de progresso de 2 px em âmbar, da borda esquerda até o começo do contador.
- Rótulos mono nos cantos de cima: "INEMA.CLUB · abrindo" e "cursos gratuitos de IA".
- Página revelada: fundo escuro (gradiente #111114 para #0b0b0d com um brilho âmbar suave
  atrás da capivara). Barra de navegação com linha fina embaixo (marca INEMA.CLUB com ponto
  âmbar; Cursos, Lives, Buscas, VIP em creme 60%). Rótulo âmbar "Cursos gratuitos de IA · 2026",
  título gigante creme "Pronto quando você estiver." (Sora 800, ponto final em âmbar, até 12,5%
  da altura), linha de apoio em creme 60%, botão "Começar agora" (pílula âmbar, texto escuro) e
  botão secundário "Ver a abertura de novo" (contorno creme). À direita, uma capivara em SVG de
  pé, de perfil (até 400 px), com sombra escura no chão. No desktop o texto e a capivara ficam
  centralizados na altura, sem faixa vazia no topo.
- Duas camadas de 6 colunas cobrindo a tela: uma âmbar (embaixo) e uma preta (em cima).
- Celular (até 760 px), composição própria em pé: no carregador a marca cresce para 76% da
  largura (no máximo 40% da altura) a 40% da altura, com a etapa logo abaixo, e o rótulo do
  canto direito some. Na página, a capivara vai para o MEIO da tela (até 64% da largura), de pé
  sobre uma linha fina de chão, e o texto fica embaixo; nada de vazio no meio.

Movimento (um relógio único t em ms; tudo é função de t):
1. 0 a 360 ms: a marca inteira (base + traço) acende e sobe 12 px.
2. 300 a 3000 ms: carga de 2,7 s com três pausas curtas (a curva corre, quase para em ~24%,
   ~53% e ~84%, e volta a correr). O contador, a linha (scaleX) e o nível do líquido
   (translateY, de abaixo da base até acima do topo) acompanham. A onda corre de lado sem parar
   (translateX em laço de um período); a onda de trás anda em outro ritmo. Cada arco do anel
   acende quando a carga passa de cada 1/12. O traço creme vai apagando conforme enche.
3. Em 3000 ms (100%): a marca pulsa 7% e encolhe enquanto some (opacidade), total 600 ms, SEM
   girar (o "i" nunca fica deitado). Os três dígitos rolam para cima e somem (380 ms cada,
   55 ms entre eles); a linha, o "%", o anel, a etapa e os rótulos somem em 200 a 300 ms.
4. Em 3450 ms: as colunas pretas sobem da esquerda para a direita, cubic-bezier(.7,0,.2,1),
   950 ms cada, 75 ms entre elas; as âmbar fazem o mesmo 130 ms depois, revelando a página.
5. Em 4300 ms: cada palavra do título sobe de dentro de uma máscara (overflow hidden) com
   mola que passa do lugar e volta (k 170, d 14), 80 ms entre palavras. Em 4700 ms a
   capivara entra pela direita andando (pernas alternando, 1200 ms, easeOut), para com uma
   amassada (scale 1.08 x 0.91 por 260 ms, a partir dos pés) e acena com a pata da frente
   três vezes (1300 ms).
6. Segura a página montada até 10500 ms; então as colunas descem de volta (âmbar primeiro,
   da direita para a esquerda, depois a preta) e o ciclo recomeça em 12000 ms.
7. Repetição: o ciclo roda em loop só até a primeira interação real (toque, clique ou tecla);
   depois disso a página fica montada e os links funcionam. Tocar no fundo da página ou no
   botão "Ver a abertura de novo" repete a abertura uma vez.
8. Modo demonstração (?demo=1): o ciclo nunca para, para gravação.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML; só as fontes do Google.
- Um único requestAnimationFrame dirige tudo, pausado fora da tela (IntersectionObserver) e
  com a aba oculta; o relógio não pula ao voltar.
- Animar só transform e opacity (o líquido sobe e a onda corre por translate, o anel acende
  por opacidade, a linha cresce por scaleX).
- Nunca capturar a rolagem; ouvintes passivos.
- Acessível: links e botões reais, foco visível (contorno 3 px âmbar); o carregador é
  decorativo (aria-hidden) e o título tem aria-label com a frase inteira.
- prefers-reduced-motion: reduce (ou ?motion=off): mostra direto a página montada, parada.
- Raio-X: todo elemento que se move tem data-xray="o que é · como se move" e
  data-xray-tool="code"; com ?motion=xray, desenhe contorno tracejado âmbar e a etiqueta.
- Sem rolagem horizontal em 360 px.
```
