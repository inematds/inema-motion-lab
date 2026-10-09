# Menu em tela cheia

Um menu que abre como um círculo laranja crescendo do botão, com itens subindo de máscaras e uma prévia que segue o ponteiro no desktop e mora num lugar fixo abaixo da lista no celular.

## Prompt

```text
Construa a capa de um site com um menu em tela cheia: o botão "Menu" faz um círculo laranja crescer a partir dele
até cobrir a tela, os itens sobem de uma máscara, e uma prévia mostra a arte de cada item. No desktop a prévia
segue o ponteiro; no toque e em telas estreitas ela fica num lugar fixo abaixo da lista, sem cobrir nada.

Aparência:
- Fundo #0b0b0d com degradê radial até #111114. Marca "INEMA.CLUB" em Sora 800 18 px, ".CLUB" em #E2A23B,
  no canto superior esquerdo.
- Botão pill de 46 px de altura, fundo #f3efe7, texto #0b0b0d em Inter 600. Dentro: duas barras de 2 px que
  viram um X, e o rótulo "Menu" que rola para "Fechar".
- Capa: três linhas em Sora 800, tamanho clamp(2,2rem, 8,4vw, 6,6rem), entrelinha 1,02. Linhas: "Cursos grátis,",
  "aprenda no seu" (em #E2A23B) e "ritmo.".
- Mascote: capivara em SVG parada no canto inferior direito, marrom #9b6b43, com sombra #7a5232 e olho #17120f.
- Veu: círculo #E2A23B. Menu: texto #17120f. Itens: número em JetBrains Mono 500 e nome em Sora 800
  com clamp(2,3rem, 9vw, 6,6rem), cada item com 14 vh de altura. Itens: Cursos, Eventos, Buscas, Comunidade.
- Rodapé do menu, em JetBrains Mono 500, caixa alta, 12 px: "inema.club" à esquerda, três pills com contorno
  (YouTube, Instagram, Telegram) no centro e o relógio de Brasília à direita ("hh:mm:ss · Brasília").
- Cartão de prévia de 300 px (4:3, raio 14 px, fundo #17120f). Cada item tem uma arte desenhada em SVG:
  cartões empilhados, grade de quadrados, alvo com lupa e bolhas com a capivara.
- Modo compacto, ativado por (hover: none) ou (max-width: 700px). É outra composição, não o desktop encolhido:
  - Capa: título em clamp(2rem, 10vw, 3,4rem) com cada linha sem quebra, um parágrafo curto em Inter 16 px #a69d90
    ("Trilhas, lives e buscas abertas a todos. Abra o menu para escolher por onde começar."), quatro pills de
    atalho (01 Cursos, 02 Eventos, 03 Buscas, 04 Comunidade) e a capivara maior (68vw) na base.
  - Menu aberto: itens compactos (nome em clamp(2rem, 10,5vw, 2,6rem), 7 px de respiro) no topo; logo abaixo a
    vitrine, com o cartão na largura toda (altura clamp(130px, 31vh, 270px)) e uma legenda em JetBrains Mono 11 px
    ("02 Eventos · lives e aulas ao vivo · toque de novo para abrir"); o rodapé fecha a tela. Antes do primeiro
    toque o cartão mostra "prévia" em #a69d90. Em telas com menos de 620 px de altura a vitrine some.

Movimento:
1. Clique em Menu: as barras viram X em 500 ms (curva com overshoot). O rótulo rola de "Menu" para "Fechar" em 500 ms.
2. O veu cresce do botão: escala de 0,002 para 1 em 800 ms (curva expo out). O círculo tem raio igual à
   distância do botão até o canto mais distante, e é posicionado por transform.
3. Os quatro itens sobem de uma máscara em 900 ms, com 70 ms de atraso entre eles, a partir de 180 ms.
4. Desktop, ponteiro sobre um item: ele desliza 24 px para a direita em 550 ms, os outros caem para 35% de
   opacidade, e o cartão mostra a arte do item com uma varredura de 400 ms. O cartão segue o ponteiro com
   interpolação (fração 0,13 por frame de 60 Hz) e inclina até 12° conforme a velocidade horizontal. Ele fica
   28 px à direita do ponteiro; se não couber, vira para a esquerda; e é sempre preso a 8 px das bordas da tela.
4b. Compacto: o cartão não segue nada. A vitrine sobe 16 px e aparece 450 ms depois de o menu abrir. O 1º toque
   num item o escolhe (desliza 14 px, os outros a 35%, varredura no cartão, legenda atualizada); o 2º toque no
   mesmo item abre o link. Como a prévia mora abaixo da lista, ela nunca cobre o item tocado nem sai da tela.
5. Fechar (Esc, clique no botão ou clique num item): os itens saem para cima em 450 ms, com 45 ms entre eles.
   Depois de 380 ms, o veu encolhe de volta ao botão em 600 ms.
6. Sem interação: um cursor fantasma abre o menu, passa 1,5 s em cada item e fecha. No compacto ele vira um
   dedo (círculo de 30 px) que encolhe a cada toque. O fantasma para na primeira interação real.

Regras:
- JavaScript puro e CSS, sem biblioteca. Um único requestAnimationFrame para o cartão, o relógio e o fantasma,
  pausado com IntersectionObserver fora da tela e com a aba oculta.
- Animar só transform e opacity. O veu é um círculo com border-radius 50% escalado (sem clip-path).
- Nunca capturar a rolagem: sem preventDefault em wheel ou touchmove.
- Acessível: o botão tem aria-expanded e aria-controls. Os itens são links reais; o escolhido recebe
  aria-current e a legenda é aria-live. No teclado o foco já escolhe, então Enter abre (igual ao 2º toque). Foco visível com contorno de
  3 px em #17120f. Esc fecha o menu.
- prefers-reduced-motion ou ?motion=off: o menu abre e fecha sem transição, o cartão segue o ponteiro sem
  inclinação e o fantasma não aparece.
- ?demo=1: o fantasma roda sempre e não para com a interação.
- ?motion=xray: contorno tracejado âmbar e etiqueta do data-xray sobre cada elemento que se move.
- Funciona em 360 px e em 1280×720, sem rolagem horizontal.
- Textos sem travessão, sem "incrível" e sem "revolucionário".
```
