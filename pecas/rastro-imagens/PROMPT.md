# Rastro de imagens

Um hero editorial em que o ponteiro deixa um rastro de cartões de projeto dentro de um acervo ao lado da manchete, e um clique amplia o cartão ali mesmo.

## Prompt

```text
Construa um hero editorial para o INEMA.CLUB com duas áreas que nunca se misturam: a manchete e o acervo.
Ao mover o ponteiro DENTRO do acervo, cartões de projeto são deixados no caminho, voam até o ponteiro e somem
depois de um segundo. Nada do rastro sai do acervo: a manchete fica sempre limpa. Os cartões são desenhados em
código, sem imagem externa.

Aparência:
- Fundo #0b0b0d com degradê radial até #111114. Palco em grade de três linhas: topo, miolo e rodapé.
- Topo: marca "INEMA.CLUB" em Sora 800 16 px, ".CLUB" em #E2A23B. Menu em Inter 500 14 px, cor #a69d90:
  "Cursos", "Projetos (15)", "Comunidade". O topo quebra linha (flex-wrap): no celular o menu desce para a
  segunda linha, ocupa a largura toda e distribui os três itens, sem estourar 360 px.
- Miolo no desktop: duas colunas. À esquerda, título em Sora 800, clamp(2,4rem, 6,2vw, 5,9rem), entrelinha
  0,98, letras apertadas, três linhas: "Cursos que", "movem" (em #E2A23B, recuada 0,9em) e "pessoas.". Abaixo,
  uma linha de apoio em Inter #a69d90 com "15 projetos e cursos gratuitos" em creme. À direita, o acervo: painel
  #111114, borda de 1 px em creme a 8%, raio 12 px, brilho âmbar bem fraco no centro, overflow escondido.
  Rótulo "ACERVO" à esquerda e a dica "PASSE O MOUSE" em âmbar à direita, em JetBrains Mono 11 px caixa alta.
- Miolo no celular (até 720 px): uma coluna. Título em cima (clamp(2,3rem, 11,5vw, 3,4rem)), linha de apoio
  curta, e o acervo ocupa todo o resto da altura, então o meio da tela nunca fica vazio. A dica vira
  "TOQUE PARA SOLTAR".
- Cartões de 4:3 (desktop clamp(130 px, 16vw, 224 px); celular clamp(128 px, 40vw, 190 px)), raio 6 px, sombra
  quente. Arte em SVG feita em código, 5 formas × 3 paletas = 15 cartões, SÓ com cores da marca: âmbar
  #E2A23B, âmbar escuro #c98a2a, creme #f3efe7 e marrons quentes de fundo. Formas: sol sobre colinas, grade de
  pontos, anéis concêntricos, barras de gráfico, ondas. Número do cartão no canto em JetBrains Mono.
- Rodapé: linha de 1 px a 18% de creme. À esquerda, contador "07 / 15" em JetBrains Mono, dígitos rolando.
  À direita, "Projetos em destaque" em #a69d90.
- Pílula "Abrir" (só com mouse): fundo #f3efe7, texto #151310 em Inter 600, segue o ponteiro sobre um cartão
  e fica presa dentro do acervo.
- Ampliação: abre DENTRO do acervo, não na tela inteira. Véu #0b0b0d a 82% só sobre o acervo; cartão ampliado
  de até 520 px centrado no acervo (raio 8 px), legenda em Sora 700 e linha "Curso gratuito · INEMA.CLUB" em
  JetBrains Mono âmbar, botão "Fechar" em pílula no canto.

Movimento:
1. Todas as contas do rastro são em coordenadas locais do acervo. A cada 100 px de deslocamento do ponteiro
   dentro dele, um cartão nasce no último ponto de solta e voa até o ponteiro (mola 120, amortecimento 20).
   O centro do cartão é limitado para que ele caiba no acervo. Surge de 0,6 a 1 (mola 300, amortecimento 16),
   inclina até 7 graus pela velocidade e a arte interna vai de 1,22× a 1 (mola 160, amortecimento 18).
2. Depois de 1 s, um cartão que não é o mais recente encolhe até 70%, cai 120 px e some em 0,6 s. Com mais de
   8 cartões, o mais antigo sai antes. O acervo recorta qualquer sobra.
3. Clique num cartão: ele cresce até o centro do acervo por FLIP (mola 170, amortecimento 22), o véu escurece
   e a legenda sobe linha a linha (a segunda com 80 ms de atraso). Clique de novo, no véu, em "Fechar" ou Esc.
4. O contador rola os dígitos com mola firme (constante 320, amortecimento 34), para não parecer desalinhado.
5. Desktop sem interação: um cursor fantasma desenha um 8 lento (9 s por volta) dentro do acervo e solta
   cartões. A cada 8 s abre o mais recente por 2,4 s e fecha. Some no primeiro movimento do mouse.
6. Toque (hover: none): passar o dedo não funciona como hover, então o rastro roda sozinho dentro do acervo
   (o mesmo 8, sem cursor desenhado) e os cartões vivem 2,2 s. Tocar num ponto vazio do acervo solta um cartão
   ali e pausa o automático por 3 s; tocar num cartão abre a ampliação. No celular o automático não abre
   cartões sozinho.

Regras:
- JavaScript puro e CSS, sem biblioteca. Um único requestAnimationFrame, pausado com IntersectionObserver fora
  da tela e com a aba oculta.
- Animar só transform e opacity. A ampliação usa FLIP: nasce com translação e escala da posição de origem e a
  mola leva à identidade.
- Cartões são <button> reais, com aria-label e foco visível de 3 px em #E2A23B. Esc fecha a ampliação.
- Nunca capturar a rolagem: sem preventDefault em wheel ou touchmove e sem touch-action: none.
- prefers-reduced-motion ou ?motion=off: sem rastro. Um leque estático de cinco cartões inclinados no centro
  do acervo; a ampliação abre e fecha na hora.
- ?demo=1: o cursor fantasma aparece sempre (também no celular), não para com a interação e abre um cartão a
  cada 8 s.
- ?motion=xray: contorno tracejado âmbar e etiqueta do data-xray sobre cada elemento que se move.
- Funciona em 1280×720 e em 360×740, sem rolagem horizontal.
- Textos sem travessão, sem "incrível" e sem "revolucionário".
```
