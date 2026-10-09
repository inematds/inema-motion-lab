# Faixa flap

Um quadro de embarque de aeroporto (flap mecânico), com avisos, próximas lives, relógio e menu que viram para "VAI →".

## Prompt

```text
Construa o cabeçalho de um site como um quadro de partidas de aeroporto, com letras de flap mecânico. O quadro mostra
as próximas lives do INEMA.CLUB, e o menu também é feito de tiles.

Aparência:
- Fundo #0b0b0d com vinheta. Placa #121212 com listras finas, raio 14 px, sombra profunda, largura máxima de 1140 px.
- Topo: um círculo amarelo #FFD33D com a letra "i" e a marca "INEMA.CLUB" em Sora 800, ".CLUB" em #E2A23B.
- Cada tile tem fundo #1E1E1E, linha central escura de 1 px, texto em JetBrains Mono 500 com 62% da altura do tile.
  Cores: horários e status #FFD33D; títulos e o cabeçalho "PRÓXIMAS LIVES" em #F3EEE2; rótulos de coluna em #a69d90;
  avisos em #E2A23B.
- Tamanho do tile: largura calculada pela tela (máximo 1100 px no total, espaço de 2 px entre tiles), altura de 1,5 ×
  largura. Em telas de 640 px ou mais: quatro colunas (HORA 5, TEMA 22, SALA 5, STATUS 14) e relógio "hh:mm" no
  cabeçalho. Em telas menores: duas colunas (TEMA 14, STATUS 10), sem relógio e sem horário.
- Faixa de avisos: 26 tiles em #E2A23B. Mensagens: "CURSOS GRÁTIS INEMA.CLUB", "LIVES TODA SEMANA NO AR" e
  "PRATIQUE COM AGENTES".
- Lâmpada de status ao lado de cada evento: apagada (#3a2b12), acesa em âmbar com brilho (em "ENTRANDO" ela pisca).
- Menu: quatro itens (CURSOS, EVENTOS, BUSCAS, VIP) de oito tiles cada, em #f3efe7.
- Estados de status, em ordem: EM BREVE, SALA ABERTA, ENTRANDO, ÚLTIMAS VAGAS, ENCERRADA.

Movimento:
1. Carregamento: os tiles vão de vazio ao texto em flip, da esquerda para a direita, com 34 ms entre tiles.
2. Cada flip dura 66 ms. A metade de cima cai em rotateX de 0 a 90 graus, acelerando como gravidade (q²), e fica
   mais escura (opacidade até 0,6). Depois a metade de baixo sobe de -90 a 0 graus, com sombra que clareia.
3. Uma troca passa pelo tambor fixo " A–Z ÁÂÃÇÉÊÍÓÔÕÚ 0–9 : . / - →". Nunca anda para trás. São no máximo 15 flips;
   se faltarem mais passos, começa 15 passos antes do alvo. Só os tiles que mudam animam.
4. Faixa de avisos: troca a cada 5,2 s. Clique ou Enter pulam para o próximo aviso.
5. Relógio do cabeçalho: a cada 2,1 s avança um minuto. Também a cada 2,1 s um evento avança um status. Quando um
   evento chega a ENCERRADA, 1,4 s depois o quadro rola: o evento sai e um novo entra no fim, com flips em cascata
   de linha em linha (50 ms).
6. Hover ou foco num item do menu: os oito tiles viram "VAI →" (texto em âmbar). Sair volta ao nome.

Regras:
- JavaScript puro e CSS, sem biblioteca. Um único requestAnimationFrame, pausado com IntersectionObserver e com a aba oculta.
- Os flips são feitos com transform (rotateX) e opacidade. Os tiles são elementos HTML, sem canvas.
- Nunca capturar a rolagem: sem preventDefault.
- Acessível: cada item do menu é um link real com foco visível (contorno de 3 px em #E2A23B). A faixa de avisos é
  um botão com Enter e Espaço.
- prefers-reduced-motion ou ?motion=off: as letras trocam na hora, sem flip. O quadro continua atualizando o texto.
- ?demo=1: nenhum comportamento muda (o quadro já se mexe sozinho).
- ?motion=xray: contorno tracejado âmbar e etiqueta do data-xray sobre cada parte que se move.
- Funciona em 1280×720 e em 360 px, sem rolagem horizontal: abaixo de 640 px o quadro passa para duas colunas.
- Textos sem travessão, sem "incrível" e sem "revolucionário".
```
