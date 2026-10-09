# Adesivo holográfico

Figurinha holográfica da capivara do INEMA, com borda branca recortada, que inclina na direção do cursor, brilha em arco-íris e glitter conforme o ângulo e pode ter o canto descolado com o mouse.

## Prompt

```text
Construa uma figurinha holográfica com recorte (die-cut) que inclina em 3D na direção do
cursor, muda de brilho conforme o ângulo como uma figurinha de verdade, e cujo canto de baixo
pode ser puxado para descolar, mostrando o verso do papel.

Aparência:
- Palco #0b0b0d com um holofote suave no centro (#f3efe7 a 9%, radial) e uma trama fina de
  pontos (#f3efe7 a 6%, 3 px). Rótulo no topo "INEMA.CLUB · EDIÇÃO HOLOGRÁFICA" (JetBrains Mono
  500, 12 px, caixa alta, espaçamento 0.14em, âmbar #E2A23B). Abaixo da figurinha, uma pílula
  mono "INEMA.CLUB · HOLO 1/250" (borda #f3efe7 a 14%) e a dica "Mexa o mouse para inclinar. Puxe
  o canto de baixo para descolar." (Inter, 55%).
- Arte desenhada em canvas, em código (quadro de projeto 340x380, contorno #1a120c de 6 px,
  cantos e pontas redondos): cabeça de capivara de frente (retângulo arredondado #9b6b43 com
  reflexo claro), orelhinhas redondas #7a5232, focinho largo #7a5232 com duas narinas e um
  sorriso, olhos pretos com brilho branco, bochechas âmbar a 45%, capelo de formatura escuro com
  borla âmbar, e embaixo uma faixa âmbar com pontas dobradas escrito "INEMA" em Sora 800.
- Recorte: a silhueta da arte é dilatada carimbando-a em anéis (raios de 3 em 3 até 15, 32
  ângulos por anel) em branco #fbf8f2, e por baixo a mesma dilatação em cinza #b9b2a6 deslocada
  2 px para baixo, que vira a espessura do papel. A arte fica a 86% para caber a borda.
- Sombra oval preta desfocada embaixo da figurinha. Tamanho: o menor entre 400 px, 80% da
  largura e o que couber na altura; canvas com devicePixelRatio limitado a 2.

Movimento:
1. Inclinação: rotateX/rotateY por CSS com perspectiva de 1300 px, até 18°, cada eixo numa mola
   (rigidez 120, amortecimento 13), mirando a posição do ponteiro em relação à figurinha.
   A sombra escorrega para o lado oposto e encolhe com a inclinação.
2. Holograma, redesenhado a cada quadro num canvas de efeitos e depois mascarado pela silhueta:
   a. arco-íris pastel (rosa, azul, verde, amarelo, lilás) em multiply a 75%, deslocado pela
      inclinação: o branco vira perolado;
   b. uma faixa larga de arco-íris vivo em color-dodge que corre pela figurinha conforme o ângulo
      (30–65% de intensidade);
   c. um risco de luz fino em overlay;
   d. glitter: três camadas pré-desenhadas de flocos coloridos, cada uma "virada" para um lado
      (0°, 120°, 240°), acendendo quando a inclinação aponta para ela;
   e. 150 brilhos em estrela de 4 pontas, cada um com o seu ângulo de faceta, acendendo forte só
      quando o ângulo da inclinação coincide (cosseno elevado a 30);
   f. por fim os traços escuros da arte são redesenhados por cima: a tinta preta nunca pega cor.
3. Descolar: arraste o canto de baixo à direita. A linha de dobra é a mediatriz entre o canto e o
   ponteiro; a parte além da linha some da frente e é desenhada espelhada sobre a linha como o
   verso do papel (#e9e3d6), com um vinco escuro junto da dobra que clareia até a ponta e uma
   sombra projetada. Puxada de até 230 unidades.
4. Soltar: o canto volta numa mola (rigidez 190, amortecimento 12) e a figurinha dá uma
   "apertadinha" de 2% de escala que volta em mola.
5. Ocioso (sem ponteiro por 1.5 s): a inclinação faz um oito deitado (14° e 8°, período ~8 s) e a
   cada 5 s o canto descola sozinho (abre em 600 ms, segura 500 ms, volta na mola).
6. Modo demonstração (ciclo de 9 s): um cursor fantasma passeia em volta da figurinha (ela segue),
   vai até o canto, aperta, arrasta para cima e para a esquerda (descola), solta e volta. Para
   quando um ponteiro de verdade entra ou há clique, tecla ou rolagem; com ?demo=1 nunca para.

Regras:
- Canvas 2D e CSS, sem biblioteca; um único arquivo HTML; arte, recorte, glitter e brilhos
  pré-calculados uma vez (e de novo ao redimensionar).
- Um único loop requestAnimationFrame, pausado fora da tela (IntersectionObserver) e com a aba
  oculta.
- A inclinação e a sombra animam só transform e opacity; o holograma é desenhado no canvas.
- Nunca capturar a rolagem: só o botão do canto usa touch-action: none e captura de ponteiro.
- Acessível: o canto é um <button> real ("Descolar o canto da figurinha"); Enter/Espaço
  descolam, setas inclinam; foco visível âmbar; o canvas tem role="img" e descrição.
- prefers-reduced-motion: figurinha parada com uma inclinação fixa leve (-6°, 10°) e o holograma
  desenhado nesse ângulo; sem oito, sem descolar sozinha, sem cursor fantasma.
- ?motion=off: igual ao movimento reduzido. ?motion=xray: contorno tracejado âmbar e etiqueta
  sobre a figurinha, a sombra e o canto, lidos de data-xray.
- Sem rolagem horizontal em 360 px.
```
