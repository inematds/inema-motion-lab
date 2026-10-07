# INEMA Motion Lab

[![INEMA Motion Lab](guia/assets/banner.jpg)](https://inematds.github.io/inema-motion-lab/guia/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## O que é

O INEMA Motion Lab ensina a pedir animações de site para uma IA (Claude, Codex ou outra) e receber algo com acabamento profissional, não um efeito genérico. Ele traz um molde de prompt em três partes (aparência, movimento e regras) e cinco exemplos reais feitos com ele: uma busca ⌘K, uma grade de recursos, uma página 404 jogável, um rodapé com letras que caem e um botão de tema dia/noite. Cada peça é um único arquivo HTML que você abre no navegador e cola no seu site, e vem com o prompt que a gerou e um vídeo curto. Serve para quem faz páginas, guias ou cursos e quer movimento sem depender de biblioteca pesada.

## 📖 Guia de uso

Guia completo (landing + passo a passo, com as peças ao vivo): **https://inematds.github.io/inema-motion-lab/guia/**

## Conteúdo

| Pasta | O que tem |
|---|---|
| `molde/MOLDE-PROMPT-ANIMACAO.md` | O molde de prompt: aparência, movimento numerado, regras técnicas |
| `pecas/<nome>/PROMPT.md` | O prompt de cada peça, escrito com o molde |
| `pecas/<nome>/index.html` | A peça pronta, um arquivo só |
| `videos/` | Demonstração de 8 s de cada peça (WebM, MP4 e imagem de capa) |
| `tools/testar-pecas.cjs` | Testa todas as peças no navegador (erros, 360 px, movimento reduzido, rolagem) |
| `tools/gravar-videos.cjs` | Grava o modo demonstração (`?demo=1`) de cada peça |

As cinco peças: `busca-cmdk`, `bento-glide`, `404-corre`, `rodape-inema`, `dia-noite`.

## Uso rápido

```bash
git clone https://github.com/inematds/inema-motion-lab && cd inema-motion-lab
python3 -m http.server 8850 --directory . --bind 127.0.0.1
# abra http://127.0.0.1:8850/pecas/busca-cmdk/   (acrescente ?demo=1 para a demonstração não parar)

# testar e gravar (Node 18+, playwright e ffmpeg)
node tools/testar-pecas.cjs 8850
node tools/gravar-videos.cjs 8850
```

## Créditos

Ideias inspiradas em efeitos populares da comunidade; prompts e código escritos do zero para o INEMA.
Conteúdo aberto e gratuito do [INEMA.CLUB](https://inema.club).
