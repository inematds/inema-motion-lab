# Rodapé mapa

Um rodapé com três cartões das comunidades INEMA por idioma, com a hora local real, e um mapa ilustrado onde uma capivara caminha pelas ruas até o ponto escolhido.

## Prompt

```text
Construa um rodapé com dois lados: à esquerda, três cartões das comunidades INEMA por idioma,
cada um com a hora local ao vivo; à direita, um mapa de cidade ilustrado e vivo. Ao escolher um
cartão, o pino daquele ponto cai no mapa e uma capivara caminha pelo caminho mais curto das ruas
até lá, com a câmera acompanhando.

Aparência:
- Fundo #111114, borda de cima #24242a. Texto #f3efe7, secundário a 60%, acento #E2A23B.
- Tipografia (Google Fonts): marca Sora 800; cidades Sora 600; corpo Inter; horas, rótulos e
  nomes no mapa JetBrains Mono 500, caixa alta nos rótulos.
- Layout em duas colunas (38% / 62%); no celular (até 800 px) uma coluna, mapa embaixo com
  no mínimo 280 px.
- Esquerda: rótulo "Comunidade · três idiomas", a marca "INEMA." gigante (ponto em âmbar),
  uma linha de apoio, três cartões e o rodapé (inema.club, Lives · Buscas · VIP, ©).
  Cartões (botões): cidade, "Cursos em português/espanhol/inglês", hora local HH:MM, deslocamento
  UTC e um selo "dia" (âmbar) ou "noite" (azul #9fb4ff). Cidades: São Paulo
  (America/Sao_Paulo), Cidade do México (America/Mexico_City), Nova York (America/New_York).
  Uma placa #1c1c21 com filete âmbar à esquerda fica atrás do cartão ativo.
- Direita: mapa em SVG (viewBox 1000 x 700, slice), cantos de 22 px, grão estático por cima.
  Ruas #34343c (o fundo do mapa), quadras #1b1b20 com borda #141417 e 2 a 4 telhados por
  quadra (#24242b / #2b2b33, alguns com janelinhas âmbar), três parques #1d3326 com árvores,
  um rio curvo #1d3a52 com margem #264a66 e duas pontes, uma avenida diagonal. Nomes mono
  pequenos: "AV. DOS CURSOS", "RUA DAS LIVES", "PRAÇA VIP", "RIO", "BUSCAS".
  Pinos âmbar com contorno #0b0b0d e o nome da cidade em cima. Legenda "mapa ilustrativo ·
  arraste para mover".
- A capivara é um ícone pequeno em SVG (corpo, cabeça de focinho rombudo, orelha, olho).

Movimento:
1. Passar o mouse, tocar ou focar um cartão: a placa desliza até ele; o pino daquele ponto cai
   de 70 px acima com mola (k 260, d 15), amassa ao bater (scale proporcional à velocidade) e
   solta uma onda (círculo de scale 0,6 a 3,2 com opacidade caindo em 800 ms).
2. A capivara calcula o caminho mais curto pelo grafo das ruas (Dijkstra: cruzamentos são nós,
   o rio só se atravessa pelas pontes) e anda a 230 unidades por segundo com easeInOut no
   trajeto todo, pulando 9 px em cada esquina e virando para o lado em que anda. Uma rota
   tracejada âmbar mostra o caminho e some ao chegar. Na chegada ela acena e um balão "oi!"
   aparece por 1,8 s.
3. Câmera (translate + scale no grupo do mapa) com molas criticamente amortecidas (k 24):
   enquadra capivara e destino juntos (zoom entre 1 e 1,35) e aproxima um pouco no último 20%
   do trajeto. Nunca mostra fora do mapa.
4. O mapa vive: quatro carros dão a volta nos quarteirões, um barco sobe e desce o rio, três
   sombras de nuvem atravessam devagar.
5. Arrastar o mapa move a câmera e solta com inércia (decai em menos de 1 s); setas fazem o
   mesmo com o mapa em foco. Escolher um cartão devolve a câmera ao modo automático.
6. Modo demonstração: até alguém tocar, um cursor fantasma vai até o próximo cartão e clica a
   cada 4,6 s, passeando pelos três pontos. Com ?demo=1 nunca para.

Regras:
- JavaScript puro e CSS, sem biblioteca, sem mapa externo (tudo desenhado em SVG por código);
  um único arquivo HTML; só as fontes do Google.
- A cidade fixa é desenhada uma vez; só as camadas vivas mudam a cada quadro.
- Um único requestAnimationFrame, pausado fora da tela (IntersectionObserver) e com a aba
  oculta.
- Animar só transform e opacity.
- Horas reais por Intl.DateTimeFormat com timeZone; deslocamento por timeZoneName
  "shortOffset"; tudo dentro de try/catch.
- Nunca capturar a rolagem: nada de preventDefault em wheel/touchmove; no mapa,
  touch-action: pan-y.
- Acessível: cartões são <button aria-pressed>, o mapa tem tabindex e rótulo, foco visível em
  âmbar; links reais no rodapé.
- prefers-reduced-motion (ou ?motion=off): sem caminhada nem molas; o pino e a capivara já
  aparecem no destino e a câmera pula para ele; carros e nuvens parados.
- Raio-X: data-xray="o que é · como se move" e data-xray-tool="code" em câmera, pinos, carros,
  barco, nuvens, rota, capivara e placa; ?motion=xray desenha contorno tracejado e etiqueta.
- Sem rolagem horizontal em 360 px.
```
