# Rodapé quebra

Um rodapé que vira jogo de quebrar tijolos: cada tijolo é um link do ecossistema INEMA, e quando quebra o rótulo voa até a bandeja e vira link de verdade.

## Prompt

```text
Construa um rodapé jogável no estilo quebra-tijolos: a parede é feita dos links do site. Ao
quebrar um tijolo, o rótulo dele voa em arco até a bandeja de links embaixo e acende como link.
Um piloto automático joga sozinho até a pessoa assumir.

Aparência:
- Só a paleta da marca: fundo #111114, arena #0d0d10 com cantos de 16 px e uma vinheta
  radial suave (#131317 para #0a0a0c) pré-desenhada num canvas de fundo. Texto #f3efe7,
  acento #E2A23B. Nada de azul, vermelho ou linhas de CRT.
- Tipografia (Google Fonts): marca Sora 800; rótulos JetBrains Mono 500 a partir de 12 px;
  corpo e tijolos Inter (links 15 px no desktop, 14 px no celular). Nenhum texto abaixo de
  12 px.
- Topo enxuto: "INEMA.CLUB" à esquerda; à direita o modo em mono âmbar ("piloto
  automático" / "você joga", some no celular) e três vidas (quadradinhos âmbar de 10 px).
- Parede 4 x 5, uma linha por grupo (cursos, eventos, buscas, clube), cada linha de um tom
  da marca: âmbar #E2A23B, dourado #F2C76E, creme #f3efe7 e âmbar escuro #C9821F. Tijolos
  chapados com cantos de 7 px e o nome em Inter 600 escuro, sem halo.
- Raquete: pílula âmbar de 12 px de altura (14% da largura, 70 a 140 px) com brilho leve.
  Bola: quadrado arredondado creme de 12 px com um "i" escuro.
- Dica no meio da arena, em mono 12 px a 40% de creme: "mouse ou setas · espaço lança" no
  desktop e "arraste para mover · toque lança" em tela de toque (media query hover: none).
- Embaixo do canvas, as bandejas como um rodapé comum: título do grupo em mono âmbar 12 px
  e os links em texto corrido (Inter, creme a 55%). Link ganho fica creme cheio com um ponto
  âmbar à esquerda. Linha fina e a barra final: "© 2026 INEMA.CLUB · conteúdo aberto e
  gratuito" e "Os links funcionam mesmo sem jogar".
- Celular (até 760 px): composição própria. A arena ocupa o espaço que sobra (mínimo 320 px)
  e os tijolos ficam mais altos (30 a 40 px) e com margens menores para preencher a largura;
  bandejas em 2 x 2; barra final empilhada. Nada de vazio solto no meio da tela.

Movimento:
1. A bola sai da raquete num ângulo de até 62°, conforme o ponto onde bateu; a raquete
   amassa com mola (k 520, d 16). Física com subpassos de no máximo 4 px.
2. Batida: o tijolo pisca branco e treme.
3. Tijolo quebrado: explode em 24 cacos quadrados com gravidade; o rótulo vira uma etiqueta
   (elemento DOM com transform) que voa 0,9 s em arco balístico até o lugar do link na bandeja
   e pousa com uma quicada (scale 1,25 x 0,8 amortecendo em 500 ms); o link fica "ganho".
4. A velocidade sobe 6% a cada 6 tijolos.
5. Parede limpa: confete e o aviso "Rodapé completo. Você leu todos os links." por 3 s;
   depois os links voltam das bandejas para os tijolos com mola, 42 ms entre eles, e a parede
   se refaz.
6. Perder a bola custa uma vida; sem vidas, a parede volta inteira e os links ganhos se apagam.
7. Piloto automático: prevê onde a bola cai (refletindo nas paredes), mira com um desvio
   aleatório e segue com atraso (suavização exponencial, velocidade máxima). Ao mover o mouse
   sobre o jogo, arrastar o dedo, tocar ou usar as setas, a pessoa assume; depois de 6 s parada, o piloto volta.
8. Modo demonstração (?demo=1): o piloto joga sempre e ignora o ponteiro.

Regras:
- JavaScript puro e canvas 2D, sem biblioteca de física; um único arquivo HTML; só as fontes
  do Google. devicePixelRatio limitado a 2.
- Um único requestAnimationFrame para jogo, etiquetas voando e quicadas, pausado fora da tela
  (IntersectionObserver) e com a aba oculta; o laço só começa depois de medir a arena.
- Fora do canvas, animar só transform e opacity.
- Nunca capturar a rolagem: nada de preventDefault em wheel/touchmove; no canvas,
  touch-action: pan-y. Setas e Espaço só funcionam com o canvas em foco.
- Acessível: os links existem desde o início como <a> reais (o jogo é um bônus); o canvas tem
  tabindex, rótulo com os controles e foco visível; o aviso fica em aria-live.
- prefers-reduced-motion: sem piloto automático; a parede inteira fica parada até a pessoa
  jogar. ?motion=off: parede inteira parada, sem jogo.
- Raio-X: data-xray="o que é · como se move" e data-xray-tool="code" no canvas, nas etiquetas
  voando, nos links e no aviso; ?motion=xray desenha contorno tracejado âmbar e etiqueta.
- Sem rolagem horizontal em 360 px.
```
