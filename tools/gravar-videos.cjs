#!/usr/bin/env node
// Grava o modo demonstração (?demo=1) de cada peça em vídeo curto (WebM + MP4 + pôster JPG).
// Uso: PLAYWRIGHT_DIR=<pasta com node_modules/playwright> node tools/gravar-videos.cjs [porta] [peça...]
// Requer um servidor HTTP servindo a raiz do repo na porta (padrão 8850).
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const raiz = path.resolve(__dirname, '..');
const pw = require(path.join(process.env.PLAYWRIGHT_DIR || raiz, 'node_modules', 'playwright'));
const porta = Number(process.argv[2]) || 8850;
const todas = fs.readdirSync(path.join(raiz, 'pecas')).filter(p => fs.existsSync(path.join(raiz, 'pecas', p, 'index.html')));
const pecas = process.argv.slice(3).length ? process.argv.slice(3) : todas;
const SEG = 8, AQUECER = 1.2; // segundos gravados úteis / descartados do início
const saida = path.join(raiz, 'videos');
const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'motionlab-rec-'));

(async () => {
  const browser = await pw.chromium.launch();
  try {
    for (const p of pecas) {
      const ctx = await browser.newContext({
        viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1,
        recordVideo: { dir: tmp, size: { width: 1280, height: 720 } },
      });
      const page = await ctx.newPage();
      const erros = [];
      page.on('pageerror', e => erros.push(e.message));
      await page.goto(`http://127.0.0.1:${porta}/pecas/${p}/index.html?demo=1`, { waitUntil: 'networkidle' });
      await page.waitForTimeout((SEG + AQUECER) * 1000);
      const bruto = await page.video().path();
      await ctx.close();
      if (erros.length) throw new Error(`${p}: pageerror ${erros.join(' | ')}`);
      const base = path.join(saida, p);
      const corte = ['-y', '-loglevel', 'error', '-ss', String(AQUECER), '-t', String(SEG), '-i', bruto];
      execFileSync('ffmpeg', [...corte, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '40', '-row-mt', '1', `${base}.webm`]);
      execFileSync('ffmpeg', [...corte, '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '26', '-preset', 'slow', '-movflags', '+faststart', `${base}.mp4`]);
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(AQUECER + SEG / 2), '-i', bruto, '-frames:v', '1', '-q:v', '4', `${base}.jpg`]);
      const kb = f => Math.round(fs.statSync(f).size / 1024);
      console.log(`OK ${p}: webm ${kb(base + '.webm')} KB, mp4 ${kb(base + '.mp4')} KB`);
    }
  } finally {
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
})().catch(e => { console.error('FALHOU', e.message); process.exit(1); });
