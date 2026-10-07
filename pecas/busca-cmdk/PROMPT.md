# Busca ⌘K

Uma pílula de busca no topo do portal INEMA.CLUB que cresce e vira uma paleta de comandos: digitar filtra cursos, guias e eventos, as setas movem um realce que desliza e Enter abre o item.

## Prompt

```text
Construa a barra de busca "⌘K" do INEMA.CLUB: no topo de uma página de documentação há uma pílula
"Buscar cursos, guias e eventos…"; ao clicar nela (ou apertar ⌘K / Ctrl+K com a peça em foco ou sob o
mouse) a pílula cresce e vira uma paleta de comandos centralizada, onde a pessoa digita, navega com as
setas e abre um resultado com Enter.

Aparência:
- Fundo da página #0b0b0d; superfícies #111114; paleta #141418. Texto #f3efe7; texto secundário #9a958c;
  bordas rgba(243,239,231,.10). Acento âmbar #E2A23B. Sky #38bdf8 só no link "INEMA.CLUB" (rodapé da
  paleta e link do toast).
- Fontes Google: Sora 700 (logo e título da página), Inter 400/500/600 (corpo, itens, campo),
  JetBrains Mono 500 (teclas, rótulos de grupo, metadados, migalha).
- Barra superior: 56 px de altura, fundo #0b0b0d com borda inferior rgba(243,239,231,.08). À esquerda
  o logo "INEMA" #f3efe7 + ".CLUB" #E2A23B (Sora 700, 17 px). No centro a pílula. À direita links
  "Cursos · Guias · Eventos" (Inter 14, #9a958c), ocultos abaixo de 760 px.
- Pílula: <button>, altura 40 px, largura min(440 px, espaço livre), raio 999 px, fundo #111114, borda
  1 px rgba(243,239,231,.10); lupa 16 px #9a958c; texto Inter 14 #9a958c; à direita um chip de tecla
  (JetBrains Mono 12, fundo #1a1a1f, borda rgba(243,239,231,.12), raio 6 px) com "⌘K" no Mac e
  "Ctrl K" nos demais sistemas — o mesmo rótulo aparece no indicador de teclas da demonstração. Hover:
  borda âmbar a 45 %. Foco visível: contorno 2 px #E2A23B com afastamento 2 px. Abaixo de 520 px o texto
  vira "Buscar…" e o chip some.
- Página atrás: barra lateral de 220 px com links de docs (oculta abaixo de 760 px); conteúdo com migalha
  mono "docs / começar", título Sora 700 clamp(26 px, 4vw, 40 px) "Comece por aqui", parágrafo Inter 16 e
  três cartões #111114 (raio 14 px). É só cenário: não rola, não compete com a paleta.
- Paleta: role=dialog, centralizada, topo em min(14vh, 96 px) (56 px em telas baixas), largura
  min(640 px, 100vw − 24 px), ALTURA FIXA (lista com altura calculada a partir da viewport, máx. 372 px)
  para que filtrar nunca mude o tamanho. Uma camada de fundo separada (#141418, borda
  rgba(243,239,231,.10), raio 16 px, sombra 0 24px 80px rgba(0,0,0,.6) e fio de luz interno no topo)
  é a única coisa que escala no morph.
  - Cabeçalho 56 px: lupa âmbar, campo Inter 16 sem borda (placeholder "Buscar cursos, guias e
    eventos…"), chip "esc".
  - Lista: rótulos de grupo "CURSOS", "GUIAS", "EVENTOS" (JetBrains Mono 11, maiúsculas, espaçamento
    .08em, #9a958c). Item de 52 px: ladrilho 30 px raio 8 com ícone (cursos âmbar sobre âmbar 14 %,
    guias #f3efe7 sobre 6 %, eventos #c9c3b8 sobre 5 %), título Inter 14/600, descrição Inter 12 #9a958c, metadado mono 11 à
    direita (ex.: "18 aulas", "PT·EN·ES", "qui 20h"); o item selecionado troca o metadado por um chip "↵".
  - Realce: UM retângulo rgba(226,162,59,.10), raio 10 px, com barra âmbar de 2 px à esquerda, que
    desliza por baixo dos itens até o selecionado.
  - Letras que casaram com a busca: <mark> âmbar #E2A23B, peso 600, fundo rgba(226,162,59,.14), raio 3 px.
  - Rodapé 38 px: "↑↓ navegar · ↵ abrir · esc fechar" (mono 11 #9a958c) e o link "INEMA.CLUB" em sky.
  - Sem resultado: "Nada encontrado para “x”" centrado, no mesmo espaço da lista.
  - Foco no campo: a borda inferior do cabeçalho fica âmbar a 60 %.
  - Abaixo de 420 px o metadado dos itens some e o rodapé mostra só "↑↓ navegar · ↵ abrir".
- Fundo atrás da paleta: rgba(5,5,7,.62) com desfoque 6 px.
- Toast: base da tela, centralizado, #141418, borda âmbar 35 %, raio 12 px, "Abrindo <título>" +
  endereço inema.club/… em sky (mono 12).
- Itens: Cursos — Curso Codex 18, Curso Claude Code, Mods do Claude Code (técnico), INEMA Agent Runtime.
  Guias — Ata (notetaker local), Arena da Capivara, inema-mods, Kits de atendimento, filmarca, CrunchLog.
  Eventos — Área Skills, Área MODS, Live: Codex × Claude.

Movimento:
1. Entrada da página: nada pisca; a pílula aparece já no lugar (opacity 0→1 em 240 ms, 120 ms após o load).
2. Abrir (clique, Enter/Espaço na pílula, ⌘K/Ctrl+K): mede o retângulo da pílula e o da paleta; a
   camada de fundo parte do retângulo da pílula (translate + scale) e vai ao da paleta com mola
   (rigidez 380, amortecimento 30 → assenta em ~420 ms, leve passada de ~3 %). A pílula apaga
   (opacity 1→0 no primeiro terço do progresso); o fundo escuro acompanha o progresso (0→1). O conteúdo
   NUNCA escala: cabeçalho, lista e rodapé entram por opacity 0→1 e translateY 8→0 px em 200 ms, a partir do
   momento em que o progresso passa de 90 % (a camada já cobre a área); cada item entra com 180 ms e atraso de 22 ms por posição. O campo recebe foco (só em
   interação real). Cada abertura começa com a busca vazia e o primeiro item selecionado.
3. Digitar: filtra a cada tecla, sem acento e sem caixa. Primeiro tenta trecho contínuo no título;
   senão, subsequência (letras em ordem). Ordena por pontuação dentro de cada grupo e esconde grupos
   vazios. Os itens re-renderizados entram com o mesmo 180 ms / 22 ms. A seleção volta ao primeiro item e o
   realce desliza até ele.
4. ↑/↓ (com volta ao fim/início), passar o mouse (mousemove) sobre um item: o realce desliza com mola
   (rigidez 520, amortecimento 40 → ~200 ms, sem quique). Se o item sai da área visível da lista, ela
   rola o mínimo para mostrá-lo.
5. Enter ou clique num item: chip "↵" do item pulsa (scale 1→0.9→1, 160 ms), o toast sobe
   (translateY 24→0 px + opacity, mola ~300 ms), fica 1 600 ms e desce em 220 ms; a paleta fecha.
6. Fechar (Esc, clique no fundo, após Enter): mesma camada faz o caminho inverso com mola criticamente
   amortecida (rigidez 520, amortecimento 46 → ~260 ms, sem passada, escala nunca abaixo de 0,02);
   o conteúdo some nos primeiros 90 ms; a pílula reaparece no último terço; o foco volta à pílula.
7. Repouso: pílula parada no topo; nada se move.
8. Modo demonstração (ciclo de 7 800 ms, recomeça sozinho; um cursor-seta SVG fantasma e um chip de
   "tecla pressionada" no canto inferior direito):
   0 ms    reset (paleta fechada, busca vazia, toast oculto, cursor fora no canto inferior direito)
   100     cursor aparece (opacity 0→1, 200 ms)
   150     cursor vai até a pílula (850 ms, easeInOutCubic)
   1050    clique (cursor scale 0.86 + anel âmbar que expande e some em 420 ms)
   1150    paleta abre (passo 2)
   1650 / 1800 / 1950   digita "c", "o", "d" (passo 3)
   2200    cursor se afasta para a direita da paleta (450 ms)
   2500 ↓   2850 ↓   3200 ↑    (chip mostra a tecla; passo 4)
   3550    cursor desliza até o 3º resultado (450 ms) e o seleciona ao chegar
   4250    clique nele → toast + fecha (passos 5 e 6)
   4800    cursor vai para a área vazia da barra (600 ms)
   5500    ⌘K (ou Ctrl K) → abre com a lista completa
   6000 ↓  6500 Esc → fecha
   7100    cursor apaga (400 ms)
   7800    recomeça
   A primeira interação real (pointerdown ou keydown confiáveis) encerra a demonstração: cursor e chip
   somem, a paleta aberta pela demo fecha e a peça fica com a pessoa. Com ?demo=1 na URL a demonstração
   nunca para (gravação). A demo jamais chama focus().

Regras:
- JavaScript puro e CSS, sem biblioteca; só as fontes do Google Fonts.
- Um único loop requestAnimationFrame com relógio por dt (teto 50 ms) movendo todas as molas, o timer
  do toast e a linha do tempo da demo; parado quando a peça sai da tela (IntersectionObserver) ou a aba
  fica oculta (visibilitychange). Sem setTimeout para animação.
- Animar só transform e opacity. A altura da paleta é fixa; o realce lê offsetTop só na troca de seleção.
- Nunca preventDefault em wheel/touchmove; a lista rola nativamente. ⌘K/Ctrl+K só com o ponteiro sobre a
  peça ou a janela da peça em foco; preventDefault apenas quando o atalho é tratado. Esc com a paleta
  fechada não faz nada.
- Acessível: pílula é <button>; campo role=combobox com aria-expanded, aria-controls e
  aria-activedescendant; lista role=listbox com role=group rotulados e role=option aria-selected;
  diálogo aria-modal; Tab circula entre o campo e o link do rodapé; foco volta à pílula ao fechar.
- prefers-reduced-motion: reduce → estado final parado: paleta ABERTA com "cod" digitado, resultados
  filtrados com letras destacadas, 2º resultado selecionado, sem fantasma, sem chip de tecla, sem
  demonstração. Interações continuam funcionando, mas tudo muda instantaneamente (molas saltam ao alvo).
- Ocupa 100 % da viewport, funciona em iframe 16:9 e em 360 px de largura sem rolagem horizontal.
- Nada de alert/confirm/prompt. Um arquivo HTML autocontido.
```
