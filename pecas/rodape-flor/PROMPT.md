# Rodapé flor

Um rodapé de inscrição em que cada letra digitada no e-mail faz nascer uma flor no jardim, e a inscrição solta pétalas e borboletas.

## Prompt

```text
Construa um rodapé de inscrição de novidades em que cada letra digitada no campo de e-mail faz
nascer uma flor num jardim na parte de baixo. Apagar uma letra recolhe a última flor. Ao se
inscrever, o jardim festeja e depois o campo se apaga sozinho, levando as flores junto.

Aparência:
- Fundo #111114 com borda de cima #24242a e grão de papel (ruído SVG estático, 7%). Texto
  #f3efe7, texto secundário a 62%, acento âmbar #E2A23B.
- Tipografia (Google Fonts): título Sora 800; botão Sora 600; corpo Inter; rótulos JetBrains
  Mono 500, 11 px, caixa alta.
- Topo (cerca de 55% da altura), duas colunas: à esquerda o rótulo "Novidades · INEMA.CLUB",
  o título "Plante uma ideia." (ponto em âmbar), uma linha de apoio e o formulário: campo com
  só a linha de baixo (rótulo "Seu e-mail") e o botão pílula âmbar "Quero receber", com uma
  segunda pílula coral #E86A4A deslocada 3 px por trás, como impressão fora de registro.
  À direita, três colunas de links: Aprender (Cursos, Buscas, Guias), Ao vivo (Lives, Áreas,
  Notícias), Junto (VIP, PRO, Kits).
- Jardim embaixo (no mínimo 38% da altura): um chão com linha verde #6f8f4e e solo de
  pontinhos âmbar em meio-tom. Barra final escura com "© 2026 INEMA.CLUB · conteúdo aberto e
  gratuito".
- Flores em SVG, cinco espécies escolhidas pelo código da letra: margarida (11 pétalas
  creme, miolo âmbar), tulipa (cálice coral), papoula (5 pétalas âmbar e dourado, miolo
  escuro), campânula (sino azul #7cc4e8 virado para baixo) e pompom (bolinhas douradas).
  Haste verde levemente curva, duas folhas #85a85a. Altura entre 38% e 82% do jardim,
  inclinação própria de até 8°. Posição horizontal pela sequência áurea (sem amontoar).
- Celular: uma coluna, links em três colunas pequenas, sem a linha de apoio.

Movimento:
1. Cada tecla faz nascer uma flor com molas separadas: a haste sobe da base (scaleY,
   k 90, d 14, cerca de 0,5 s), as folhas abrem aos 220 ms (k 150, d 12), o botão incha aos
   320 ms (k 150, d 10) e as pétalas abrem aos 480 ms passando do tamanho e voltando
   (k 150, d 8,5). A cabeça sobe junto com a haste.
2. Backspace: a flor mais nova recolhe para dentro da terra (todas as molas para zero) e sai.
3. Balanço: cada flor gira na base com mola (k 40, d 5) em direção a uma brisa lenta (duas
   senoides, cerca de 3°), a uma rajada que atravessa o jardim a cada 6 a 9 s (até 14°, queda
   gaussiana de 90 px) e ao empurrão do ponteiro: a velocidade horizontal do mouse vira
   impulso, com queda gaussiana de 140 px. Limite de 38°.
4. Inscrição: todas as pétalas crescem 28% e voltam (900 ms), uma rajada varre da esquerda
   para a direita, 16 pétalas soltas e 3 borboletas (asas batendo por scaleX) sobem e somem,
   o rótulo do botão rola para "Inscrito ✓" e aparece o aviso "Pronto! Exemplo de rodapé:
   nenhum e-mail foi enviado." Depois de 4 s o campo se apaga da direita para a esquerda
   (uma letra a cada 60 ms) e as flores recolhem junto; o rótulo volta.
5. Modo demonstração: até alguém digitar ou mexer o mouse, um cursor fantasma digita
   "voce@inema.club" (110 ms por letra, com cursor de texto piscando desenhado à parte),
   clica em "Quero receber" e repete depois da festa. Ao parar, o campo é limpo. Com ?demo=1
   nunca para.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML; só as fontes do Google.
- Um único requestAnimationFrame (molas com 4 subpassos), pausado fora da tela
  (IntersectionObserver) e com a aba oculta.
- Animar só transform e opacity (atributo transform no SVG: translate, rotate, scale).
- Nunca capturar a rolagem; ouvintes passivos; no jardim, touch-action: pan-y.
- Acessível: <form>, <label for>, <input type="email">, <button type="submit"> e links reais,
  foco visível em âmbar; o jardim é decorativo (aria-hidden); o aviso fica em aria-live.
  O formulário é demonstrativo: não envia nada e diz isso.
- prefers-reduced-motion (ou ?motion=off): jardim pronto e parado com 16 flores abertas (10 no
  celular), sem vento e sem fantasma; digitar acrescenta flores já abertas.
- Raio-X: data-xray="o que é · como se move" e data-xray-tool="code" em cada flor, pétala
  solta, borboleta e no botão; ?motion=xray desenha contorno tracejado âmbar e etiqueta.
- Sem rolagem horizontal em 360 px.
```
