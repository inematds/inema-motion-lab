# Bento Glide

Grade bento "O que tem no INEMA.CLUB" com oito blocos de tamanhos diferentes: uma moldura âmbar luminosa desliza com mola até o bloco sob o cursor (ou em foco), assume o tamanho dele, e o bloco "acorda" com uma mini-animação própria.

## Prompt

```text
Construa uma seção "O que tem no INEMA.CLUB" em grade bento com oito blocos (Cursos gratuitos, Guias
de projeto, Eventos e lives, Buscas, Comunidade VIP, INEMA.PRO, Vídeos, Kits). A pessoa passa o mouse
(ou navega com Tab) pelos blocos; uma única moldura âmbar luminosa desliza com mola até o bloco ativo,
se ajusta ao tamanho dele, e o bloco acorda com uma mini-animação que conta o que ele oferece.

Aparência:
- Fundo da página #0b0b0d com um brilho radial âmbar muito fraco (rgba(226,162,59,.07)) no canto
  superior esquerdo. Blocos em #111114, borda 1px rgba(243,239,231,.07), raio 18px.
- Texto #f3efe7; texto secundário #f3efe7 a 62% de opacidade. Acento âmbar #E2A23B.
  Sky #38bdf8 SÓ no link "inema.club" do cabeçalho.
- Tipografia (Google Fonts): Sora 600/700 nos títulos (título da seção clamp(20px,3.2vw,34px);
  título do bloco clamp(14px,1.5vw,18px)), Inter 400/500 no corpo (clamp(11px,1.05vw,13.5px)),
  JetBrains Mono 500 nos rótulos (10–11px, caixa alta, espaçamento .14em, âmbar a 85%).
- Layout desktop (≥ 721px): cabeçalho com rótulo "MAPA DO ECOSSISTEMA", título e uma linha de apoio;
  abaixo, grade 4 colunas × 3 linhas, vão 12px, ocupando todo o resto da altura da viewport
  (sem rolagem):
    Cursos gratuitos 2×2 (colunas 1–2, linhas 1–2) · Guias de projeto 1×1 · Eventos e lives 1×1 ·
    Buscas 2×1 (colunas 3–4, linha 2) · Comunidade VIP · INEMA.PRO · Vídeos · Kits (1×1 cada, linha 3).
- Celular: 721px → 2 colunas (Cursos e Buscas ocupam 2); ≤ 400px → 1 coluna. Linhas com altura
  mínima de 132px e a peça rola na vertical. Nunca rolagem horizontal (testar em 360px).
- Cada bloco tem: rótulo mono no topo (ex.: "01 · CURSOS"), título, uma linha de descrição e uma
  área de "mini" à direita/abaixo com o desenho da mini-animação em âmbar sobre fundo #16161a.
- Moldura: retângulo arredondado de 2px #E2A23B (raio 18px) + halo externo âmbar desfocado
  (opacidade .55) + quatro cantos mais brilhantes (#ffd48a), desenhada 4px para fora do bloco (no vão). Ela é UMA só e mora acima dos blocos,
  sem capturar o mouse (pointer-events: none).

Movimento:
1. Entrada — os blocos sobem 14px e aparecem (opacity 0→1) em 520 ms, ease-out, com atraso de
   60 ms entre eles na ordem de leitura. O cabeçalho entra junto, 0 ms.
2. Interação — ao entrar com o mouse num bloco (pointerenter) ou dar foco nele (Tab), ele vira o alvo.
   Ao sair de um bloco, espere 110 ms: se nenhum outro bloco virou alvo nesse tempo, a moldura
   esmaece (opacity → 0 em ~260 ms) e fica parada onde estava. Cruzar o vão de 12px rápido não pisca.
3. Física da moldura — posição (x, y) e tamanho (largura, altura) seguem uma mola subamortecida
   independente cada: rigidez 210, amortecimento 23 (≈ 1 leve passada do ponto, assenta em ~450 ms).
   Desenho só com transform: as quatro bordas são traços de espessura fixa esticados com scaleX/scaleY,
   os cantos são quartos de círculo transladados, o halo é escalado; nada de width/height/top/left.
   Quando a moldura reaparece depois de esmaecer, ela nasce já no novo bloco (sem atravessar a tela).
4. Mini-animações (acordam ao virar alvo, voltam ao repouso em 400 ms ao perder o alvo):
   - Cursos gratuitos: número conta de 0 a 100 com "% gratuito" em 900 ms (ease-out cúbico) e três
     fichas de curso sobem empilhando, 90 ms entre elas.
   - Guias de projeto: barra de progresso enche (scaleX 0→1) em 900 ms; quatro marcas de passo
     acendem quando a barra passa por elas.
   - Eventos e lives: ponto "AO VIVO" pulsa (escala 1→1.8, opacidade 1→0, 1200 ms em loop) e cinco
     barras de equalizador oscilam em scaleY com fases diferentes.
   - Buscas: o campo digita "agente de IA" (55 ms por letra), a lupa balança ±12° e três linhas de
     resultado deslizam da esquerda, 80 ms entre elas.
   - Comunidade VIP: quatro avatares se juntam numa fileira sobreposta (translateX), 70 ms entre eles,
     e um selo "VIP" dá um pop (escala 0.6→1).
   - INEMA.PRO: o losango gira 90° e um brilho atravessa o selo "PRO" (translateX −120%→120%, 700 ms).
   - Vídeos: o botão play dá um pop (escala 1→1.18→1) e a linha do tempo enche em 1400 ms.
   - Kits: três cartas empilhadas abrem em leque (rotate −10°, 0°, +10° e translate), 380 ms.
5. Repouso — sem alvo, a moldura fica invisível e todas as minis no estado inicial (número 0, barras
   vazias, campo vazio, cartas empilhadas). O bloco ativo fica com a borda interna um pouco mais clara.
6. Modo demonstração — ao carregar, um cursor fantasma (seta SVG branca com contorno escuro e sombra)
   aparece em 300 ms e passeia por oito paradas em um ciclo de 7,6 s: Cursos → Guias → Eventos →
   Buscas → Kits → Vídeos → INEMA.PRO → Comunidade VIP → (volta a Cursos). Cada trecho: 380 ms de
   deslocamento com easing suave (ease-in-out) + 570 ms parado sobre o bloco. O fantasma pilota a
   moldura igual a um mouse real. No celular ele só visita os blocos visíveis na tela. A primeira
   interação real (pointermove de verdade ou qualquer tecla) encerra a demonstração: o fantasma some
   em 250 ms. Com ?demo=1 na URL o fantasma nunca para (para gravar vídeo).

Regras:
- JavaScript puro e CSS, sem biblioteca. Um único arquivo HTML autocontido (fontes do Google Fonts).
- Um único loop requestAnimationFrame, pausado quando a peça sai da tela (IntersectionObserver) e
  quando a aba fica oculta (visibilitychange).
- Animar só transform e opacity (o número e o texto digitado trocam conteúdo, não estilo).
- Nunca capturar a rolagem: nada de preventDefault em wheel/touchmove; listeners passivos.
- Acessível: cada bloco é um link real (<a href="https://inema.club" target="_blank" rel="noopener">)
  com foco visível (contorno âmbar 2px tracejado, por dentro do bloco: outline-offset −7px, para não brigar com a moldura) e aria-label claro; Tab percorre os
  blocos na ordem de leitura e move a moldura; Enter abre o link. Minis são decorativas (aria-hidden).
- prefers-reduced-motion: reduce → sem entrada, sem deslize, sem fantasma: a moldura salta direto
  para o bloco em foco/sob o mouse (sem mola, sem esmaecimento animado) e TODAS as minis aparecem no
  estado final, paradas (100% gratuito, barra cheia, "agente de IA" digitado, avatares juntos, cartas
  em leque, equalizador em alturas fixas, linha do tempo cheia).
- Sem alert/confirm/prompt. Sem rolagem horizontal em 360px.
```
