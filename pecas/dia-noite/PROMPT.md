# Dia e noite

Um interruptor de tema claro/escuro que é uma cena: ao alternar, o céu escurece, o sol se põe, a lua nasce, as estrelas surgem, a escola na colina acende as janelas e a capivara boceja e dorme — e as cores da página inteira trocam junto.

## Prompt

```text
Construa um alternador de tema claro/escuro em forma de cena ilustrada: a pessoa clica num
interruptor (sol que vira lua) e a página inteira passa do dia para a noite — céu, astros, estrelas,
uma pequena escola numa colina e uma capivara deitada na grama reagem, e as cores do site trocam
de verdade (variáveis CSS).

Aparência:
- Duas paletas em variáveis CSS no :root, trocadas por data-theme="day|night":
  - Dia: fundo #f6f1e7, superfície #efe6d4, texto #17120f, texto secundário #5b4f45,
    acento #b45309 (âmbar/dourado), trilho do interruptor #e6d6b8.
  - Noite: fundo #0b0b0d, superfície #111114, texto #f3efe7, texto secundário #a69d90,
    acento #E2A23B, trilho do interruptor #26262c.
- Tipografia (Google Fonts): títulos Sora 600; corpo Inter 400; rótulos JetBrains Mono 500,
  12 px, caixa alta, espaçamento 0.14em.
- Layout, ocupa 100% da viewport, sem rolagem:
  - Largura >= 760 px: duas colunas. Esquerda (40%): rótulo "INEMA.CLUB" no topo; no meio um
    rótulo de hora ("06:40 · MANHÃ" / "22:15 · NOITE"), o título ("Bom dia." / "Boa noite.",
    clamp 2.6–5.4 rem) e a linha "Estude no seu ritmo. O INEMA.CLUB está aberto 24 h." (Inter,
    clamp 1–1.3 rem, texto secundário); abaixo, o interruptor com o rótulo visível "Modo noturno".
    Direita (60%): a cena num cartão de cantos 28 px, borda 1 px na cor do texto a 10%.
  - Largura < 760 px (celular, 360 px): uma coluna; texto em cima, cena ocupando o resto da altura.
- Cena em SVG desenhado em código (viewBox 1000x1000, preserveAspectRatio xMidYMax slice; tudo
  o que importa fica entre x 120 e 880):
  - Céu: camada de dia (gradiente #9fd3e6 → #f6e7c8), camada de pôr do sol (#f2a65a → #c8607a) e
    camada de noite (#0d1530 → #1d2547). As três se sobrepõem e trocam só por opacidade.
  - 22 estrelas (brilhos de 4 pontas, 2–5 px, creme #fff4d6) espalhadas no céu.
  - Uma "roda celeste" com pivô em (500, 760) e raio 520: o sol (#f6c453, 58 px de raio, 12 raios
    girando devagar) no ângulo -62° e a lua (#efe6d2 com 3 crateras e halo suave) no lado oposto.
  - Duas nuvens de dia, morros ao fundo, uma colina à esquerda com a escola/estúdio (corpo de
    tijolo claro, telhado triangular, janela redonda no frontão com a letra "i", 6 janelas em 2
    fileiras de 3 e uma porta), grama em primeiro plano com tufos.
  - Capivara deitada de lado na grama, à direita da escola: corpo oval marrom (#9b6b43, sombra
    #7a5232), cabeça grande e retangular de focinho rombudo, orelhinhas redondas, olho pequeno,
    narina, patas dobradas. Nada de rabo comprido nem orelhas pontudas.
  - As cores da terra, da escola e da capivara também são variáveis por tema (mais frias e escuras
    à noite).
- Interruptor: <button role="switch">, trilho 84x44 px, bolinha de 36 px. Dentro da bolinha um
  sol (disco + 8 raios) na cor do acento; à noite a bolinha desliza para a direita, os raios
  encolhem e giram 90° e um disco recortador na cor da bolinha entra pelo canto e transforma o
  disco em lua crescente.

Movimento (um relógio único, tempo t em ms a partir do clique; para ir ao dia o mesmo roteiro
roda ao contrário, exceto onde indicado):
1. Entrada: nada se mexe sozinho além do sol girando os raios (1 volta a cada 60 s), as nuvens
   derivando (12 px/s) e, à noite, as estrelas cintilando. O tema inicial vem da preferência
   salva ou de prefers-color-scheme.
2. Clique / Enter / Espaço no interruptor: aria-checked inverte; a bolinha desliza em 420 ms
   (cubic-bezier .5,1.6,.4,1, um leve passe e volta); o ícone sol→lua em 420 ms.
3. Cores da página: variáveis CSS com transition de 900 ms (fundo, texto, acento, cartão, terra).
   O título e o rótulo de hora trocam por cross-fade: o antigo some em 300 ms subindo 8 px, o novo
   entra de 250 a 650 ms descendo 8 px até o lugar.
4. Céu (progresso p de 0 a 1 em 2200 ms, linear no tempo, reversível no meio): pôr do sol com
   opacidade sen(πp)·0.85; noite com opacidade suave entre p 0.15 e 0.8.
5. Arco: a roda celeste gira 180° em 1800 ms (easeInOutCubic) — o sol desce pela direita atrás dos
   morros e a lua sobe pela esquerda até onde estava o sol. Na volta ao dia a roda continua girando
   no mesmo sentido (+180°), então o sol nasce pela esquerda. Se clicar no meio, a roda volta pelo
   mesmo caminho.
6. Estrelas: cada uma aparece quando p passa de 0.25 + i·0.022 (uma a uma, ~50 ms entre elas),
   crescendo de escala 0.2 a 1; à noite cintilam (opacidade 0.6–1, período 1.8–4 s por estrela).
7. Janelas: acendem em sequência quando p passa de 0.4 + i·0.07 (~150 ms entre elas), âmbar
   #E2A23B com halo; a janela redonda é a última. Ao ir para o dia apagam na ordem inversa.
8. Capivara: indo para a noite, entre p 0.3 e 0.7 ela boceja (cabeça sobe 9°, boca abre) e entre
   p 0.65 e 0.85 as pálpebras descem e fecham; três "z" sobem devagar do focinho enquanto dorme
   (ciclo de 3 s). Indo para o dia: os olhos abrem entre p 0.6 e 0.3, e a orelha dá uma tremidinha.
9. Estado de repouso: dia = sol alto, nuvens, janelas apagadas, capivara de olhos abertos;
   noite = lua alta, estrelas, janelas âmbar acesas, capivara dormindo.
10. Modo demonstração: ao carregar (começa em até 0,5 s), um cursor fantasma (seta SVG) entra,
   vai até o interruptor em 800 ms, "clica" (encolhe a 0.85 por 120 ms + anel âmbar), espera,
   sai um pouco, volta e clica de novo: dia → noite → dia num ciclo de 7600 ms (cliques em 1000 e
   4600 ms do ciclo), em loop. Se começar de noite, o primeiro clique leva ao dia. Para (e o cursor
   some em 300 ms) na primeira interação real (pointerdown, tecla, roda, toque). Com ?demo=1 ele
   começa sempre de dia e nunca para. Os cliques do fantasma não gravam preferência.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML autocontido; só as fontes do Google.
- Um único loop requestAnimationFrame para tudo (cena, estrelas, capivara, cursor fantasma),
  pausado quando a peça sai da tela (IntersectionObserver) e com a aba oculta; o relógio não
  "pula" ao voltar.
- Animar só transform e opacity; cores só por variáveis CSS com transition.
- Nunca capturar a rolagem: nada de preventDefault em wheel/touchmove; ouvintes passivos.
- Acessível: <button role="switch" aria-checked> com rótulo visível ligado por aria-labelledby,
  foco visível (contorno 3 px na cor do acento), Enter e Espaço alternam; a cena é decorativa
  (aria-hidden); o texto trocado fica num aria-live="polite".
- prefers-reduced-motion: reduce → a troca é instantânea: sem transições de cor, sem arco
  (sol/lua já na posição final), estrelas e janelas aparecem todas de uma vez, sem bocejo, sem
  cintilar, sem nuvens andando; o cursor fantasma não aparece (só com ?demo=1, e aí os cliques
  continuam instantâneos).
- Começa respeitando prefers-color-scheme; a escolha real da pessoa é salva em localStorage
  (dentro de try/catch) e vence a preferência do sistema.
- Funciona em 360 px de largura e embutido num <iframe> 16:9, sem rolagem horizontal.
- Nada de alert, confirm ou prompt.
```
