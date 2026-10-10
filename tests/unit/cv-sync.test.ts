import { expect, test } from 'bun:test';
import { createHash } from 'node:crypto';

test('project content and both CV sources/PDFs match the synchronization record', async () => {
  const paths = [
    'cv/pt-br.html',
    'cv/en.html',
    'public/cv/marcelo-taparelli-cv-pt-br.pdf',
    'public/cv/marcelo-taparelli-cv-en.pdf',
  ];
  for await (const path of new Bun.Glob('src/content/projects/**/*.mdx').scan(
    '.',
  )) {
    paths.push(path);
  }
  const current: Record<string, string> = {};
  for (const path of paths.sort()) {
    current[path] = createHash('sha256')
      .update(new Uint8Array(await Bun.file(path).arrayBuffer()))
      .digest('hex');
  }
  const recorded = await Bun.file('cv/project-sync.json').json();
  expect(
    current,
    'Projects or CVs changed: update/review both CVs, regenerate PDFs, then follow docs/cv-maintenance.md. Do not refresh the record to bypass review.',
  ).toEqual(recorded);
});
