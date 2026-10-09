# Galeria giro

Um anel 3D com 12 projetos INEMA que gira com o arraste, reflete no chão e abre o cartão da frente em destaque.

## Prompt

```text
Construa uma galeria de projetos em forma de anel 3D: 12 cartões em volta de um cilindro, sob
um foco de luz, refletidos num chão escuro. A pessoa arrasta para girar, solta com impulso e o
anel para no cartão mais próximo; clicar no cartão da frente abre o projeto em destaque.

Aparência:
- Fundo #0b0b0d com um leve degradê radial #141418 no alto. Texto #f3efe7, acento #E2A23B.
- Tipografia (Google Fonts): título grande Sora 200; títulos menores Sora 600; corpo Inter;
  rótulos JetBrains Mono 500, 11 px, caixa alta, espaçamento 0.14em.
- Ocupa 100% da viewport. Atmosfera: um cone de luz vindo do alto (degradê creme para âmbar
  transparente, recortado em trapézio e desfocado), 22 grãos de poeira dentro da luz, um brilho
  âmbar suave no chão, vinheta escura nas bordas e grão de filme (ruído SVG estático, 9%).
- 12 cartões 16:10, cantos 10 px, contorno interno de 1 px claro, sombra. Largura: 20% da tela
  (42% no celular), entre 120 e 300 px. Cada cartão tem uma arte feita só em código: degradê
  de duas cores da paleta (#E2A23B, #F2C76E, #C9821F, #f3efe7, #7cc4e8, #E86A4A, #b69cff) e um
  motivo em SVG (círculos concêntricos, pontos, ondas, listras, órbita ou barras), a inicial
  do projeto gigante em Sora 800, o número e a categoria em mono, o nome em Sora 600.
- Projetos (nome, frase): Ata, Filmarca, Cardshorts, Motion Lab, Arena da Capivara,
  Atende Clínica, INEMA Mods, Mentor, Carisma, Docflow, Publica, Agent Runtime.
- Cada cartão tem o reflexo logo abaixo (a mesma arte em scaleY(-1), opacidade 32%, máscara
  em degradê que some em 55%).
- Topo: "INEMA · galeria de projetos" à esquerda e a dica "arraste · setas · role de lado" à
  direita. Base esquerda: "Projetos 2026" grande (2026 em âmbar). Base direita: título e frase
  do cartão da frente e o contador "03 / 12" (número em âmbar).

Movimento:
1. Anel em CSS 3D: perspectiva = 2,2 x raio; o anel fica em translateZ(-raio) rotateX(-9,5°)
   rotateY(ângulo), então a fileira de trás aparece por cima. Cada cartão em
   rotateY(i x 30°) translateZ(raio), com raio = largura / (2 tan 15°) x 1,12. O ângulo do anel
   é um valor só, guiado por mola (k 38, d 11,5).
2. Por cartão, a cada quadro: escurece com o ângulo até 80% (camada preta por opacidade), uma
   faixa de brilho desliza por translateX conforme o ângulo, e o cartão da frente sobe 7% da
   altura. O título e o contador trocam quando muda o cartão da frente; o número rola de baixo
   para cima em 320 ms.
3. Arraste 1:1 (mouse e toque): o deslocamento em px vira graus pelo comprimento do arco.
   Ao soltar, mede a velocidade dos últimos 100 ms, projeta 0,32 s à frente e mira o cartão
   mais próximo desse ponto; a mola leva até lá.
4. Clique no cartão da frente: FLIP. Mede o retângulo do cartão, posiciona o quadro de
   destaque já no tamanho final (70% do palco) e anima de "transformado para caber no cartão"
   até o lugar com mola (k 150, d 21). Atrás, o anel encolhe para 86% e fica 60% mais
   apagado, uma cópia borrada da arte aparece por opacidade, e o nome, o "2026 · categoria" e
   o botão "Ver projeto ↗" sobem 18 px até o lugar. Esc ou o botão ✕ fecham pelo mesmo
   caminho de volta. Clique num cartão que não está na frente: o anel gira até ele.
5. Modo demonstração: até alguém tocar, o anel avança um cartão a cada 2,4 s (três vezes), um
   cursor fantasma entra, agarra o anel e dá um arremesso para a esquerda, depois clica no
   cartão da frente, que fica aberto 2 s e fecha; repete. Para na primeira interação real;
   com ?demo=1 nunca para.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML; só as fontes do Google.
- Um único requestAnimationFrame (molas com 4 subpassos por quadro), pausado fora da tela
  (IntersectionObserver) e com a aba oculta.
- Animar só transform e opacity.
- Nunca capturar a rolagem: a roda vertical rola a página normalmente; a roda horizontal gira
  o anel só com o mouse em cima, com ouvinte passivo (sem preventDefault). No toque,
  touch-action: pan-y.
- Acessível: cada cartão é um <button> com nome e posição; focar um cartão gira até ele; com a
  galeria em foco, setas giram e Enter abre; foco volta ao cartão ao fechar; foco visível
  em âmbar.
- prefers-reduced-motion (ou ?motion=off): anel parado no primeiro cartão, sem demonstração;
  as ações mudam o estado na hora, sem mola.
- Raio-X: data-xray="o que é · como se move" e data-xray-tool="code" em tudo que se move;
  ?motion=xray desenha contorno tracejado âmbar e etiqueta.
- Sem rolagem horizontal em 360 px (o palco tem overflow hidden).
```
