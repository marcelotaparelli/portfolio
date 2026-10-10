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

/** Same bilingual publication contract for articles and project launches. */
export function validateBilingualLinkedinText(
  text: string,
  ptCanonical: string,
  enCanonical: string,
): void {
  validateDistributionInput({ linkedinText: text }, ptCanonical);
  if (!text.includes(enCanonical))
    failClosed('LinkedIn post must contain the EN canonical URL');
  const marker = 'English version below 🇬🇧';
  const englishIndex = text.indexOf(marker);
  if (englishIndex < 0)
    failClosed('LinkedIn post must include the bilingual section marker');
  const portugueseIndex = text.indexOf('🇧🇷');
  if (portugueseIndex < 0 || portugueseIndex >= englishIndex)
    failClosed(
      'LinkedIn post must include the PT-BR flag before the English section',
    );
  const pt = text.slice(portugueseIndex + '🇧🇷'.length, englishIndex);
  const en = text.slice(englishIndex + marker.length);
  if (!pt.includes(ptCanonical) || !en.includes(enCanonical))
    failClosed(
      'LinkedIn canonical URLs must appear in their own language sections',
    );
  const hasCopy = (section: string) =>
    /\p{L}{2,}/u.test(
      section
        .replace(/^\s*(?:PT-BR|EN)\s*/i, '')
        .replace(/^\s*(?:[^:\n]+:\s*)?https?:\/\/\S+\s*$/gm, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/#[\p{L}\p{N}_]+/gu, ''),
    );
  if (!hasCopy(pt) || !hasCopy(en))
    failClosed('LinkedIn post requires copy in both language sections');
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
  validateBilingualLinkedinText(
    pt.distribution.linkedinText,
    pt.canonicalUrl,
    en.canonicalUrl,
  );
  if (en.distribution.devtoTags === undefined)
    failClosed(`${enParsed.path}: missing devto tags for DEV.to`);
  return { slug, translationKey: pt.translationKey, pt, en };
}

/**
 * Confirm the article is publicly reachable at its canonical URL.
 * Read-only GET; fails closed on any non-200 response. Connection failures
 * get three bounded attempts; HTTP responses are never retried or accepted
 * as a substitute for a public 200.
 */
export async function checkPublic(
  canonicalUrl: string,
  fetchFn: typeof fetch = fetch,
  pause: (ms: number) => Promise<void> = (ms) => Bun.sleep(ms),
): Promise<void> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let response: Response;
    try {
      response = await fetchFn(canonicalUrl, {
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
      });
    } catch (error) {
      if (attempt < 3) {
        await pause(1000);
        continue;
      }
      const message = error instanceof Error ? error.message : String(error);
      const code =
        typeof error === 'object' && error !== null && 'code' in error
          ? String(error.code)
          : error instanceof Error
            ? error.name
            : 'unknown';
      failClosed(
        `canonical URL unreachable (${canonicalUrl}; attempt ${attempt}/3; ${code}): ${message}`,
      );
    }
    // No body is needed for this status check; release the connection.
    await response.body?.cancel().catch(() => undefined);
    if (response.status !== 200)
      failClosed(
        `canonical URL returned HTTP ${response.status} (${canonicalUrl})`,
      );
    return;
  }
}
