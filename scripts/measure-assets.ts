import { file, Glob, gzipSync, write } from 'bun';

const html = await file('dist/index.html').text();
const css: { path: string; bytes: number; gzip: number }[] = [];
const js: { path: string; bytes: number; gzip: number }[] = [];
for (const [extension, target] of [
  ['css', css],
  ['js', js],
] as const) {
  for await (const path of new Glob(`dist/_astro/*.${extension}`).scan('.')) {
    const content = await file(path).bytes();
    target.push({
      path,
      bytes: content.byteLength,
      gzip: gzipSync(content).byteLength,
    });
  }
}
const inlineModules = [
  ...html.matchAll(/<script\b[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/g),
]
  .map((match) => match[1] ?? '')
  .join('\n');
const fonts: { path: string; bytes: number }[] = [];
for await (const path of new Glob('dist/fonts/*.woff2').scan('.'))
  fonts.push({ path, bytes: (await file(path).bytes()).length });
const report = {
  measuredAt: new Date().toISOString(),
  runtime: `Bun ${process.versions.bun}`,
  html: { bytes: html.length, gzip: gzipSync(html).length },
  css,
  js,
  inlineModule: {
    bytes: inlineModules.length,
    gzip: gzipSync(inlineModules).length,
  },
  fonts,
  frameworkClientBytes: 0,
};
const cssGzip = css.reduce((sum, asset) => sum + asset.gzip, 0);
const jsGzip =
  js.reduce((sum, asset) => sum + asset.gzip, 0) + report.inlineModule.gzip;
if (
  cssGzip > 25 * 1024 ||
  jsGzip > 10 * 1024 ||
  fonts.reduce((sum, font) => sum + font.bytes, 0) > 100 * 1024
)
  throw new Error('Asset budget exceeded');
await write('reports/assets.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
