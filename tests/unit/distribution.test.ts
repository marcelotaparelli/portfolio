import { describe, expect, test } from 'bun:test';
import {
  absolutizeMarkdown,
  canonicalFor,
  checkPublic,
  resolveArticle,
  splitFrontmatter,
  validateDistributionInput,
  type ArticleReader,
} from '../../scripts/distribution/article';
import {
  buildDevtoPayload,
  findByCanonical,
  publishDevto,
} from '../../scripts/distribution/devto';
import {
  buildLinkedinPayload,
  publishLinkedin,
} from '../../scripts/distribution/linkedin';
import { readLedger } from '../../scripts/distribution/distribute';
import type { ResolvedArticle } from '../../scripts/distribution/types';

const ORIGIN = 'https://marcelotaparelli.com.br';
const SLUG = 'portfolio-bun-astro-mdx';
const CANONICAL = `${ORIGIN}/artigos/${SLUG}/`;

const mdx = (frontmatter: string, body = 'Hello [x](/sobre/).') =>
  `---\n${frontmatter}\n---\n\n${body}`;

const baseFrontmatter = `translationKey: portfolio-decisions
locale: pt-BR
slug: ${SLUG}
title: Title
description: Description
status: published
reviewed: true
publishedAt: 2026-09-12
category: Engenharia`;

const readerFor = (files: Record<string, string>): ArticleReader => ({
  listPtFiles: async () => Object.keys(files).sort(),
  readFile: async (path: string) => {
    const content = files[path];
    if (content === undefined) throw new Error(`missing: ${path}`);
    return content;
  },
});

const article = (overrides = {}): ResolvedArticle => ({
  slug: SLUG,
  translationKey: 'portfolio-decisions',
  title: 'Title',
  description: 'Description',
  markdown: 'Body',
  canonicalUrl: CANONICAL,
  distribution: {
    devtoTags: ['bun', 'astro'],
    linkedinText: `Hook.\n\n${CANONICAL}`,
  },
  ...overrides,
});

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status });

const mockFetch = (
  handler: (url: string, init?: RequestInit) => Response | Promise<Response>,
) => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fn = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return handler(String(url), init);
  }) as typeof fetch;
  return { fn, calls };
};

describe('frontmatter and canonical', () => {
  test('splits frontmatter from body', () => {
    const { data, body } = splitFrontmatter(mdx(baseFrontmatter, 'Body text'));
    expect(data.slug).toBe(SLUG);
    expect(body).toBe('Body text');
  });
  test('rejects missing frontmatter', () => {
    expect(() => splitFrontmatter('no frontmatter')).toThrow('frontmatter');
  });
  test('builds the PT canonical URL', () => {
    expect(canonicalFor(SLUG)).toBe(CANONICAL);
  });
  test('absolutizes root-relative links, sparing code fences', () => {
    const out = absolutizeMarkdown(
      'A [x](/sobre/) and `[y](/z)`.\n```\n[code](/skip)\n```',
      ORIGIN,
    );
    expect(out).toContain(`[x](${ORIGIN}/sobre/)`);
    expect(out).toContain('[code](/skip)');
  });
});

describe('article resolution', () => {
  test('resolves a published, reviewed PT article', async () => {
    const resolved = await resolveArticle(
      SLUG,
      readerFor({ 'a.mdx': mdx(baseFrontmatter) }),
    );
    expect(resolved.canonicalUrl).toBe(CANONICAL);
    expect(resolved.translationKey).toBe('portfolio-decisions');
  });
  test('rejects drafts', async () => {
    const files = {
      'a.mdx': mdx(
        baseFrontmatter.replace('status: published', 'status: draft'),
      ),
    };
    await expect(resolveArticle(SLUG, readerFor(files))).rejects.toThrow(
      'not published',
    );
  });
  test('rejects unreviewed articles', async () => {
    const files = {
      'a.mdx': mdx(
        baseFrontmatter.replace('reviewed: true', 'reviewed: false'),
      ),
    };
    await expect(resolveArticle(SLUG, readerFor(files))).rejects.toThrow(
      'not reviewed',
    );
  });
  test('rejects unknown slugs and malformed input', async () => {
    const files = { 'a.mdx': mdx(baseFrontmatter) };
    await expect(resolveArticle('nope', readerFor(files))).rejects.toThrow(
      'no published PT-BR article',
    );
    await expect(resolveArticle('../x', readerFor(files))).rejects.toThrow(
      'invalid slug',
    );
  });
  test('checkPublic fails closed on non-200 and network errors', async () => {
    const { fn } = mockFetch(() => new Response('x', { status: 404 }));
    await expect(checkPublic(CANONICAL, fn)).rejects.toThrow('HTTP 404');
    const down = mockFetch(() => {
      throw new Error('boom');
    });
    await expect(checkPublic(CANONICAL, down.fn)).rejects.toThrow(
      'unreachable',
    );
    const ok = mockFetch(() => new Response('x', { status: 200 }));
    await expect(checkPublic(CANONICAL, ok.fn)).resolves.toBeUndefined();
  });
});

describe('distribution metadata validation', () => {
  test('accepts valid input', () => {
    expect(() =>
      validateDistributionInput(
        { devtoTags: ['a'], linkedinText: `t ${CANONICAL}` },
        CANONICAL,
      ),
    ).not.toThrow();
  });
  test('rejects tag count outside 1..4', () => {
    expect(() =>
      validateDistributionInput({ devtoTags: [] }, CANONICAL),
    ).toThrow('1 to 4');
    expect(() =>
      validateDistributionInput(
        { devtoTags: ['a', 'b', 'c', 'd', 'e'] },
        CANONICAL,
      ),
    ).toThrow('1 to 4');
  });
  test('rejects linkedin text without the canonical URL or too long', () => {
    expect(() =>
      validateDistributionInput({ linkedinText: 'no link here' }, CANONICAL),
    ).toThrow('canonical URL');
    expect(() =>
      validateDistributionInput(
        { linkedinText: `x ${CANONICAL}`.padEnd(3001, 'y') },
        CANONICAL,
      ),
    ).toThrow('3000');
  });
});

describe('DEV.to payload and API', () => {
  test('builds a complete payload with canonical_url', () => {
    const payload = buildDevtoPayload(article());
    expect(payload.published).toBe(true);
    expect(payload.canonical_url).toBe(CANONICAL);
    expect(payload.tags).toEqual(['bun', 'astro']);
  });
  test('refuses to build without canonical or tags', () => {
    expect(() => buildDevtoPayload(article({ distribution: {} }))).toThrow();
    expect(() => buildDevtoPayload(article({ canonicalUrl: '' }))).toThrow(
      'canonical',
    );
  });
  test('finds an existing post by canonical across pages', async () => {
    const { fn, calls } = mockFetch((url) => {
      if (url.includes('page=2'))
        return jsonResponse([{ id: 7, url: 'u7', canonical_url: CANONICAL }]);
      return jsonResponse([{ id: 1, url: 'u1', canonical_url: 'other' }]);
    });
    const found = await findByCanonical('k', CANONICAL, fn);
    expect(found?.id).toBe('7');
    expect(calls.length).toBe(2);
  });
  test('returns null when nothing matches and fails on lookup errors', async () => {
    const empty = mockFetch(() => jsonResponse([]));
    expect(await findByCanonical('k', CANONICAL, empty.fn)).toBeNull();
    const bad = mockFetch(() => new Response('x', { status: 500 }));
    await expect(findByCanonical('k', CANONICAL, bad.fn)).rejects.toThrow(
      'lookup failed',
    );
  });
  test('publishes once and maps failures without leaking the key', async () => {
    const { fn, calls } = mockFetch(() =>
      jsonResponse({ id: 9, url: 'https://dev.to/x/9' }),
    );
    const done = await publishDevto(
      'secret-key',
      buildDevtoPayload(article()),
      fn,
    );
    expect(done).toMatchObject({ id: '9', url: 'https://dev.to/x/9' });
    expect(calls.length).toBe(1);
    for (const status of [401, 422, 429, 500]) {
      const failing = mockFetch(() => new Response('err', { status }));
      await expect(
        publishDevto('secret-key', buildDevtoPayload(article()), failing.fn),
      ).rejects.toThrow(/HTTP (401|422|429|500)/);
    }
    try {
      const failing = mockFetch(() => new Response('err', { status: 401 }));
      await publishDevto(
        'secret-key',
        buildDevtoPayload(article()),
        failing.fn,
      );
    } catch (error) {
      expect(String(error)).not.toContain('secret-key');
    }
  });
});

describe('LinkedIn payload and API', () => {
  const urn = 'urn:li:person:abc123';
  test('builds an explicit-author public post', () => {
    const payload = buildLinkedinPayload(article(), urn);
    expect(payload).toMatchObject({
      author: urn,
      visibility: 'PUBLIC',
      lifecycleState: 'PUBLISHED',
    });
  });
  test('rejects bad URN, missing text and missing canonical', () => {
    expect(() => buildLinkedinPayload(article(), 'nope')).toThrow('URN');
    expect(() =>
      buildLinkedinPayload(article({ distribution: {} }), urn),
    ).toThrow('required');
    expect(() =>
      buildLinkedinPayload(
        article({ distribution: { linkedinText: 'no link' } }),
        urn,
      ),
    ).toThrow('canonical URL');
  });
  test('publishes with exactly one request and reads the post id', async () => {
    const { fn, calls } = mockFetch(
      () =>
        new Response('{}', {
          status: 201,
          headers: { 'x-restli-id': 'urn:li:ugcPost:42' },
        }),
    );
    const done = await publishLinkedin(
      'tok',
      buildLinkedinPayload(article(), urn),
      fn,
    );
    expect(calls.length).toBe(1);
    expect(done.id).toBe('urn:li:ugcPost:42');
    const first = calls[0];
    if (!first?.init) throw new Error('expected one LinkedIn request');
    const sent = JSON.parse(String(first.init.body));
    expect(sent.author).toBe(urn);
    expect(first.init.headers).toMatchObject({
      Authorization: 'Bearer tok',
    });
  });
  test('maps auth, validation and rate-limit failures', async () => {
    for (const [status, pattern] of [
      [401, /token/i],
      [422, /422/],
      [429, /rate limit/i],
    ] as const) {
      const failing = mockFetch(() => new Response('e', { status }));
      await expect(
        publishLinkedin(
          'tok',
          buildLinkedinPayload(article(), urn),
          failing.fn,
        ),
      ).rejects.toThrow(pattern);
    }
  });
});

describe('ledger', () => {
  test('reads valid ledgers and rejects corrupt ones', () => {
    expect(readLedger('')).toEqual({});
    expect(
      readLedger('{"k":{"devto":{"id":"1","url":"u","at":"t"}}}'),
    ).toMatchObject({ k: { devto: { id: '1' } } });
    expect(() => readLedger('nope')).toThrow('valid JSON');
    expect(() => readLedger('[]')).toThrow('JSON object');
  });
});
