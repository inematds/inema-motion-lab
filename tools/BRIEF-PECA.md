# Brief para construir uma peça nova do INEMA Motion Lab

Você constrói peças interativas (um `index.html` autocontido + um `PROMPT.md`) em
`~/projetos/inema-motion-lab/pecas/<nome>/`.

## Leia antes (nesta ordem)
1. `molde/MOLDE-PROMPT-ANIMACAO.md` — o formato do prompt (Aparência / Movimento / Regras).
2. Uma peça pronta como modelo de qualidade e de estrutura: `pecas/dia-noite/index.html` e `pecas/dia-noite/PROMPT.md`
   (veja também `pecas/rodape-inema/` se a sua peça for um rodapé).
3. A ideia da peça (uma frase do que ela faz e como a pessoa interage), escrita por quem pede a peça.
   Escreva o seu próprio prompt e o seu próprio código, em PT-BR, com conteúdo INEMA.

## Regras obrigatórias
- Um arquivo `index.html`, sem build, JS puro + CSS (Google Fonts permitido). Identidade INEMA:
  fundo escuro `#0b0b0d`/`#111114`, texto `#f3efe7`, acento âmbar `#E2A23B`, fontes Sora (títulos),
  Inter (corpo), JetBrains Mono (rótulos). Conteúdo sobre o ecossistema INEMA (INEMA.CLUB, cursos gratuitos,
  eventos/lives, buscas, comunidade VIP, INEMA.PRO, vídeos, kits) — textos curtos, sem travessão (—), sem "incrível/revolucionário".
- Um único `requestAnimationFrame`, pausado fora da tela (IntersectionObserver). Animar só transform/opacity.
- Nunca capturar a rolagem da página. Acessível (button/a/input reais, foco visível, teclado = mouse).
- `prefers-reduced-motion`: estado final parado.
- `?demo=1`: modo demonstração (cursor fantasma ou auto-play da interação) para gravação.
- **Raio-X:** todo elemento que se move recebe `data-xray="o que é · como se move"` e `data-xray-tool="code"`.
  Com `?motion=xray` a peça desenha um contorno tracejado âmbar e a etiqueta do `data-xray` sobre cada elemento;
  com `?motion=off` fica parada no estado final. (Pode ser um bloco pequeno de CSS/JS no fim do arquivo.)
- Sem rolagem horizontal em 360 px; funciona em 1280×720 e 360×740.
- `PROMPT.md`: título, uma frase do que é, e o prompt completo no formato do molde (é ele que ensina a pessoa a refazer).
- Nada de referência à origem da ideia (nenhum nome de pessoa, comunidade, ferramenta de terceiro ou link) nos arquivos.

## Teste (obrigatório antes de dizer que terminou)
```bash
cd ~/projetos/inema-motion-lab
# servidor próprio: escolha uma porta livre, ABORTE se ocupada, mate só o seu PID no fim
P=<porta>; ss -ltn | grep -q ":$P " && { echo ocupada; exit 1; }
python3 -m http.server $P --bind 127.0.0.1 --directory ~/projetos/inema-motion-lab >/dev/null 2>&1 & SRV=$!
PECAS=<nome1,nome2> PLAYWRIGHT_DIR=~/projetos/agent-browser node tools/testar-pecas.cjs $P
kill $SRV
```
Também tire um screenshot de cada peça (1280×720, `?demo=1`, após ~2,5 s) e OLHE a imagem: corrija o que estiver feio,
cortado ou vazio. Repita até `OK` em todas as suas peças.

## Relatório final (curto)
Para cada peça: nome da pasta, passou no 1º teste? (sim/não), nº de rodadas de correção, o que corrigiu,
e uma frase honesta sobre a qualidade visual.
