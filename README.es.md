# INEMA Motion Lab

[![INEMA Motion Lab](guia/assets/banner-es.jpg)](https://inematds.github.io/inema-motion-lab/guia/es/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## Qué es

INEMA Motion Lab enseña a pedirle animaciones de sitio a una IA (Claude, Codex u otra) y recibir algo con acabado profesional, no un efecto genérico. Trae una plantilla de prompt en tres partes (apariencia, movimiento y reglas) y veinte ejemplos reales hechos con ella: búsquedas y menús, pies de página, galerías, botones, una página 404 jugable, una pantalla de carga y un botón de tema día/noche, todos con Rayos X y modo `?motion=off`. Cada pieza es un único archivo HTML que abres en el navegador y pegas en tu sitio, y viene con el prompt que la generó y un video corto. Sirve para quien hace páginas, guías o cursos y quiere movimiento sin depender de una biblioteca pesada.

## 📖 Guía de uso

Guía completa (landing + paso a paso, con las piezas en vivo): **https://inematds.github.io/inema-motion-lab/guia/es/**

## Contenido

| Carpeta | Qué contiene |
|---|---|
| `molde/MOLDE-PROMPT-ANIMACAO.md` | La plantilla de prompt: apariencia, movimiento numerado, reglas técnicas |
| `pecas/<nombre>/PROMPT.md` | El prompt de cada pieza, escrito con la plantilla (en portugués) |
| `pecas/<nombre>/index.html` | La pieza lista, en un solo archivo |
| `videos/` | Demostración de 8 s de cada pieza (WebM, MP4 e imagen de portada) |
| `tools/testar-pecas.cjs` | Prueba todas las piezas en el navegador (errores, 360 px, movimiento reducido, scroll) |
| `tools/gravar-videos.cjs` | Graba el modo demostración (`?demo=1`) de cada pieza |

## Las 20 piezas

Cada pieza tiene `index.html` y `PROMPT.md`, y acepta `?demo=1` (demostración continua), `?motion=xray` (Rayos X: etiqueta lo que se mueve) y `?motion=off` (todo quieto en el estado final).

**Búsqueda y navegación**

| Pieza | Enlace |
|---|---|
| Búsqueda ⌘K | [`pecas/busca-cmdk/`](pecas/busca-cmdk/index.html) |
| Navegación con salto | [`pecas/nav-pulo/`](pecas/nav-pulo/index.html) |
| Menú que se transforma | [`pecas/menu-morfo/`](pecas/menu-morfo/index.html) |
| Menú a pantalla completa | [`pecas/menu-tela-cheia/`](pecas/menu-tela-cheia/index.html) |
| Dock líquido | [`pecas/dock-liquido/`](pecas/dock-liquido/index.html) |

**Pies de página**

| Pieza | Enlace |
|---|---|
| Pie de página INEMA con física | [`pecas/rodape-inema/`](pecas/rodape-inema/index.html) |
| Pie de página cortina | [`pecas/rodape-cortina/`](pecas/rodape-cortina/index.html) |
| Pie de página flor | [`pecas/rodape-flor/`](pecas/rodape-flor/index.html) |
| Pie de página mapa | [`pecas/rodape-mapa/`](pecas/rodape-mapa/index.html) |
| Pie de página quiebra | [`pecas/rodape-quebra/`](pecas/rodape-quebra/index.html) |

**Galerías e imágenes**

| Pieza | Enlace |
|---|---|
| Cuadrícula bento con marco deslizante | [`pecas/bento-glide/`](pecas/bento-glide/index.html) |
| Galería giratoria | [`pecas/galeria-giro/`](pecas/galeria-giro/index.html) |
| Rastro de imágenes | [`pecas/rastro-imagens/`](pecas/rastro-imagens/index.html) |
| Adhesivo holográfico | [`pecas/adesivo-holo/`](pecas/adesivo-holo/index.html) |

**Botones y detalles**

| Pieza | Enlace |
|---|---|
| Botones de gelatina | [`pecas/botoes-geleia/`](pecas/botoes-geleia/index.html) |
| Cursor amigo | [`pecas/cursor-amigo/`](pecas/cursor-amigo/index.html) |
| Franja flap | [`pecas/faixa-flap/`](pecas/faixa-flap/index.html) |
| Día y noche | [`pecas/dia-noite/`](pecas/dia-noite/index.html) |

**Páginas especiales**

| Pieza | Enlace |
|---|---|
| 404 que se vuelve juego | [`pecas/404-corre/`](pecas/404-corre/index.html) |
| Revela carga | [`pecas/revela-carga/`](pecas/revela-carga/index.html) |

## Uso rápido

```bash
git clone https://github.com/inematds/inema-motion-lab && cd inema-motion-lab
python3 -m http.server 8850 --directory . --bind 127.0.0.1
# abre http://127.0.0.1:8850/pecas/busca-cmdk/   (agrega ?demo=1 para que la demostración no se detenga)

# probar y grabar (Node 18+, playwright y ffmpeg)
node tools/testar-pecas.cjs 8850
node tools/gravar-videos.cjs 8850
```

## Créditos

Prompts y código escritos desde cero para INEMA.
Contenido abierto y gratuito de [INEMA.CLUB](https://inema.club).
