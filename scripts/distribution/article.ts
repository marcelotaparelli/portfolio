// Article resolution and validation for distribution.
// Reads the PT-BR + EN source files directly (frontmatter + markdown),
// reusing the YAML approach from scripts/check-release.ts.
// No new dependencies. No runtime translation.

import { Glob, YAML } from 'bun';
import {
  ORIGIN,
  type DistributionInput,
  type ResolvedArticle,
  type ResolvedPair,
} from './types';

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

export function canonicalForEn(slug: string): string {
  return `${ORIGIN}/en/articles/${slug}/`;
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
  listEnFiles: () => Promise<string[]>;
  readFile: (path: string) => Promise<string>;
}

async function listGlob(pattern: string): Promise<string[]> {
  const paths: string[] = [];
  for await (const path of new Glob(pattern).scan('.')) paths.push(path);
  return paths.sort();
}

export const fsReader: ArticleReader = {
  listPtFiles: async () => await listGlob('src/content/articles/pt-br/*.mdx'),
  listEnFiles: async () => await listGlob('src/content/articles/en/*.mdx'),
  readFile: async (path: string) => await Bun.file(path).text(),
};

interface ParsedFile {
  path: string;
  data: Frontmatter;
  body: string;
}

async function findOne(
  slug: string,
  locale: 'pt-BR' | 'en',
  paths: string[],
  reader: ArticleReader,
): Promise<ParsedFile | null> {
  for (const path of paths) {
    const { data, body } = splitFrontmatter(await reader.readFile(path));
    if (data.locale !== locale || data.slug !== slug) continue;
    return { path, data, body };
  }
  return null;
}

function resolveOne(
  slug: string,
  parsed: ParsedFile,
  canonicalUrl: string,
): ResolvedArticle {
  const { path, data, body } = parsed;
  if (data.status !== 'published')
    failClosed(`${path}: status is not published`);
  if (data.reviewed !== true) failClosed(`${path}: not reviewed`);
  if (!data.publishedAt) failClosed(`${path}: missing publishedAt`);
  if (typeof data.title !== 'string' || data.title.length === 0)
    failClosed(`${path}: missing title`);
  if (typeof data.description !== 'string' || data.description.length === 0)
    failClosed(`${path}: missing description`);
  if (
    typeof data.translationKey !== 'string' ||
    data.translationKey.length === 0
  )
    failClosed(`${path}: missing translationKey`);
  const dist = data.distribution ?? {};
  const rawTags = dist.devto?.tags;
  const rawText = dist.linkedin?.text;
  const distribution: DistributionInput = {
    devtoTags:
      rawTags === undefined ? undefined : (rawTags as unknown[]).map(String),
    linkedinText: rawText === undefined ? undefined : String(rawText),
  };
  validateDistributionInput(distribution, canonicalUrl);
  return {
    slug,
    translationKey: data.translationKey,
    title: data.title,
    description: data.description,
    markdown: absolutizeMarkdown(body.trim(), ORIGIN),
    canonicalUrl,
    distribution,
  };
}

/**
 * Resolve the PT-BR + EN pair for a slug. Fails closed unless both sides
 * exist, are published, reviewed and dated, share the same translationKey
 * and carry the same slug. DEV.to uses EN content; LinkedIn uses one PT-authored
 * post containing both language sections and both article canonicals.
 */
export async function resolveArticlePair(
  slug: string,
  reader: ArticleReader = fsReader,
): Promise<ResolvedPair> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    failClosed(`invalid slug: ${slug}`);
  const ptParsed = await findOne(
    slug,
    'pt-BR',
    await reader.listPtFiles(),
    reader,
  );
  if (!ptParsed) failClosed(`no published PT-BR article for slug: ${slug}`);
  const enParsed = await findOne(
    slug,
    'en',
    await reader.listEnFiles(),
    reader,
  );
  if (!enParsed) failClosed(`no published EN article for slug: ${slug}`);
  const pt = resolveOne(slug, ptParsed, canonicalFor(slug));
  const en = resolveOne(slug, enParsed, canonicalForEn(slug));
  if (pt.translationKey !== en.translationKey)
    failClosed(
      `translationKey mismatch: pt-BR is ${pt.translationKey}, en is ${en.translationKey}`,
    );
  if (pt.distribution.linkedinText === undefined)
    failClosed(`${ptParsed.path}: missing linkedin text for LinkedIn`);
  if (!pt.distribution.linkedinText.includes(en.canonicalUrl))
    failClosed(
      `${ptParsed.path}: LinkedIn post must contain the EN canonical URL`,
    );
  if (!pt.distribution.linkedinText.includes('English version below 🇬🇧'))
    failClosed(
      `${ptParsed.path}: LinkedIn post must include the bilingual section marker`,
    );
  if (en.distribution.devtoTags === undefined)
    failClosed(`${enParsed.path}: missing devto tags for DEV.to`);
  return { slug, translationKey: pt.translationKey, pt, en };
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
