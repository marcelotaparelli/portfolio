import { file, Glob, YAML } from 'bun';
import { cv } from '../src/data/site';

const issues: string[] = [];
const expected = new Set([
  'catus',
  'atendimento-evag',
  'drive-wordpress',
  'portfolio-decisions',
  'salus',
  'ops-triage-ai',
  'resilient-transaction-api',
  'llm-did-not-win-everywhere',
]);
const seen = new Map<string, Set<string>>();
for await (const path of new Glob('src/content/**/*.mdx').scan('.')) {
  const source = await file(path).text();
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter?.[1]) {
    issues.push(`${path}: missing frontmatter`);
    continue;
  }
  const data = YAML.parse(frontmatter[1]) as Record<string, unknown>;
  const key = String(data.translationKey);
  const languages = seen.get(key) ?? new Set<string>();
  languages.add(String(data.locale));
  seen.set(key, languages);
  if (data.status !== 'published' || data.reviewed !== true)
    issues.push(`${path}: awaiting bilingual editorial approval`);
  if (path.includes('/articles/') && !data.publishedAt)
    issues.push(`${path}: publication date must be set at release`);
}
for (const key of expected) {
  if (!seen.get(key)?.has('pt-BR') || !seen.get(key)?.has('en'))
    issues.push(`${key}: both languages are required for launch`);
}
for (const [locale, document] of Object.entries(cv)) {
  const pdf = file(`public${document.path}`);
  if (!(await pdf.exists())) {
    issues.push(`${locale}: missing reviewed résumé (${document.path})`);
    continue;
  }
  if ((await pdf.slice(0, 5).text()) !== '%PDF-')
    issues.push(`${locale}: invalid PDF signature`);
  if (!document.reviewed)
    issues.push(`${locale}: PDF editorial/accessibility review is pending`);
}
if (process.env.CONTENT_PREVIEW === 'true')
  issues.push('CONTENT_PREVIEW must be disabled for release');
if (issues.length) {
  console.error(
    'Release is not ready:\n' + issues.map((issue) => `- ${issue}`).join('\n'),
  );
  process.exit(1);
}
console.log(
  'Release content and reviewed PDFs are ready. Build and validate the production artifact before deployment.',
);
