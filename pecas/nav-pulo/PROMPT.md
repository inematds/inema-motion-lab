# Navegação com pulo

Barra de navegação em estilo adesivo em que uma capivara mora em cima da aba ativa e pula em arco até a aba que você clicar, enquanto a pílula âmbar estica atrás dela e o título troca letra por letra.

## Prompt

```text
Construa uma barra de navegação de site com quatro abas (Cursos, Lives, Buscas, VIP) em que uma
pequena capivara fica sentada em cima da aba ativa; ao clicar em outra aba ela agacha, pula em arco
até lá e pousa amassando, a pílula âmbar da aba ativa desliza esticando como elástico, e o título
grande abaixo troca letra por letra.

Aparência:
- Página #0b0b0d com um brilho radial âmbar muito fraco (8%) atrás da barra. Texto #f3efe7,
  texto secundário #f3efe7 a 62%, acento #E2A23B.
- Fontes Google: títulos Sora 700; corpo Inter 400/600; rótulos JetBrains Mono 500, 12 px, caixa alta,
  espaçamento 0.14em.
- Layout centralizado, ocupando 100% da tela sem rolagem: rótulo "INEMA.CLUB · NAVEGAÇÃO" em âmbar;
  86 px de espaço para a capivara; a barra; o título (clamp 2.1–4.6 rem, espaçamento -0.035em, ponto
  final âmbar); uma frase de apoio (Inter, 62%); e a dica mono "Clique numa aba ou use as setas ← →" a 40%.
- Barra estilo adesivo: fundo #111114, contorno 2.5 px #f3efe7, raio total, sombra dura 5px 5px 0 #E2A23B
  (sem desfoque), 5 px de respiro interno. Abas: botões Inter 600 17 px, 15x26 px de preenchimento
  (13.5 px e 12x13 px abaixo de 520 px de largura, para caber em 360 px).
- Pílula ativa: âmbar #E2A23B com contorno 2.5 px #0b0b0d; o texto da aba ativa fica #0b0b0d.
  Monte a pílula com três peças para nunca deformar as pontas: duas meias-luas (um círculo de
  altura H dentro de uma caixa de H/2 com overflow hidden) e um miolo retangular com borda só em
  cima e embaixo, esticado com scaleX.
- Capivara em SVG, 88x80 px (70x64 no celular), vista de lado olhando para a direita: corpo oval
  #9b6b43 com reflexo #b48459, cabeça retangular arredondada de focinho rombudo #7a5232, orelhinha
  redonda, olho pequeno com brilho, narina, quatro patinhas curtas, um lenço âmbar no pescoço e um
  bracinho que gira no ombro. Sem rabo comprido e sem orelha pontuda.
- Conteúdo de cada aba (título · frase):
  Cursos gratuitos · Trilhas curtas para aprender IA do zero, no seu ritmo.
  Lives toda semana · Ao vivo, com perguntas, gravação e material de apoio.
  Ache em segundos · Busque aulas, guias e kits em todo o INEMA.
  Comunidade VIP · Grupo fechado no Telegram para quem quer ir mais fundo.

Movimento:
1. Entrada: a capivara já está sentada na aba Cursos, respirando (escala vertical ±1.8%, período
   ~3.3 s) e piscando a cada 2.2–4.8 s. O título aparece parado.
2. Clique numa aba (ou setas ← → / Home / End com a barra em foco): a capivara agacha 100 ms
   (achata 18%), depois pula em arco até o centro da aba nova. Duração do voo 300 ms + 0.55 ms por
   pixel de distância (entre 340 e 640 ms); altura 30 px + 0.16 x distância (entre 34 e 84 px).
   No ar ela vira para o lado da viagem, inclina até 15° (nariz para cima na subida, para baixo na
   descida) e encolhe as patas pela metade.
3. Pouso: amassa 24% e volta numa mola (rigidez 380, amortecimento 14), com um quique visível.
4. Pílula: as duas bordas seguem molas separadas. A borda da frente é dura (rigidez 520,
   amortecimento 34) e a de trás é mole (rigidez 170, amortecimento 20), então a pílula estica
   durante a viagem e encolhe firme ao chegar. Ao inverter o sentido, as durezas trocam de borda.
5. Passar o mouse (ou focar) numa aba que não é a ativa: a capivara vira para ela e levanta o
   bracinho apontando (mola rigidez 300, amortecimento 24); ao sair, o braço desce.
6. Título: as letras antigas saem rolando para cima (360 ms, 12 ms entre letras) e as novas sobem
   de baixo, uma a uma com 22 ms entre elas, com um leve passe e volta (cubic-bezier .3,1.65,.5,1;
   560 ms). Cada letra rola dentro da própria máscara. A frase de apoio troca por cross-fade com
   6 px de deslocamento.
7. Repouso: capivara sentada na aba ativa, pílula justa, título parado.
8. Modo demonstração: ao carregar, um cursor fantasma visita a próxima aba a cada 2300 ms
   (700 ms de viagem; a capivara aponta para ela pouco antes), clica (encolhe a 85% + anel âmbar)
   e a capivara pula. Em loop. Para, e o cursor some em 300 ms, na primeira interação real
   (pointerdown, tecla, roda, toque). Com ?demo=1 nunca para.

Regras:
- JavaScript puro e CSS, sem biblioteca; um único arquivo HTML.
- Um único loop requestAnimationFrame (molas, pulo, braço, piscar, cursor fantasma), pausado fora
  da tela (IntersectionObserver) e com a aba oculta.
- Animar só transform e opacity (a troca do título usa transition de transform).
- Nunca capturar a rolagem; as setas só funcionam com o foco dentro da barra.
- Acessível: <nav> com <button> reais, aria-current="page" na ativa, foco visível (3 px âmbar),
  o título novo é anunciado num aria-live="polite"; a capivara é decorativa (aria-hidden).
- prefers-reduced-motion: sem pulo e sem molas: a capivara e a pílula vão direto para a aba nova,
  o título troca na hora; estado final = capivara sentada na aba ativa.
- ?motion=off: igual ao movimento reduzido. ?motion=xray: contorno tracejado âmbar e etiqueta
  sobre cada elemento animado (capivara, pílula, título), lidos de data-xray.
- Sem rolagem horizontal em 360 px.
```
