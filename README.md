# INEMA Motion Lab

[![INEMA Motion Lab](guia/assets/banner.jpg)](https://inematds.github.io/inema-motion-lab/guia/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## O que é

O INEMA Motion Lab ensina a pedir animações de site para uma IA (Claude, Codex ou outra) e receber algo com acabamento profissional, não um efeito genérico. Ele traz um molde de prompt em três partes (aparência, movimento e regras) e vinte exemplos reais feitos com ele: buscas e menus, rodapés, galerias, botões, uma página 404 jogável, uma tela de carregamento e um botão de tema dia/noite, todos com Raio-X e modo `?motion=off`. Cada peça é um único arquivo HTML que você abre no navegador e cola no seu site, e vem com o prompt que a gerou e um vídeo curto. Serve para quem faz páginas, guias ou cursos e quer movimento sem depender de biblioteca pesada.

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

## As 20 peças

Cada peça tem `index.html` e `PROMPT.md`, e aceita `?demo=1` (demonstração contínua), `?motion=xray` (Raio-X: etiqueta o que se move) e `?motion=off` (tudo parado no estado final).

**Busca e navegação**

| Peça | Link |
|---|---|
| Busca ⌘K | [`pecas/busca-cmdk/`](pecas/busca-cmdk/index.html) |
| Navegação com pulo | [`pecas/nav-pulo/`](pecas/nav-pulo/index.html) |
| Menu que se transforma | [`pecas/menu-morfo/`](pecas/menu-morfo/index.html) |
| Menu em tela cheia | [`pecas/menu-tela-cheia/`](pecas/menu-tela-cheia/index.html) |
| Dock líquido | [`pecas/dock-liquido/`](pecas/dock-liquido/index.html) |

**Rodapés**

| Peça | Link |
|---|---|
| Rodapé INEMA com física | [`pecas/rodape-inema/`](pecas/rodape-inema/index.html) |
| Rodapé cortina | [`pecas/rodape-cortina/`](pecas/rodape-cortina/index.html) |
| Rodapé flor | [`pecas/rodape-flor/`](pecas/rodape-flor/index.html) |
| Rodapé mapa | [`pecas/rodape-mapa/`](pecas/rodape-mapa/index.html) |
| Rodapé quebra | [`pecas/rodape-quebra/`](pecas/rodape-quebra/index.html) |

**Galerias e imagens**

| Peça | Link |
|---|---|
| Grade bento com moldura que desliza | [`pecas/bento-glide/`](pecas/bento-glide/index.html) |
| Galeria giro | [`pecas/galeria-giro/`](pecas/galeria-giro/index.html) |
| Rastro de imagens | [`pecas/rastro-imagens/`](pecas/rastro-imagens/index.html) |
| Adesivo holográfico | [`pecas/adesivo-holo/`](pecas/adesivo-holo/index.html) |

**Botões e detalhes**

| Peça | Link |
|---|---|
| Botões de geleia | [`pecas/botoes-geleia/`](pecas/botoes-geleia/index.html) |
| Cursor amigo | [`pecas/cursor-amigo/`](pecas/cursor-amigo/index.html) |
| Faixa flap | [`pecas/faixa-flap/`](pecas/faixa-flap/index.html) |
| Dia e noite | [`pecas/dia-noite/`](pecas/dia-noite/index.html) |

**Páginas especiais**

| Peça | Link |
|---|---|
| 404 que vira jogo | [`pecas/404-corre/`](pecas/404-corre/index.html) |
| Revela carga | [`pecas/revela-carga/`](pecas/revela-carga/index.html) |

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

Prompts e código escritos do zero para o INEMA.
Conteúdo aberto e gratuito do [INEMA.CLUB](https://inema.club).
