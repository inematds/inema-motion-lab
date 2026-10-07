# INEMA Motion Lab

[![INEMA Motion Lab](guia/assets/banner-en.jpg)](https://inematds.github.io/inema-motion-lab/guia/en/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## What it is

INEMA Motion Lab teaches you how to ask an AI (Claude, Codex or another one) for website animations and get something with a professional finish, not a generic effect. It brings a three-part prompt template (appearance, motion and rules) and five real examples made with it: a ⌘K search, a features grid, a playable 404 page, a footer with falling letters and a day/night theme button. Each piece is a single HTML file that you open in the browser and paste into your site, and it comes with the prompt that generated it and a short video. It is for anyone who builds pages, guides or courses and wants motion without relying on a heavy library.

## 📖 How-to guide

Full guide (landing + step by step, with the pieces live): **https://inematds.github.io/inema-motion-lab/guia/en/**

## Contents

| Folder | What it has |
|---|---|
| `molde/MOLDE-PROMPT-ANIMACAO.md` | The prompt template: appearance, numbered motion, technical rules |
| `pecas/<name>/PROMPT.md` | The prompt for each piece, written with the template (in Portuguese) |
| `pecas/<name>/index.html` | The finished piece, a single file |
| `videos/` | 8 s demo of each piece (WebM, MP4 and cover image) |
| `tools/testar-pecas.cjs` | Tests every piece in the browser (errors, 360 px, reduced motion, scrolling) |
| `tools/gravar-videos.cjs` | Records the demo mode (`?demo=1`) of each piece |

The five pieces: `busca-cmdk`, `bento-glide`, `404-corre`, `rodape-inema`, `dia-noite`.

## Quick start

```bash
git clone https://github.com/inematds/inema-motion-lab && cd inema-motion-lab
python3 -m http.server 8850 --directory . --bind 127.0.0.1
# open http://127.0.0.1:8850/pecas/busca-cmdk/   (add ?demo=1 so the demo never stops)

# test and record (Node 18+, playwright and ffmpeg)
node tools/testar-pecas.cjs 8850
node tools/gravar-videos.cjs 8850
```

## Credits

Ideas inspired by popular effects from the community; prompts and code written from scratch for INEMA.
Open and free content from [INEMA.CLUB](https://inema.club).
