# Menu que se transforma

Menu de topo em que um único painel suspenso desliza e muda de tamanho entre os itens, trocando o conteúdo de lado, em vez de abrir e fechar um painel para cada item.

## Prompt

```text
Construa o topo de um site com um menu de quatro itens (Cursos, Eventos, Comunidade, Ferramentas)
em que um ÚNICO painel suspenso escuro abre embaixo do item apontado e, ao passar para outro item,
desliza e muda de largura e altura até caber o conteúdo novo, com uma setinha que acompanha o item.

Aparência:
- Página #0b0b0d com duas manchas de luz grandes e desfocadas atrás de tudo: uma âmbar
  (#E2A23B a 34% no centro, some até 66% do raio) no canto superior esquerdo e uma azul-ardósia
  (#5c6ca0 a 28%) à direita, e uma trama de pontos #f3efe7 a 5% (4 px) por cima.
- Fontes Google: Sora 700 (logo e título), Inter 400/500/600 (corpo), JetBrains Mono 500 (rótulos,
  11–12 px, caixa alta, espaçamento 0.14em, âmbar).
- Topo em três colunas: logo "INEMA.CLUB" (".CLUB" em âmbar) à esquerda; no centro uma pílula de
  vidro (fundo #18181c a 55%, desfoque 18 px, borda 1 px #f3efe7 a 10%) com os quatro itens
  (Inter 500 14.5 px, setinha ▾ que gira 180° quando aberto); à direita "Entrar" (texto 60%) e o
  botão âmbar "Comece grátis" (texto #0b0b0d). Abaixo de 860 px a pílula desce para uma segunda
  linha; abaixo de 460 px some o "Entrar", os itens ficam 12.5 px e o conteúdo dos painéis vira
  uma coluna.
- Herói centralizado: rótulo "Aberto e gratuito", título "Aprenda IA no seu ritmo." (Sora 700,
  clamp 2.6–6.6 rem, espaçamento -0.055em, degradê vertical de #f3efe7 para #8d877d no texto) e
  uma frase de apoio a 60%.
- Painel: fundo #1f1f25 → #121216, raio 18 px, filete interno 1 px #f3efe7 a 12% em cima/esquerda
  e 8% embaixo/direita, sombra 0 30px 70px preta a 55%, setinha quadrada girada 45° no topo.
  Conteúdos (cada um com rótulo mono no topo, ícones de traço âmbar em caixinhas de 34 px):
  - Cursos (560 px, 2x2): Trilhas para começar · Aulas de 15 minutos · Em três idiomas · Novos da semana.
  - Eventos (330 px, lista): Lives da semana · Áreas temáticas · Gravações.
  - Comunidade (500 px): dois links (Comunidade VIP, INEMA.PRO) + um cartão âmbar
    "Tire dúvidas com quem já fez." com "ENTRAR →".
  - Ferramentas (620 px, 3 blocos): Buscas · Kits prontos · Vídeos.
  Cada link tem título Inter 600 e uma linha curta a 60%. Links reais para inema.club,
  eventos.inema.pro, buscas.inema.club e inema.pro.

Movimento:
1. Entrada: as manchas de luz derivam devagar (senos de 6.5 a 9 s, até 6% da tela). Menu fechado.
2. Passar o mouse num item: o painel aparece já no tamanho do conteúdo, centrado sob o item
   (preso a 16 px das bordas da tela), surgindo em 160 ms de opacidade com escala 0.98 → 1.
3. Ir para outro item com o painel aberto: posição x, largura, altura e a setinha seguem molas
   (rigidez 260, amortecimento 28) até o novo conteúdo medido. O conteúdo antigo some em 180 ms
   andando 12 px para o lado de onde você saiu; o novo entra em 180 ms vindo 12 px do lado para
   onde você foi.
4. Realce: uma pílula clara (#f3efe7 a 9%) desliza sob o item apontado com mola mais dura
   (rigidez 420, amortecimento 34), largura e posição.
5. Sair do menu e do painel: fecha depois de 150 ms (some em 160 ms com escala 0.98). Passar do
   item para o painel dentro desse tempo mantém aberto.
6. Para mudar o tamanho sem animar width/height, o fundo é recortado por quatro camadas aninhadas
   com overflow hidden e cantos de 18 px, cada uma presa a um canto (superior esquerdo, superior
   direito, inferior esquerdo, inferior direito) e movida só com translate: a interseção delas é
   o retângulo do painel, com os quatro cantos sempre redondos.
7. Repouso: menu fechado, manchas derivando.
8. Modo demonstração: um cursor fantasma percorre os quatro itens, 2 s cada (450 ms até o item,
   desce 650 ms para dentro do painel, espera, volta), sai do menu, o painel fecha, e repete.
   Para no primeiro movimento real do mouse, clique, tecla ou rolagem; com ?demo=1 nunca para.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML.
- Um único loop requestAnimationFrame (molas, manchas, cursor fantasma), pausado fora da tela
  (IntersectionObserver) e com a aba oculta. Meça o tamanho real de cada conteúdo (e de novo ao
  redimensionar).
- Animar só transform e opacity.
- No toque, tocar no item abre e tocar de novo fecha; tocar fora fecha.
- Teclado: Enter/Espaço abre e fecha, ← → passam entre os itens, ↓ entra no primeiro link,
  Esc fecha e devolve o foco ao item. Itens são <button aria-expanded>; conteúdos escondidos
  ficam inert. Foco visível de 3 px âmbar.
- Nunca capturar a rolagem.
- prefers-reduced-motion: sem molas e sem deriva: o painel salta direto para o tamanho e o
  conteúdo troca na hora; estado final = menu fechado.
- ?motion=off: igual ao movimento reduzido. ?motion=xray: contorno tracejado âmbar e etiqueta
  sobre o painel, o realce e a mancha de luz, lidos de data-xray.
- Sem rolagem horizontal em 360 px.
```
