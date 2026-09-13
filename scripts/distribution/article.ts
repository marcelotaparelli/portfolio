// Article resolution and validation for distribution.
// Reads the PT-BR source file directly (frontmatter + markdown), reusing
// the YAML approach from scripts/check-release.ts. No new dependencies.

import { Glob, YAML } from 'bun';
import { ORIGIN, type DistributionInput, type ResolvedArticle } from './types';

export class DistributionError extends Error {}

interface Frontmatter {
  translationKey?: unknown;
  locale?: unknown;
  slug?: unknown;
  title?: unknown;
  description?: unknown;
  status?: unknown;
  reviewed?: unknown;
  publishedAt?: unknown;
  distribution?: {
    devto?: { tags?: unknown };
    linkedin?: { text?: unknown };
  };
}

export function splitFrontmatter(source: string): {
  data: Frontmatter;
  body: string;
} {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match?.[1]) throw new DistributionError('missing frontmatter');
  return {
    data: YAML.parse(match[1]) as Frontmatter,
    body: source.slice(match[0].length).replace(/^\r?\n/, ''),
  };
}

export function canonicalFor(slug: string): string {
  return `${ORIGIN}/artigos/${slug}/`;
}

/** Rewrite root-relative links/images to absolute URLs, outside code fences. */
export function absolutizeMarkdown(body: string, origin: string): string {
  return body
    .split(/(```[\s\S]*?```)/g)
    .map((chunk, index) =>
      index % 2 === 1
        ? chunk
        : chunk.replace(/(\[[^\]]*\]\()(\/[^)]*\))/g, `$1${origin}$2`),
    )
    .join('');
}

function failClosed(reason: string): never {
  throw new DistributionError(reason);
}

export function validateDistributionInput(
  input: DistributionInput,
  canonicalUrl: string,
): void {
  if (input.devtoTags !== undefined) {
    if (input.devtoTags.length < 1 || input.devtoTags.length > 4)
      failClosed('devto requires 1 to 4 tags');
    for (const tag of input.devtoTags) {
      if (typeof tag !== 'string' || tag.trim().length === 0)
        failClosed('devto tags must be non-empty strings');
    }
  }
  if (input.linkedinText !== undefined) {
    if (input.linkedinText.trim().length === 0)
      failClosed('linkedin text must not be empty');
    if (input.linkedinText.length > 3000)
      failClosed('linkedin text exceeds 3000 characters');
    if (!input.linkedinText.includes(canonicalUrl))
      failClosed('linkedin text must contain the canonical URL');
  }
}

export interface ArticleReader {
  listPtFiles: () => Promise<string[]>;
  readFile: (path: string) => Promise<string>;
}

export const fsReader: ArticleReader = {
  listPtFiles: async () => {
    const paths: string[] = [];
    for await (const path of new Glob('src/content/articles/pt-br/*.mdx').scan(
      '.',
    ))
      paths.push(path);
    return paths.sort();
  },
  readFile: async (path: string) => await Bun.file(path).text(),
};

/**
 * Resolve a PT-BR article by slug. Fails closed unless the article is
 * published, reviewed, dated and carries a PT-BR version (the file itself).
 */
export async function resolveArticle(
  slug: string,
  reader: ArticleReader = fsReader,
): Promise<ResolvedArticle> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    failClosed(`invalid slug: ${slug}`);
  for (const path of await reader.listPtFiles()) {
    const { data, body } = splitFrontmatter(await reader.readFile(path));
    if (data.locale !== 'pt-BR' || data.slug !== slug) continue;
    if (data.status !== 'published')
      failClosed(`${path}: status is not published`);
    if (data.reviewed !== true) failClosed(`${path}: not reviewed`);
    if (!data.publishedAt) failClosed(`${path}: missing publishedAt`);
    if (typeof data.title !== 'string' || data.title.length === 0)
      failClosed(`${path}: missing title`);
    if (typeof data.description !== 'string' || data.description.length === 0)
      failClosed(`${path}: missing description`);
    const dist = data.distribution ?? {};
    const rawTags = dist.devto?.tags;
    const rawText = dist.linkedin?.text;
    const distribution: DistributionInput = {
      devtoTags:
        rawTags === undefined ? undefined : (rawTags as unknown[]).map(String),
      linkedinText: rawText === undefined ? undefined : String(rawText),
    };
    const canonicalUrl = canonicalFor(slug);
    validateDistributionInput(distribution, canonicalUrl);
    return {
      slug,
      translationKey: String(data.translationKey),
      title: data.title,
      description: data.description,
      markdown: absolutizeMarkdown(body.trim(), ORIGIN),
      canonicalUrl,
      distribution,
    };
  }
  failClosed(`no published PT-BR article for slug: ${slug}`);
}

/**
 * Confirm the article is publicly reachable at its canonical URL.
 * Read-only GET; fails closed on any non-200 response.
 */
export async function checkPublic(
  canonicalUrl: string,
  fetchFn: typeof fetch = fetch,
): Promise<void> {
  let response: Response;
  try {
    response = await fetchFn(canonicalUrl, { redirect: 'follow' });
  } catch (error) {
    failClosed(
      `canonical URL unreachable: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  if (response!.status !== 200)
    failClosed(`canonical URL returned HTTP ${response!.status}`);
}
