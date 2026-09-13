import { chromium } from '@playwright/test';

// Build-time capture of our typographic identity. No remote requests or client runtime.
const browser = await chromium.launch();
try {
  for (const locale of ['pt-br', 'en']) {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    await page.goto('http://127.0.0.1:3100/');
    await page.setContent(`<!doctype html><html lang="${locale}"><head><style>
      @font-face{font-family:Inter;src:url(http://127.0.0.1:3100/fonts/inter-latin-400-normal.woff2)}
      @font-face{font-family:Inter;src:url(http://127.0.0.1:3100/fonts/inter-latin-600-normal.woff2);font-weight:600}
      *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#061321;color:#f2f5f4;font-family:Inter,sans-serif;padding:64px 72px;position:relative;overflow:hidden}
      header{font-size:22px;letter-spacing:-.5px}small{display:block;font-size:12px;letter-spacing:2px;color:#a8bbc3;margin-top:12px}h1{font-size:68px;line-height:1.08;font-weight:600;letter-spacing:-3px;margin:60px 0 36px}h1 span{color:#9addd7}footer{display:flex;justify-content:space-between;color:#a8bbc3;font-size:14px;border-top:1px solid #29434e;padding-top:24px}svg{position:absolute;right:-160px;top:30px;opacity:.25;z-index:0}header,h1,footer{position:relative;z-index:1}
      </style></head><body><svg width="540" height="550" viewBox="0 0 540 550" fill="none" stroke="#9addd7"><circle cx="320" cy="150" r="170"/><circle cx="320" cy="150" r="100"/><path d="M0 430h240a80 80 0 0 0 80-80V0M200 550V350a100 100 0 0 1 100-100h240"/></svg><header>Marcelo Taparelli<span style="color:#9addd7">.</span><small>SOFTWARE ENGINEER</small></header><h1>FROM REAL PROBLEMS.<br><span>TO INTELLIGENT<br>PRODUCTS.</span></h1><footer><span>${locale === 'en' ? 'Software Engineering · Applied AI · Product' : 'Engenharia de Software · IA Aplicada · Produto'}</span><span>marcelotaparelli.com.br</span></footer></body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `public/og/${locale}.png` });
    await page.close();
  }
} finally {
  await browser.close();
}
