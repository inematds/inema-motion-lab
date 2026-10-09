# Cursor amigo

Seção de abertura de site com uma capivara que anda pelo chão atrás do seu cursor, corre quando ele foge, freia levantando poeira, senta quando você para, aponta para o botão e dá pirueta quando clicada.

## Prompt

```text
Construa a seção de abertura de um site em que um mascote, uma capivara desenhada em SVG, anda
pelo "chão" da página seguindo o cursor na horizontal: acelera, corre, freia, senta quando o
cursor para, aponta para o botão principal, pula quando o botão é clicado e dá uma pirueta
tonta quando ela mesma é clicada.

Aparência:
- Fundo #0b0b0d com um brilho radial âmbar (9%) no alto. Texto #f3efe7, secundário a 62%,
  acento #E2A23B.
- Fontes Google: título Sora 800; corpo Inter 400/600; rótulos JetBrains Mono 500, 12 px, caixa
  alta, espaçamento 0.14em.
- No alto, centralizado: rótulo "INEMA.CLUB · COMPANHIA"; título "Um amigo para o seu cursor."
  (a palavra "cursor" em âmbar; clamp 2.3 rem até o menor entre 8vw e 11vh, 5.6 rem no máximo;
  espaçamento -0.045em); frase "Aprender IA fica mais leve com companhia. A capivara segue o seu
  mouse pelo chão e adora um oi."; um botão âmbar "Dar um oi" em estilo adesivo (contorno 2.5 px
  #f3efe7, sombra dura 5px 5px 0 #f3efe7, raio total; ao apertar ele afunda 3 px) e ao lado o
  link "Ver cursos gratuitos →" para https://inema.club.
- Chão: faixa nos 24% de baixo da tela, #141418, linha de topo 2.5 px âmbar, linhas verticais
  #f3efe7 a 4.5% a cada 64 px e um reflexo âmbar (10%) logo abaixo da linha; rótulo mono
  "Chão · ela segue você" a 38% no canto.
- Capivara (176x148 px; 120x101 abaixo de 600 px), vista de lado: corpo oval #9b6b43 com reflexo
  #b48459, cabeça arredondada com focinho rombudo #7a5232, orelhinha redonda, olho com brilho,
  narina, sorrisinho, lenço âmbar, quatro patas curtas (as de trás do corpo mais escuras
  #6e4a2c). Sombra oval no chão embaixo dela.

Movimento:
1. O alvo é o x do cursor; ela para a 1/3 da própria largura antes dele (nariz perto, sem
   encostar). Aceleração 1800 px/s², freio 2700 px/s², velocidade máxima 620 px/s. Ela começa a
   frear quando a distância que falta é a distância de frenagem (v²/2·freio).
2. Andar com pé plantado: a fase das patas avança pela distância percorrida (não pelo tempo):
   um passo completo = 4 · comprimento da pata · sen(24°). Patas em diagonal alternadas, giro de
   ±24°, e a pata que está no ar encolhe 22%. Corpo sobe e desce 2 px por passo.
3. Cursor longe (mais de 260 px) com ela parada: ela inclina 7° para trás por 150 ms
   (antecipação) e então dispara. Correndo, inclina para a frente até 10° (16° acima de 60% da
   velocidade). Freada forte: inclina 9° para trás e solta nuvenzinhas de poeira (círculos
   #f3efe7 a 50% que crescem, sobem 14 px e somem em 520 ms).
4. Cursor parado por 1.9 s: ela senta (traseira desce 9 e gira 14°, patas de trás dobram) e
   bate o pé da frente de vez em quando (mola rigidez 70, amortecimento 11).
5. Mouse sobre o botão (ou foco nele): ela anda até perto do botão e levanta a pata da frente
   apontando (118°). Clique no botão: agacha 90 ms (achata 16%), pula (velocidade inicial
   560 px/s para cima, gravidade 1900 px/s²) e ao pousar amassa 22% e volta numa mola (rigidez 380,
   amortecimento 14). A sombra encolhe e clareia com a altura.
6. Clique na capivara (ou Enter/Espaço com ela em foco): uma volta completa de 360° em 700 ms,
   depois 1.6 s de tontura: balança ±7°, olho semicerrado e três estrelinhas (duas âmbar, uma
   creme) girando em volta da cabeça. Setas ← → com ela em foco movem o alvo.
7. Repouso: em pé ou sentada no chão, olhando para o cursor, piscando a cada 2–4.5 s.
8. Modo demonstração (ciclo de 12 s): um cursor fantasma corre do canto esquerdo para a direita
   (ela persegue e freia), fica parado (ela senta), vai ao botão (ela aponta), clica (ela pula),
   vai até a capivara e clica (pirueta e tontura), volta ao começo. Para assim que um ponteiro de
   verdade entra na seção ou há clique, tecla ou rolagem; com ?demo=1 nunca para.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML.
- Um único loop requestAnimationFrame para física, desenho e cursor fantasma, pausado fora da
  tela (IntersectionObserver) e com a aba oculta.
- Animar só transform e opacity (no SVG, atributos transform).
- Pointer events (mouse, caneta e toque); ouvintes passivos; nunca capturar a rolagem.
- Acessível: a capivara é um <button> com rótulo; o botão principal é um <button> real; foco
  visível 3 px âmbar.
- prefers-reduced-motion: ela fica parada em pé ao lado do botão, apontando para ele, sem
  perseguir, pular ou girar.
- ?motion=off: igual ao movimento reduzido. ?motion=xray: contorno tracejado âmbar e etiqueta
  sobre a capivara, lidos de data-xray.
- Sem rolagem horizontal em 360 px.
```
