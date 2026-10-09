# Dock líquido

Uma barra de atalhos em vidro, estilo dock de sistema, em que os ícones crescem perto do ponteiro e pulam ao clique.

## Prompt

```text
Construa uma barra de atalhos em vidro líquido, fixa na base da tela, para o site INEMA.CLUB: a pessoa passa o
ponteiro e os ícones crescem conforme a distância, um rótulo aparece sobre o ícone, e o clique faz o ícone pular.

Aparência:
- Fundo #0b0b0d com degradê radial até #111114. Três manchas desfocadas (blur 70 px, opacidade 0,3) em
  #E2A23B, #8a4b1f e #2e2a57, que derivam devagar.
- Título em Sora 800, tamanho clamp(2,6rem, 9vw, 6,4rem), cor #f3efe7. Ele mostra o nome da seção clicada
  (começa em "Início"). Abaixo, subtítulo Inter 400 em #a69d90.
- Rótulo de topo em JetBrains Mono 500, 12 px, caixa alta, #E2A23B.
- Barra: vidro com fundo rgba(22,22,28,0.46), desfoque 18 px com saturação 190%, borda 1 px branca a 12%,
  raio 26 px, sombra interna no topo. Padding 12 px, borda 1 px (largura total = conteúdo + 26 px).
- Oito ícones em azulejos de raio 23%, com gradiente de branco a 20% para branco a 4%, borda branca a 14%.
  Ícones SVG de traço (1,8 px, pontas arredondadas): Início, Buscas, Cursos, Lives (com o dia do mês),
  VIP, Vídeos (com selo vermelho "3"), Kits, PRO. Um separador fino de 1 px antes do PRO.
- Tamanho base do ícone: mínimo 30 px, máximo 54 px, calculado pela largura disponível (÷ 9,2).
  Espaço entre ícones: 8 px (4 px abaixo de 520 px de largura).
- Reflexo: faixa radial branca a 20% que segue o ponteiro dentro da barra.
- Ponto de 4 px embaixo do ícone da seção ativa.

Movimento:
1. Entrada: as letras do título sobem em cascata, 34 ms entre cada letra, cada uma em 620 ms.
2. Ponteiro sobre a barra: cada ícone cresce até 1,9× pela curva gaussiana (desvio = 2,2 × tamanho base),
   com mola k 520 e amortecimento 34. Os vizinhos se afastam para abrir espaço: cada ícone recebe um
   deslocamento horizontal igual à diferença entre o centro visual e o centro de repouso. A barra mantém a
   largura fixa; se o crescimento total passar da folga, todos os crescimentos são reduzidos na mesma proporção.
3. Rótulo: caixa escura com o nome do ícone aparece e sobe 8 px acima do ícone em foco (180 ms de opacidade).
4. Clique em um ícone: ele pula (velocidade inicial de -520 px/s, mola k 600, amortecimento 20) e amassa
   13% na largura ao cair. O título troca para o nome do ícone, com a cascata de letras.
5. O ícone Início, ao ser clicado, faz uma capivara sair da barra, acenar por 1,9 s e mergulhar de volta.
6. Sem interação: um cursor fantasma percorre os ícones 1, 4, 6 e 2, espera 1,2 s em cada um e clica.
   O fantasma some (300 ms) na primeira interação real.

Regras:
- JavaScript puro e CSS, sem biblioteca. Um único arquivo HTML.
- Um único requestAnimationFrame, pausado com IntersectionObserver fora da tela e com a aba oculta.
- Animar só transform e opacity. Cada fatia (slot) tem largura fixa igual ao tamanho base. Crescimento e
  empurrão dos vizinhos saem de translate3d e scale no azulejo. O rótulo é posicionado por transform, e a subida
  de 8 px é transform no texto interno.
- Nunca capturar a rolagem: sem preventDefault em wheel ou touchmove.
- Acessível: cada ícone é um botão real com aria-label. Foco com Tab mostra contorno de 3 px em âmbar. O foco
  faz o mesmo que o ponteiro (magnifica e mostra o rótulo).
- prefers-reduced-motion ou ?motion=off: estado final parado, sem magnificação, sem pulo, sem mascote e sem
  fantasma, com cliques trocando o título na hora.
- ?demo=1: o cursor fantasma roda sempre e não para com a interação.
- ?motion=xray: desenha um contorno tracejado âmbar e a etiqueta do data-xray sobre cada elemento que se move.
- Funciona em 1280×720 e em 360 px de largura, sem rolagem horizontal.
- Textos sem travessão, sem "incrível" e sem "revolucionário".
```
