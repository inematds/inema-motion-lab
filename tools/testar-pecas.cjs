#!/usr/bin/env node
// Testa todas as peças: sem erro de JS, sem rolagem horizontal (1280 e 360 px),
// movimento reduzido renderiza, e nenhuma peça bloqueia a rolagem da página (wheel no document).
// Uso: PLAYWRIGHT_DIR=<pasta com node_modules/playwright> node tools/testar-pecas.cjs [porta]
const path = require('path');
const fs = require('fs');

const raiz = path.resolve(__dirname, '..');
const pw = require(path.join(process.env.PLAYWRIGHT_DIR || raiz, 'node_modules', 'playwright'));
const porta = Number(process.argv[2]) || 8850;
// PECAS=a,b limita o teste a essas peças (útil quando várias são feitas ao mesmo tempo).
const so = (process.env.PECAS || '').split(',').filter(Boolean);
const pecas = fs.readdirSync(path.join(raiz, 'pecas'))
  .filter(p => fs.existsSync(path.join(raiz, 'pecas', p, 'index.html')))
  .filter(p => !so.length || so.includes(p));

// Registra se alguém chama preventDefault num wheel/touchmove que chega ao document.
const espiao = () => {
  window.__bloqueios = 0;
  const orig = Event.prototype.preventDefault;
  Event.prototype.preventDefault = function () {
    if ((this.type === 'wheel' || this.type === 'touchmove') && (this.currentTarget === document || this.currentTarget === window || this.currentTarget === document.body)) window.__bloqueios++;
    return orig.call(this);
  };
};

(async () => {
  const browser = await pw.chromium.launch();
  let falhas = 0;
  try {
    for (const p of pecas) {
      const url = `http://127.0.0.1:${porta}/pecas/${p}/index.html`;
      const problemas = [];
      for (const [w, h, reduz] of [[1280, 720, false], [360, 740, false], [1280, 720, true]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduz ? 'reduce' : 'no-preference' });
        await ctx.addInitScript(espiao);
        const page = await ctx.newPage();
        const erros = [];
        page.on('pageerror', e => erros.push(e.message));
        page.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);
        await page.mouse.move(w / 2, h / 2);
        await page.mouse.wheel(0, 300);
        await page.waitForTimeout(300);
        const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, b: window.__bloqueios, txt: document.body.innerText.trim().length }));
        const tag = `${w}px${reduz ? ' reduzido' : ''}`;
        if (erros.length) problemas.push(`${tag}: erro JS ${erros[0]}`);
        if (r.sw > r.iw) problemas.push(`${tag}: rolagem horizontal ${r.sw}>${r.iw}`);
        if (r.b) problemas.push(`${tag}: bloqueou rolagem ${r.b}x`);
        if (!r.txt) problemas.push(`${tag}: página sem texto`);
        await ctx.close();
      }
      if (problemas.length) { falhas++; console.log(`FALHA ${p}\n  - ${problemas.join('\n  - ')}`); }
      else console.log(`OK ${p}`);
    }
  } finally {
    await browser.close();
  }
  console.log(`${pecas.length - falhas}/${pecas.length} peças OK`);
  process.exit(falhas ? 1 : 0);
})();
