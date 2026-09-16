import { file, Glob, YAML } from 'bun';
import { resolve } from 'node:path';
import { contentPath, type Locale } from '../src/i18n/routes';

const root = resolve(process.argv[2] ?? 'dist');
const expectedPreview = process.argv.includes('--preview');
const failures: string[] = [];
let count = 0;
for await (const relative of new Glob('**/*.html').scan(root)) {
  if (relative.startsWith('.')) continue;
  count++;
  const links: string[] = [];
  const resources: string[] = [];
  const alternates: string[] = [];
  let canonical = '';
  let noindex = false;
  let h1 = 0;
  const html = await file(`${root}/${relative}`).text();
  await new HTMLRewriter()
    .on('a[href]', {
      element(el) {
        const href = el.getAttribute('href')!;
        links.push(href);
        // External links must open in a new tab without leaking context.
        if (
          (href.startsWith('http://') || href.startsWith('https://')) &&
          !href.startsWith('https://marcelotaparelli.com.br')
        ) {
          const rel = (el.getAttribute('rel') ?? '').split(/\s+/);
          if (
            el.getAttribute('target') !== '_blank' ||
            !rel.includes('noopener') ||
            !rel.includes('noreferrer')
          )
            failures.push(`${relative}: external link is not new-tab safe`);
        }
      },
    })
    .on('img[src],script[src]', {
      element(el) {
        resources.push(el.getAttribute('src')!);
      },
    })
    .on('link[rel="stylesheet"],link[rel="preload"]', {
      element(el) {
        resources.push(el.getAttribute('href')!);
      },
    })
    .on('meta[property="og:image"]', {
      element(el) {
        resources.push(new URL(el.getAttribute('content')!).pathname);
      },
    })
    .on('link[rel="canonical"]', {
      element(el) {
        canonical = el.getAttribute('href')!;
      },
    })
    .on('link[rel="alternate"]', {
      element(el) {
        alternates.push(el.getAttribute('href')!);
      },
    })
    .on('meta[name="robots"]', {
      element(el) {
        noindex = el.getAttribute('content')?.includes('noindex') ?? false;
      },
    })
    .on('h1', {
      element() {
        h1++;
      },
    })
    .transform(new Response(html))
    .text();
  if (h1 !== 1) failures.push(`${relative}: expected one h1, got ${h1}`);
  if (!canonical || !alternates.includes(canonical) || alternates.length !== 3)
    failures.push(`${relative}: invalid canonical or alternates`);
  if (expectedPreview && !noindex)
    failures.push(`${relative}: preview must be noindex`);
  if (!expectedPreview && noindex && !relative.includes('404'))
    failures.push(`${relative}: production unexpectedly noindex`);
  for (const href of [
    ...links,
    ...resources,
    ...alternates.map((url) => new URL(url).pathname),
  ]) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = new URL(href, 'http://local.invalid').pathname;
    const target = `${root}${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`;
    if (!(await file(target).exists()))
      failures.push(`${relative}: broken local URL ${href}`);
  }
}
if (!expectedPreview) {
  for await (const source of new Glob('src/content/**/*.mdx').scan('.')) {
    const frontmatter = (await file(source).text()).match(
      /^---\n([\s\S]*?)\n---/,
    );
    if (!frontmatter?.[1]) continue;
    const data = YAML.parse(frontmatter[1]) as {
      status: string;
      locale: Locale;
      slug: string;
    };
    if (data.status !== 'draft') continue;
    const path = contentPath(
      source.includes('/projects/') ? 'projects' : 'articles',
      data.locale,
      data.slug,
    );
    if (await file(`${root}${path}index.html`).exists())
      failures.push(`${path}: draft leaked into production`);
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(
  `${count} HTML documents checked: headings, metadata, local links, images, fonts and language pairs.`,
);
