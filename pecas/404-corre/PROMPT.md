# 404 corre

Página 404 do INEMA.CLUB que vira um joguinho: uma capivara corre por um chão de código e pula obstáculos enquanto a página "fugiu".

## Prompt

```text
Construa a página 404 do INEMA.CLUB como um joguinho de corrida em canvas: uma capivara simpática corre
sozinha num chão que passa, obstáculos de código vêm da direita, e a pessoa toca, clica ou aperta espaço
para pular; acima do jogo ficam o título "Esta página fugiu." e o botão "Voltar ao INEMA.CLUB".

Aparência:
- Fundo: gradiente vertical #0b0b0d (topo) → #111114 (chão). Texto #f3efe7. Acento âmbar #E2A23B.
  Sky #38bdf8 SÓ no link "INEMA.CLUB" do botão (o resto do botão é âmbar).
- Tipografia (Google Fonts): Sora 700 no título, clamp(28px, 5.2vw, 60px), letter-spacing -0.02em;
  Inter 400/500 no corpo (subtítulo clamp(14px, 1.6vw, 18px), #f3efe7 a 72%); JetBrains Mono 500 no
  placar (12–14px, letter-spacing 0.12em, maiúsculas) e no texto dos obstáculos.
- Layout (página inteira = 100% da viewport, sem rolagem, também em 360 px de largura):
  · canvas ocupa 100% do fundo; o chão fica a 84% da altura (em tela retrato, altura/largura > 1,3:
    chão a 74%, escala = largura/340 e lua a 62% da altura do chão, para não sobrar vazio nem cobrir o botão);
  · barra do placar no topo (16 px de margem): à esquerda "404 · INEMA.CLUB" e o selo
    "PILOTO AUTOMÁTICO" (só no modo demonstração); à direita "DISTÂNCIA 0000 m" e "RECORDE 0000 m";
  · bloco de texto centralizado começando a ~10% da altura: título, subtítulo
    "Erro 404 — mas a capivara continua correndo. Pule os bugs ou volte para a home.", botão;
  · botão real <a href="https://inema.club">: fundo âmbar #E2A23B a 12%, borda 1px âmbar, texto
    "Voltar ao " #f3efe7 + "INEMA.CLUB" #38bdf8, raio 999 px, altura mínima 44 px;
  · capivara a 18% da largura (entre 70 e 160 unidades do mundo).
- Mundo do canvas em unidades: escala = min(altura/380, largura/420) px por unidade, devicePixelRatio ≤ 2.
- Capivara (desenhada em código, flat com contorno #2a1a0e de 2 u): corpo-barril 64×38 u #9a6434,
  dorso mais escuro #7a4b25, barriga #b98252; cabeça grande e retangular com focinho rombudo e alto
  (#8a5a2e, ponta #6b4220), orelhinha redonda r 5 u, olho pequeno escuro com brilho, narina, bochecha
  âmbar a 25%; 4 perninhas curtas 8×14 u; sem cauda. Ao bater, olhos viram "x".
- Obstáculos (fundo #16161b, contorno âmbar 2 u, texto JetBrains Mono âmbar):
  · "{ }" — bloco 34×38 u;  · "404" — bloco 46×30 u;  · cacto de código — tronco 14×44 u com dois
  braços, espinhos ";" e "</>" no tronco.
- Fundo em paralaxe (3 camadas): estrelas (fator 0.04, cintilam), colinas distantes #141418 (fator 0.15),
  colinas próximas #19191f com borda âmbar a 10% (fator 0.35). Lua âmbar a 8% com halo, no canto
  superior direito. Chão: linha âmbar a 40% + tracinhos e glifos "01 ; {} =>" a 18% que passam a 1×.
- Indicador do modo demonstração: "dedo fantasma" (círculo r 9 u #f3efe7 a 85%, anel âmbar) logo à
  frente da capivara, abaixo do chão, com o texto "toque para pular" (Inter 11 u, 70%).

Movimento:
1. Entrada: título sobe 12 px e aparece em 600 ms (ease-out), subtítulo com atraso de 120 ms, botão com
   atraso de 240 ms, placar com atraso de 360 ms. A capivara já começa correndo; a corrida inicia em
   300 ms e o primeiro obstáculo nasce a 75% da largura, para o primeiro pulo acontecer por volta de 1,2 s.
2. Corrida: velocidade inicial 300 u/s, +9 u/s a cada segundo, teto 620 u/s. Ciclo das pernas de 260 ms
   na velocidade inicial (fica mais rápido junto com a velocidade); corpo balança ±1,5 u. Distância em
   metros = unidades percorridas / 25, mostrada com 4 dígitos ("DISTÂNCIA 0042 m").
3. Pulo (toque, clique, espaço ou seta para cima): impulso 600 u/s, gravidade 1600 u/s² → 750 ms no ar,
   112 u de altura. Squash & stretch: na decolagem estica (escala Y 1,16 / X 0,90) e volta a 1 em 180 ms;
   no ar pernas encolhidas; ao pousar achata (Y 0,80 / X 1,14) e volta em 180 ms, soltando 6 partículas
   de poeira (400 ms). Toque até 100 ms antes de pousar fica guardado e pula ao tocar o chão.
4. Obstáculos: nascem fora da tela à direita; distância mínima entre eles = velocidade × (750 ms + 500 ms)
   + sorteio de até velocidade × 900 ms, então todo obstáculo é pulável. Caixa de colisão menor que o
   desenho (capivara −22…+42 u na horizontal, 3…52 u de altura; obstáculo recuado 3 u), para quase-batida
   parecer quase-batida.
5. Batida: a capivara tropeça — gira até 0,6 rad para frente em 350 ms, desliza enquanto o mundo freia
   (−900 u/s²), tela treme 200 ms (±4 u), olhos em "x". Em 700 ms aparece "Fim de jogo — toque para
   tentar de novo" (fade 250 ms) com a distância da rodada; entradas são ignoradas até esse aviso aparecer.
   Recorde salvo em localStorage (try/catch) só nas rodadas que a pessoa começou do zero.
6. Repouso: com a aba oculta ou a peça fora da tela, o loop para; ao voltar, retoma sem saltos (delta
   limitado a 50 ms).
7. Modo demonstração: o piloto automático começa em até 500 ms e joga sozinho. Ele calcula o tempo até
   a colisão e pula no centro da janela segura (com variação de ±35% da folga, às vezes por pouco).
   A cada pulo o dedo fantasma "aperta" (escala 0,82 em 120 ms) e solta uma onda (0→36 u em 500 ms);
   parado, pulsa a cada 1,2 s. Se bater, reinicia sozinho em 1,4 s. Na primeira interação real (toque,
   clique ou espaço) o selo e o dedo somem e a pessoa assume a mesma corrida (esse toque já pula).
   Com ?demo=1 na URL o piloto nunca entrega o controle.

Regras:
- Um único arquivo HTML, JavaScript puro e CSS, sem biblioteca (só Google Fonts).
- Um canvas, devicePixelRatio limitado a 2, um único loop requestAnimationFrame com delta de tempo
  (velocidade igual em qualquer fps), pausado por IntersectionObserver e quando a aba está oculta.
- Animar só transform e opacity nos elementos HTML.
- Espaço/seta só pulam com a peça em foco ou sob o mouse; preventDefault só nesse espaço. Nunca
  preventDefault em wheel/touchmove no document; canvas com touch-action: manipulation.
- Acessível: botão real "Voltar ao INEMA.CLUB", canvas com tabindex="0", role="img" e aria-label
  explicando o jogo; foco visível âmbar; aviso de fim de jogo em região aria-live.
- prefers-reduced-motion: reduce → nenhum loop: um quadro parado com a capivara no ápice de um pulo
  sobre um bloco "404", placar em 0000, título e botão legíveis, sem dedo fantasma e sem animação de
  entrada.
- Nada de alert/confirm/prompt. Ocupa 100% da viewport, sem rolagem horizontal em 360 px.
```
