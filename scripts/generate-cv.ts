// Reproducible CV generation: HTML/CSS source -> PDF via Playwright Chromium.
// Usage: bun run cv:generate
// Fails closed when an output is missing, content risks spilling onto a
// second page, or the PDF does not contain exactly 1 page. No new
// dependencies: Bun + the repo's Playwright/Chromium + repo-local fonts.

import { chromium } from '@playwright/test';

interface Target {
  html: string;
  pdf: string;
  label: string;
}

const targets: Target[] = [
  {
    html: 'cv/pt-br.html',
    pdf: 'public/cv/marcelo-taparelli-cv-pt-br.pdf',
    label: 'PT-BR',
  },
  {
    html: 'cv/en.html',
    pdf: 'public/cv/marcelo-taparelli-cv-en.pdf',
    label: 'EN',
  },
];

function fail(message: string): never {
  console.error(`cv:generate: ${message}`);
  process.exit(1);
}

/** Count PDF pages without new dependencies. Chromium emits one
 * `/Type /Page` object per page (`/Pages` is the parent node). */
function countPdfPages(bytes: Uint8Array): number {
  const text = Buffer.from(bytes).toString('latin1');
  if (!text.startsWith('%PDF-')) fail('output is not a PDF document');
  return text.match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0;
}

async function main(): Promise<void> {
  const browser = await chromium.launch();
  try {
    for (const target of targets) {
      const page = await browser.newPage();
      const url = new URL(`../${target.html}`, import.meta.url);
      await page.goto(url.href);
      // Webfonts must be ready before measuring or printing.
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const sheet = document.querySelector('.sheet');
        if (!sheet) return null;
        const sheetRect = sheet.getBoundingClientRect();
        const last = sheet.lastElementChild?.getBoundingClientRect();
        const paddingBottom = parseFloat(getComputedStyle(sheet).paddingBottom);
        return {
          scroll: sheet.scrollHeight,
          client: sheet.clientHeight,
          headroom: last ? sheetRect.bottom - paddingBottom - last.bottom : 0,
        };
      });
      if (layout === null)
        fail(`${target.label}: missing .sheet element in ${target.html}`);
      console.log(
        `${target.label}: sheet ${layout.scroll}/${layout.client}px, ` +
          `bottom headroom ${layout.headroom.toFixed(1)}px`,
      );
      if (layout.scroll > layout.client + 1 || layout.headroom < 0)
        fail(
          `${target.label}: content overflows one A4 page ` +
            `(scroll ${layout.scroll}px > box ${layout.client}px)`,
        );
      await page.pdf({
        path: target.pdf,
        format: 'A4',
        printBackground: false,
        preferCSSPageSize: true,
      });
      await page.close();
      const file = Bun.file(target.pdf);
      if (!(await file.exists()))
        fail(`${target.label}: PDF was not generated at ${target.pdf}`);
      const pages = countPdfPages(new Uint8Array(await file.arrayBuffer()));
      console.log(`${target.label}: ${target.pdf} (${pages} page)`);
      if (pages !== 1)
        fail(`${target.label}: expected exactly 1 page, found ${pages}`);
    }
  } finally {
    await browser.close();
  }
  console.log('cv:generate: both CVs generated with exactly 1 page each.');
}

await main();
