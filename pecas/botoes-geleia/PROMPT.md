# Botões de geleia

Cinco botões com corpo de geleia: a pele é feita de 72 pontos com mola, que incham, afundam, esticam e quicam.

## Prompt

```text
Construa cinco botões em forma de cápsula que parecem geleia: cada um tem uma pele macia desenhada em SVG, feita de
pontos com mola. O rótulo acompanha a pele. Os botões são para a página do INEMA.CLUB.

Aparência:
- Fundo #0b0b0d com degradê radial até #141217. Título em Sora 800 (clamp 2 a 4,2 rem, com "Botões com corpo
  de geleia.", quebra equilibrada), subtítulo em Inter 400 com #a69d90, e selo em JetBrains Mono 500, caixa alta, #E2A23B.
- Paleta só da marca INEMA: âmbar, creme, grafite e um único verde discreto de apoio. Nada de rosa, lilás,
  ciano ou verde-limão.
  "Inscrever-se" âmbar #E2A23B (claro #F4C977, escuro #8C5C14), texto #0b0b0d;
  "Curtir" grafite #2a262d (claro #3d3842, escuro #0e0d10), texto creme #f3efe7 e aro âmbar a 75%;
  "Pegar o kit" creme #f3efe7 (claro #ffffff, escuro #a99e8c), texto #0b0b0d;
  "Assistir" grafite como "Curtir", texto âmbar #E2A23B e aro creme a 35%;
  "Baixar kit" verde sálvia #86A98E (claro #B5CFBA, escuro #435C49), texto #0b0b0d.
- Cinco botões de 220 × 76 px. Desktop: grade de três por linha (dois na segunda), 40 px entre colunas e 56 px
  entre linhas, centrada na vertical no espaço entre o título e o painel.
- Painel no rodapé, JetBrains Mono 13 px #a69d90 com números em âmbar: "inscrições 12 · curtidas 0 · kits 0".
  Cada clique atualiza o número correspondente (aria-live="polite").
- Celular (até 480 px): composição própria. Coluna única a 86% de escala, distribuída por igual (space-evenly)
  entre o título e o painel, sem vazio no meio. Título 1,9 rem, subtítulo diz "Toque, segure e puxe" em vez de
  "Clique, segure e arraste".
- Pele: cápsula com 72 pontos, gradiente vertical (claro no topo, cor no meio, escuro embaixo). Lábio escuro
  deslocado 6 px para baixo. Poça de luz e brilho elíptico no topo com intensidade por botão (42% a 50% nos
  claros, 14% nos grafite), borda interna fina na cor do aro e uma faísca branca.
- Rótulo em Sora 700, 19 px, centralizado. "Inscrever-se" tem uma pílula com contagem (começa em 12).
- Selo da sacola em Inter 600, creme. Caixa (creme com fita âmbar) e seta (creme com base âmbar) em SVG.
- Camadas, de baixo para cima: partículas, pele, rótulo, item que cai, botão real, selo. Assim nenhuma
  partícula passa por cima de texto, nem do próprio botão nem do vizinho.

Movimento:
1. Repouso: cada ponto tem mola com constante 230 e amortecimento 6,5 até o seu alvo, e acopla com os vizinhos
   (constante 120). O contorno é redesenhado a cada quadro como curva fechada Catmull-Rom.
2. Ponteiro a menos de 70 px de um ponto: o ponto incha até 9 px para fora, na direção da normal, com queda quadrática.
3. Pressionar: a cápsula amassa para 83% de altura e cresce 7% na largura, ancorada na base (mola 360, amortecimento 10).
   Os pontos perto do dedo afundam até 7 px.
4. Soltar: a cápsula ganha impulso de 3,6 e oscila alto, como um pulo com estiramento.
5. Arrastar (passar de 6 px com o botão pressionado): o lado voltado para o puxão estica até 26 px, com
   limite por tangente hiperbólica. O rótulo acompanha a escala da pele.
6. Clique: "Curtir" solta 12 corações âmbar e creme (20 px, escala 0,8 a 1,3) pelas duas pontas da cápsula,
   para os lados e um pouco para cima (gravidade 520 px/s²); eles nascem atrás da pele e somem em menos de 1,2 s.
   "Pegar o kit" deixa uma caixa surgir (fade de 120 ms) 52 px acima da ponta direita da cápsula, longe do
   rótulo; ela cai, quica uma vez (impulso 300 px/s), afunda a pele e some; um selo com a contagem aparece no
   canto. "Baixar kit" faz o mesmo com uma seta, e o rótulo vira "Baixado" por 1,5 s. "Inscrever-se" rola a
   contagem e muda o rótulo para "Inscrito" por 1,6 s. "Assistir" dá um pulso de estiramento.
7. Toque: no celular não existe hover. O inchaço de proximidade acontece no próprio toque (o ponto tocado
   afunda), e segurar e puxar estica a pele, igual ao mouse.
8. Sem interação: um dedo fantasma vai até cada botão em 750 ms, pressiona a ponta direita de baixo (82% da
   largura, 86% da altura, para não cobrir o rótulo) por 200 ms, solta e aciona o botão, e espera 1 s antes do
   próximo. Para na primeira interação real.

Regras:
- JavaScript puro, SVG e CSS, sem biblioteca. Um único requestAnimationFrame para todos os botões, pausado com
  IntersectionObserver fora da tela e com a aba oculta.
- A pele é desenho vetorial (o atributo d é recalculado por quadro, como um canvas). Os elementos HTML se movem
  só com transform e opacity.
- Os botões são <button> reais, sobrepostos ao SVG, com aria-label. Foco visível de 3 px em #E2A23B. Enter e Espaço
  apertam o botão com o mesmo efeito de pressionar e soltar.
- Nunca capturar a rolagem: sem preventDefault em wheel ou touchmove.
- prefers-reduced-motion ou ?motion=off: a pele vai direto à forma final, sem molas, sem corações, sem caixa, sem
  dedo fantasma. Clique continua trocando o rótulo.
- ?demo=1: o dedo fantasma roda sempre e não para com a interação.
- ?motion=xray: contorno tracejado âmbar e etiqueta do data-xray sobre cada parte que se move.
- Funciona em 1280×720 e em 360 px de largura, sem rolagem horizontal.
- Textos sem travessão, sem "incrível" e sem "revolucionário".
```
