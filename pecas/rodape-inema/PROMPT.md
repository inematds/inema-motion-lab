# Rodapé INEMA

Rodapé de site em que as letras I N E M A são blocos grandes que caem com física, se empilham no chão e podem ser agarrados e arremessados.

## Prompt

```text
Construa um rodapé de site que ocupa 100% da tela, com colunas de links do ecossistema INEMA em cima
e, embaixo, as letras I N E M A como cinco blocos grandes e arredondados que caem com física real e
se empilham no chão do rodapé; a pessoa agarra qualquer letra, arrasta e arremessa (com inércia pela
velocidade do ponteiro), e um botão "Arrumar letras" põe tudo de volta no lugar.

Aparência:
- Fundo da página #0b0b0d; painel do rodapé #111114 com borda superior 1px #24242a.
  Texto #f3efe7; texto secundário #f3efe7 a 60%; acento âmbar #E2A23B.
- Fontes Google: Sora 800 nas letras e 600 nos títulos; Inter 400/500 no corpo; JetBrains Mono 500
  nos rótulos (maiúsculas, espaçamento 0.12em, 11–12px).
- Layout (de cima para baixo):
  - Topo (~35% da altura): 4 colunas iguais (2×2 abaixo de 640px de largura). Cada coluna:
    rótulo mono "01 · CURSOS" em âmbar, link com título Sora 600 22px (17px no celular) e o domínio
    em mono 12px abaixo, e uma frase curta em Inter 14px a 60% (some abaixo de 420px).
    Links: Cursos → https://inema.club · Eventos → https://eventos.inema.pro ·
    Buscas → https://buscas.inema.club · PRO → https://inema.pro.
  - Meio (o resto): área livre onde as letras vivem. O chão é uma linha 2px âmbar a 35% logo acima
    da barra inferior, com o rótulo mono "CHÃO · ARRASTE AS LETRAS" a 40%.
  - Barra inferior (~56px, pode quebrar em 2 linhas no celular): à esquerda
    "© 2026 INEMA.CLUB · conteúdo aberto e gratuito" (INEMA.CLUB é link para https://inema.club,
    na cor sky #38bdf8 — único uso do sky); à direita o botão "Arrumar letras" (borda 1.5px âmbar,
    texto âmbar, fundo transparente, raio 999px; hover: fundo âmbar, texto #0b0b0d).
- Letras: blocos de largura 0.86×altura, altura = menor entre (largura útil ÷ 4.62), 30% da altura
  da tela e 200px; raio 22% da altura; contorno 3px; sombra dura 6px 6px 0 #000 (sem desfoque);
  brilho interno inset 0 -0.08em 0 rgba(0,0,0,.18). Letra em Sora 800, 62% da altura do bloco.
  Cores: I âmbar #E2A23B / texto #0b0b0d · N creme #f3efe7 / texto #0b0b0d ·
  E grafite #2a2a31 / texto #E2A23B / contorno #4a4a54 · M dourado #F2C76E / texto #0b0b0d ·
  A âmbar escuro #C9821F / texto #f3efe7. Contorno das demais: #0b0b0d.
- Posição "arrumada": as cinco lado a lado, centradas, apoiadas no chão, intervalo 8% da altura.

Movimento:
1. Entrada: as letras nascem acima da tela, sobre a própria casa (±6% de deslocamento e ±0.25 rad
   de giro aleatórios), e são soltas uma a uma, 120 ms de intervalo (I, N, E, M, A). Gravidade 1.6;
   quicam (elasticidade 0.35, atrito 0.6, atrito do ar 0.012) e assentam em ~1.4 s.
2. Interação:
   - Agarrar (ponteiro pressionado numa letra): a letra segue o ponteiro pelo ponto em que foi
     pega, por velocidade (continua colidindo com as outras), e o giro é amortecido.
   - Soltar: a letra herda a velocidade do ponteiro medida nos últimos 80 ms, limitada a 35 px por
     passo de física (1/60 s), e voa com inércia.
   - Teclado: Enter ou Espaço numa letra dá um "pulinho" (velocidade −11 px/passo para cima e um
     giro leve de ±0.08 rad/passo). Soltar o mouse sem arrastar não faz nada.
   - "Arrumar letras": cada letra volta à casa em 700 ms (easeOutCubic, 60 ms de atraso entre letras),
     sem colidir durante a volta, giro levado a 0; depois volta a ser física normal.
3. Física: paredes laterais e chão sólidos (200px de espessura, rentes às bordas); teto invisível
   1.5 bloco acima da tela durante a entrada; 1200 ms depois ele desce para rente ao topo do rodapé,
   e os arremessos para cima batem nele e voltam (nenhuma letra sai da área visível). 8 iterações de posição. Proteção:
   se uma letra sair da área ou virar NaN, reaparece na casa dela.
4. Repouso: letras empilhadas/espalhadas no chão, paradas, até a próxima interação.
5. Modo demonstração (ao carregar, depois da entrada; começa 1800 ms após a primeira letra):
   um cursor fantasma (seta SVG creme com contorno escuro) faz um ciclo de 7650 ms, em loop:
   a. 900 ms vai até o E · b. 150 ms pressiona (encolhe a 85%) e agarra ·
   c. 600 ms arrasta para cima-esquerda (acelerando) e solta = arremesso ·
   d. 900 ms vai até o M · e. 150 ms agarra · f. 550 ms arrasta para cima-direita e solta ·
   g. 800 ms vai até o I · h. 150 ms agarra · i. 450 ms puxa para cima e solta ·
   j. 600 ms espera · k. 900 ms vai até "Arrumar letras" · l. 200 ms clica (arrumar) ·
   m. 1300 ms espera com as letras voltando.
   O fantasma usa as mesmas funções de agarrar/mover/soltar do ponteiro real.
   Na primeira interação real (pointerdown ou tecla em qualquer lugar) o fantasma solta o que segura
   e some (opacidade 0 em 300 ms) para sempre. Com ?demo=1 na URL ele não para com interação
   (para gravar vídeo).

Regras:
- Matter.js 0.19.0 de cdnjs só para a física; sem o renderer dele. Cada letra é um <button> real
  posicionado por transform (translate + rotate) a cada quadro. Se o Matter não carregar, a página
  mostra o estado de repouso estático (igual ao de movimento reduzido).
- Um único loop requestAnimationFrame com passo fixo de 1/60 s (dt limitado a 50 ms na volta),
  pausado quando a peça sai da tela (IntersectionObserver) e quando a aba fica oculta.
- Animar só transform e opacity.
- Ponteiro: pointer events com setPointerCapture; touch-action:none só nos blocos das letras. Nenhum
  listener de wheel; nunca preventDefault no document; rolagem e toque fora das letras são livres.
- Acessível: letras são <button aria-label="Letra I — arraste ou aperte Enter para pular">; links
  reais <a>; foco visível (contorno 2px âmbar, 3px de afastamento; nas letras, contorno 3px creme
  tracejado). O cursor fantasma tem aria-hidden e pointer-events:none.
- prefers-reduced-motion: reduce → a palavra INEMA aparece já assentada no chão, na posição
  arrumada, parada: sem queda, sem física, sem cursor fantasma; "Arrumar letras" não tem efeito.
- 100% da viewport, sem rolagem horizontal em nenhuma largura (360px inclusive, letras menores);
  funciona embutido em <iframe> 16:9. Ao redimensionar, recalcula tamanhos e reassenta as letras.
- Nada de alert/confirm/prompt. Um arquivo HTML autocontido (CSS e JS inline).
```
