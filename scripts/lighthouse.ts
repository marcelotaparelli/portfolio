import { spawn, file, write } from 'bun';
import { chromium } from '@playwright/test';

const targets = process.argv.includes('--article-only')
  ? []
  : [
      ['home', '/'],
      ['about', '/sobre/'],
      ['case', '/projetos/agencia-catus/'],
    ];
if (
  process.argv.includes('--article') ||
  process.argv.includes('--article-only')
)
  targets.push(['article', '/artigos/portfolio-bun-astro-mdx/']);
const results = [];
for (const [name, path] of targets) {
  for (let run = 1; run <= 3; run++) {
    const reportPath = `reports/lighthouse-${name}-${run}.json`;
    console.log(`Lighthouse mobile: ${path} (${run}/3)`);
    const proc = spawn(
      [
        'bunx',
        '--bun',
        'lighthouse@13.4.1',
        `http://127.0.0.1:3100${path}`,
        '--only-categories=performance,accessibility,best-practices',
        '--output=json',
        `--output-path=${reportPath}`,
        '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage',
        '--quiet',
      ],
      {
        env: { ...process.env, CHROME_PATH: chromium.executablePath() },
        stdout: 'inherit',
        stderr: 'inherit',
      },
    );
    if ((await proc.exited) !== 0)
      throw new Error(`Lighthouse failed: ${path}`);
    const data = await file(reportPath).json();
    results.push({
      name,
      run,
      timestamp: data.fetchTime,
      version: data.lighthouseVersion,
      environment: data.environment,
      config: data.configSettings,
      performance: data.categories.performance.score,
      accessibility: data.categories.accessibility.score,
      lcp: data.audits['largest-contentful-paint'].numericValue,
      cls: data.audits['cumulative-layout-shift'].numericValue,
      tbt: data.audits['total-blocking-time'].numericValue,
      transferBytes: data.audits['total-byte-weight'].numericValue,
    });
  }
}
const summary = process.argv.includes('--article-only')
  ? 'reports/lighthouse-article-summary.json'
  : 'reports/lighthouse-summary.json';
await write(summary, JSON.stringify(results, null, 2));
console.log(`Saved ${summary}`);
