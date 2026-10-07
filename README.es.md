# INEMA Motion Lab

[![INEMA Motion Lab](guia/assets/banner-es.jpg)](https://inematds.github.io/inema-motion-lab/guia/es/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## Qué es

INEMA Motion Lab enseña a pedirle animaciones de sitio a una IA (Claude, Codex u otra) y recibir algo con acabado profesional, no un efecto genérico. Trae una plantilla de prompt en tres partes (apariencia, movimiento y reglas) y cinco ejemplos reales hechos con ella: una búsqueda ⌘K, una cuadrícula de recursos, una página 404 jugable, un pie de página con letras que caen y un botón de tema día/noche. Cada pieza es un único archivo HTML que abres en el navegador y pegas en tu sitio, y viene con el prompt que la generó y un video corto. Sirve para quien hace páginas, guías o cursos y quiere movimiento sin depender de una biblioteca pesada.

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

Las cinco piezas: `busca-cmdk`, `bento-glide`, `404-corre`, `rodape-inema`, `dia-noite`.

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

Ideas inspiradas en efectos populares de la comunidad; prompts y código escritos desde cero para INEMA.
Contenido abierto y gratuito de [INEMA.CLUB](https://inema.club).
