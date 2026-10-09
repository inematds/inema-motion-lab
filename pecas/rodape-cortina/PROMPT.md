# Rodapé cortina

Rodapé de site revelado como cortina: a página clara sobe e encolhe, e por baixo aparece um rodapé escuro com a marca "inema" nascendo sobre o horizonte de um planeta, com brilho de nascer do sol e um botão magnético.

## Prompt

```text
Construa um rodapé de site do tipo "cortina": a página clara de cima sobe como uma cortina e
descobre um rodapé escuro fixo por baixo, com a palavra "inema." gigante pousada no horizonte
curvo de um planeta e um brilho âmbar subindo atrás dela como nascer do sol.

Aparência:
- Rodapé #0b0b0d ocupando 100% da tela, em três faixas (topo, marca, base):
  - Topo: à esquerda, rótulo "INEMA.CLUB", título "Tem uma ideia?" (Sora 700, clamp 1.7–2.8 rem),
    frase "Traga para a comunidade. A gente ajuda a transformar em projeto com IA." (Inter, 58%) e
    um botão-pílula creme #f3efe7 com texto #17120f "Entrar na comunidade →" (Inter 600 16 px,
    16x26 px). À direita, três colunas de links finos (Inter 300 16 px, #8f8a82) com rótulos mono
    âmbar: Aprender (Cursos, Trilhas, Vídeos), Participar (Lives, VIP, INEMA.PRO),
    Ferramentas (Buscas, Kits, Áreas), apontando para inema.club, eventos.inema.pro,
    buscas.inema.club e inema.pro.
  - Marca: "inema" em minúsculas, Sora 800, tamanho o menor entre 27vw e 33vh, espaçamento
    -0.05em, ponto final âmbar, centralizada e pousada no horizonte.
  - Planeta: círculo de 320vmax centrado, com o topo a 9vh + 48 px do fim da tela, quase preto,
    com filete âmbar de 2 px no horizonte e um halo âmbar fraco acima.
  - Brilho: elipse radial de 120x60vmax centrada no horizonte (âmbar a 80% no centro, 28% a 42%
    do raio, some a 76%), atrás das letras e coberta pelo planeta na metade de baixo.
  - Base: "© 2026 INEMA.CLUB · aberto e gratuito" (58%) e o botão "Voltar ao topo ↑".
- Página por cima (a cortina): cartão creme #f3efe7 com 30 px a mais de altura que a tela (os
  cantos de baixo, raio 28 px, ficam escondidos abaixo da borda até ela subir), sombra
  0 30px 60px preta a 45%. Dentro: barra com logo "INEMA.CLUB" e links Cursos/Lives/Buscas,
  rótulo "Aberto e gratuito", título "Aprender IA sem pressa." (Sora 700, clamp 2.4–5.4 rem,
  #17120f), frase "Cursos curtos, lives toda semana e uma comunidade que responde." e o botão
  contornado "Ver o rodapé ↓"; embaixo uma paisagem de amanhecer em SVG (sol âmbar com halo,
  três morros em tons de areia #e3cfa9, #cdb084, #a8845a, e uma capivarinha deitada).
- Abaixo de 760 px: topo em uma coluna, colunas de links menores, sem a frase.

Movimento:
1. Entrada: a página fica parada 1.2 s e sobe com expo-out em 1.1 s; enquanto sobe, encolhe até
   0.96 em torno da própria borda de baixo, e a borda de baixo ganha uma luz âmbar (gradiente de
   120 px) que acende e apaga no meio da subida. A cortina sobe a altura da tela + 90 px.
2. Letras da marca: quando a revelação passa de 35%, cada letra sobe de 40% abaixo até o lugar
   numa mola (rigidez 70, amortecimento 15), 60 ms depois da anterior. Cada letra tem duas cópias
   empilhadas: uma borrada (blur 12 px fixo, creme âmbar) e uma nítida; a mola cruza a opacidade
   de uma para a outra, então a letra "entra em foco" sem animar filtro. Abaixo de 15% elas
   voltam, da última para a primeira.
3. Brilho: a opacidade cresce com a revelação (de 15% a 100%) e sobe de 12% abaixo até o lugar;
   depois respira devagar (±12% de opacidade, período ~10.7 s).
4. Botão magnético: com o ponteiro a menos de 80 px da borda do botão, ele se inclina para o
   ponteiro (22% da distância na horizontal, 32% na vertical) numa mola (rigidez 190,
   amortecimento 15), e o texto anda 45% a mais. Ao entrar no botão, um círculo âmbar nasce no
   ponto exato de entrada e cresce até cobrir tudo (460 ms); a seta → gira para ↗. Ao sair, o
   círculo encolhe em direção ao ponto de saída.
5. Links: o texto clareia e um sublinhado de 1 px entra da esquerda; ao sair, ele sai pela
   direita (scaleX com transform-origin trocando de lado, 320 ms).
6. Voltar ao topo: a cortina desce de volta com expo in-out em 1 s.
7. Arrastar (na página ou no rodapé, fora de links e botões) sobe e desce a cortina com o dedo;
   ao soltar, completa para o lado mais perto em 600 ms. A roda do mouse também escova a
   cortina (ouvinte passivo, sem bloquear a rolagem; só enquanto não está numa ponta) e assenta
   220 ms depois do último giro.
8. Modo demonstração (ciclo de 10 s): a cortina sobe em 1.2 s; um cursor fantasma chega perto do
   botão (ímã), entra nele (círculo âmbar e seta ↗), passa por um link (sublinhado), clica em
   "Voltar ao topo" (a cortina desce), e o ciclo recomeça. Para na primeira interação real
   (clique, tecla, roda, toque); com ?demo=1 nunca para. Sem demonstração, a cortina sobe uma
   vez sozinha.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML.
- Um único loop requestAnimationFrame (cortina, letras, brilho, ímã, cursor fantasma), pausado
  fora da tela (IntersectionObserver) e com a aba oculta.
- Animar só transform e opacity (o desfoque das letras é fixo; anima-se a opacidade das cópias).
- Nunca capturar a rolagem: nenhum preventDefault em wheel ou touchmove; ouvintes passivos.
- Acessível: links e botões reais; foco visível 3 px âmbar; a parte coberta fica inert (o
  rodapé enquanto a página cobre, a página depois que ela sobe); focar algo no rodapé pelo
  teclado abre a cortina; "Ver o rodapé ↓" abre e leva o foco ao botão.
- prefers-reduced-motion: rodapé já revelado e parado (letras no lugar, brilho fixo).
- ?motion=off: igual ao movimento reduzido. ?motion=xray: contorno tracejado âmbar e etiqueta
  sobre a cortina, a marca, o brilho e o botão magnético, lidos de data-xray.
- Sem rolagem horizontal em 360 px.
```
