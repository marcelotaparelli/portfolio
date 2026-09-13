import { describe, expect, test } from 'bun:test';
import {
  absolutizeMarkdown,
  canonicalFor,
  canonicalForEn,
  checkPublic,
  resolveArticlePair,
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
import {
  isPublishedFor,
  readLedger,
} from '../../scripts/distribution/distribute';
import type { ResolvedArticle } from '../../scripts/distribution/types';

const ORIGIN = 'https://marcelotaparelli.com.br';
const SLUG = 'portfolio-bun-astro-mdx';
const PT_CANONICAL = `${ORIGIN}/artigos/${SLUG}/`;
const EN_CANONICAL = `${ORIGIN}/en/articles/${SLUG}/`;

const mdx = (frontmatter: string, body = 'Hello [x](/sobre/).') =>
  `---\n${frontmatter}\n---\n\n${body}`;

const ptFrontmatter = `translationKey: portfolio-decisions
locale: pt-BR
slug: ${SLUG}
title: Título PT
description: Descrição PT
status: published
reviewed: true
publishedAt: 2026-09-12
category: Engenharia
distribution:
  linkedin:
    text: "Olá. Leia em ${PT_CANONICAL}"`;

const enFrontmatter = `translationKey: portfolio-decisions
locale: en
slug: ${SLUG}
title: EN Title
description: EN Description
status: published
reviewed: true
publishedAt: 2026-09-12
category: Engineering
distribution:
  devto:
    tags:
      - webdev
      - astro`;

const readerFor = (
  ptFiles: Record<string, string>,
  enFiles: Record<string, string> = {},
): ArticleReader => {
  const readFile = async (path: string) => {
    const content = ptFiles[path] ?? enFiles[path];
    if (content === undefined) throw new Error(`missing: ${path}`);
    return content;
  };
  return {
    listPtFiles: async () => Object.keys(ptFiles).sort(),
    listEnFiles: async () => Object.keys(enFiles).sort(),
    readFile,
  };
};

const pairReader = (pt = ptFrontmatter, en = enFrontmatter) =>
  readerFor({ 'pt.mdx': mdx(pt, 'Olá [x](/sobre/).') }, { 'en.mdx': mdx(en) });

const ptArticle = (overrides = {}): ResolvedArticle => ({
  slug: SLUG,
  translationKey: 'portfolio-decisions',
  title: 'Título PT',
  description: 'Descrição PT',
  markdown: 'Corpo PT',
  canonicalUrl: PT_CANONICAL,
  distribution: {
    linkedinText: `Olá.\n\n${PT_CANONICAL}`,
  },
  ...overrides,
});

const enArticle = (overrides = {}): ResolvedArticle => ({
  slug: SLUG,
  translationKey: 'portfolio-decisions',
  title: 'EN Title',
  description: 'EN Description',
  markdown: 'EN Body',
  canonicalUrl: EN_CANONICAL,
  distribution: {
    devtoTags: ['webdev', 'astro'],
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
    const { data, body } = splitFrontmatter(mdx(ptFrontmatter, 'Body text'));
    expect(data.slug).toBe(SLUG);
    expect(body).toBe('Body text');
  });
  test('rejects missing frontmatter', () => {
    expect(() => splitFrontmatter('no frontmatter')).toThrow('frontmatter');
  });
  test('builds the PT and EN canonical URLs', () => {
    expect(canonicalFor(SLUG)).toBe(PT_CANONICAL);
    expect(canonicalForEn(SLUG)).toBe(EN_CANONICAL);
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

describe('bilingual pair resolution', () => {
  test('resolves the PT-BR + EN pair with per-locale canonicals', async () => {
    const pair = await resolveArticlePair(SLUG, pairReader());
    expect(pair.slug).toBe(SLUG);
    expect(pair.translationKey).toBe('portfolio-decisions');
    expect(pair.pt.canonicalUrl).toBe(PT_CANONICAL);
    expect(pair.en.canonicalUrl).toBe(EN_CANONICAL);
    expect(pair.pt.title).toBe('Título PT');
    expect(pair.en.title).toBe('EN Title');
  });
  test('DEV.to receives EN content with the /en/articles/ canonical', () => {
    const payload = buildDevtoPayload(enArticle());
    expect(payload.published).toBe(true);
    expect(payload.title).toBe('EN Title');
    expect(payload.description).toBe('EN Description');
    expect(payload.body_markdown).toBe('EN Body');
    expect(payload.canonical_url).toBe(EN_CANONICAL);
    expect(payload.tags).toEqual(['webdev', 'astro']);
  });
  test('DEV.to payload built from the resolved pair is EN-only', async () => {
    const pair = await resolveArticlePair(SLUG, pairReader());
    const payload = buildDevtoPayload(pair.en);
    expect(payload.title).toBe('EN Title');
    expect(payload.canonical_url).toBe(EN_CANONICAL);
    expect(payload.canonical_url).not.toContain('/artigos/');
  });
  test('LinkedIn receives the PT-BR copy with the /artigos/ canonical', async () => {
    const pair = await resolveArticlePair(SLUG, pairReader());
    const payload = buildLinkedinPayload(pair.pt, 'urn:li:person:abc123');
    expect(payload.commentary).toContain('Olá');
    expect(payload.commentary).toContain(PT_CANONICAL);
    expect(payload.commentary).not.toContain(EN_CANONICAL);
  });
  test('rejects translationKey mismatch between PT and EN', async () => {
    const reader = pairReader(
      ptFrontmatter,
      enFrontmatter.replace(
        'translationKey: portfolio-decisions',
        'translationKey: other-key',
      ),
    );
    await expect(resolveArticlePair(SLUG, reader)).rejects.toThrow(
      'translationKey mismatch',
    );
  });
  test('fails when the EN side is missing', async () => {
    const reader = readerFor({ 'pt.mdx': mdx(ptFrontmatter) });
    await expect(resolveArticlePair(SLUG, reader)).rejects.toThrow(
      'no published EN article',
    );
  });
  test('fails when the PT side is missing', async () => {
    const reader = readerFor({}, { 'en.mdx': mdx(enFrontmatter) });
    await expect(resolveArticlePair(SLUG, reader)).rejects.toThrow(
      'no published PT-BR article',
    );
  });
  test('rejects drafts and unreviewed articles on either side', async () => {
    const draftPt = pairReader(
      ptFrontmatter.replace('status: published', 'status: draft'),
    );
    await expect(resolveArticlePair(SLUG, draftPt)).rejects.toThrow(
      'not published',
    );
    const draftEn = pairReader(
      ptFrontmatter,
      enFrontmatter.replace('status: published', 'status: draft'),
    );
    await expect(resolveArticlePair(SLUG, draftEn)).rejects.toThrow(
      'not published',
    );
    const unreviewedEn = pairReader(
      ptFrontmatter,
      enFrontmatter.replace('reviewed: true', 'reviewed: false'),
    );
    await expect(resolveArticlePair(SLUG, unreviewedEn)).rejects.toThrow(
      'not reviewed',
    );
  });
  test('requires EN devto tags and PT linkedin text', async () => {
    const noTags = pairReader(
      ptFrontmatter,
      `translationKey: portfolio-decisions
locale: en
slug: ${SLUG}
title: EN Title
description: EN Description
status: published
reviewed: true
publishedAt: 2026-09-12
category: Engineering`,
    );
    await expect(resolveArticlePair(SLUG, noTags)).rejects.toThrow(
      'missing devto tags',
    );
    const noText = pairReader(
      `translationKey: portfolio-decisions
locale: pt-BR
slug: ${SLUG}
title: Título PT
description: Descrição PT
status: published
reviewed: true
publishedAt: 2026-09-12
category: Engenharia`,
    );
    await expect(resolveArticlePair(SLUG, noText)).rejects.toThrow(
      'missing linkedin text',
    );
  });
  test('rejects unknown slugs and malformed input', async () => {
    const reader = pairReader();
    await expect(resolveArticlePair('nope', reader)).rejects.toThrow(
      'no published PT-BR article',
    );
    await expect(resolveArticlePair('../x', reader)).rejects.toThrow(
      'invalid slug',
    );
  });
  test('checkPublic fails closed on non-200 and network errors', async () => {
    const { fn } = mockFetch(() => new Response('x', { status: 404 }));
    await expect(checkPublic(PT_CANONICAL, fn)).rejects.toThrow('HTTP 404');
    const down = mockFetch(() => {
      throw new Error('boom');
    });
    await expect(checkPublic(EN_CANONICAL, down.fn)).rejects.toThrow(
      'unreachable',
    );
    const ok = mockFetch(() => new Response('x', { status: 200 }));
    await expect(checkPublic(EN_CANONICAL, ok.fn)).resolves.toBeUndefined();
  });
});

describe('distribution metadata validation', () => {
  test('accepts valid input', () => {
    expect(() =>
      validateDistributionInput(
        { devtoTags: ['a'], linkedinText: `t ${PT_CANONICAL}` },
        PT_CANONICAL,
      ),
    ).not.toThrow();
  });
  test('rejects tag count outside 1..4', () => {
    expect(() =>
      validateDistributionInput({ devtoTags: [] }, EN_CANONICAL),
    ).toThrow('1 to 4');
    expect(() =>
      validateDistributionInput(
        { devtoTags: ['a', 'b', 'c', 'd', 'e'] },
        EN_CANONICAL,
      ),
    ).toThrow('1 to 4');
  });
  test('rejects linkedin text without the canonical URL or too long', () => {
    expect(() =>
      validateDistributionInput({ linkedinText: 'no link here' }, PT_CANONICAL),
    ).toThrow('canonical URL');
    expect(() =>
      validateDistributionInput(
        { linkedinText: `x ${PT_CANONICAL}`.padEnd(3001, 'y') },
        PT_CANONICAL,
      ),
    ).toThrow('3000');
  });
});

describe('DEV.to payload and API', () => {
  test('builds a complete payload with canonical_url', () => {
    const payload = buildDevtoPayload(enArticle());
    expect(payload.published).toBe(true);
    expect(payload.canonical_url).toBe(EN_CANONICAL);
    expect(payload.tags).toEqual(['webdev', 'astro']);
  });
  test('refuses to build without canonical or tags', () => {
    expect(() => buildDevtoPayload(enArticle({ distribution: {} }))).toThrow();
    expect(() => buildDevtoPayload(enArticle({ canonicalUrl: '' }))).toThrow(
      'canonical',
    );
  });
  test('finds an existing post by the EN canonical across pages', async () => {
    const { fn, calls } = mockFetch((url) => {
      if (url.includes('page=2'))
        return jsonResponse([
          { id: 7, url: 'u7', canonical_url: EN_CANONICAL },
        ]);
      return jsonResponse([{ id: 1, url: 'u1', canonical_url: 'other' }]);
    });
    const found = await findByCanonical('k', EN_CANONICAL, fn);
    expect(found?.id).toBe('7');
    expect(calls.length).toBe(2);
  });
  test('ignores a stale PT post when looking up the EN canonical', async () => {
    const { fn } = mockFetch((url) => {
      if (url.includes('page=2')) return jsonResponse([]);
      return jsonResponse([{ id: 3, url: 'u3', canonical_url: PT_CANONICAL }]);
    });
    const found = await findByCanonical('k', EN_CANONICAL, fn);
    expect(found).toBeNull();
  });
  test('returns null when nothing matches and fails on lookup errors', async () => {
    const empty = mockFetch(() => jsonResponse([]));
    expect(await findByCanonical('k', EN_CANONICAL, empty.fn)).toBeNull();
    const bad = mockFetch(() => new Response('x', { status: 500 }));
    await expect(findByCanonical('k', EN_CANONICAL, bad.fn)).rejects.toThrow(
      'lookup failed',
    );
  });
  test('publishes once and maps failures without leaking the key', async () => {
    const { fn, calls } = mockFetch(() =>
      jsonResponse({ id: 9, url: 'https://dev.to/x/9' }),
    );
    const done = await publishDevto(
      'secret-key',
      buildDevtoPayload(enArticle()),
      fn,
    );
    expect(done).toMatchObject({ id: '9', url: 'https://dev.to/x/9' });
    expect(calls.length).toBe(1);
    for (const status of [401, 422, 429, 500]) {
      const failing = mockFetch(() => new Response('err', { status }));
      await expect(
        publishDevto('secret-key', buildDevtoPayload(enArticle()), failing.fn),
      ).rejects.toThrow(/HTTP (401|422|429|500)/);
    }
    try {
      const failing = mockFetch(() => new Response('err', { status: 401 }));
      await publishDevto(
        'secret-key',
        buildDevtoPayload(enArticle()),
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
    const payload = buildLinkedinPayload(ptArticle(), urn);
    expect(payload).toMatchObject({
      author: urn,
      visibility: 'PUBLIC',
      lifecycleState: 'PUBLISHED',
    });
  });
  test('rejects bad URN, missing text and missing canonical', () => {
    expect(() => buildLinkedinPayload(ptArticle(), 'nope')).toThrow('URN');
    expect(() =>
      buildLinkedinPayload(ptArticle({ distribution: {} }), urn),
    ).toThrow('required');
    expect(() =>
      buildLinkedinPayload(
        ptArticle({ distribution: { linkedinText: 'no link' } }),
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
      buildLinkedinPayload(ptArticle(), urn),
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
  test('sends LinkedIn-Version 202608 with Restli 2.0.0', async () => {
    const { fn, calls } = mockFetch(
      () =>
        new Response('{}', {
          status: 201,
          headers: { 'x-restli-id': 'urn:li:ugcPost:1' },
        }),
    );
    await publishLinkedin('tok', buildLinkedinPayload(ptArticle(), urn), fn);
    const first = calls[0];
    if (!first?.init) throw new Error('expected one LinkedIn request');
    const headers = first.init.headers as Record<string, string>;
    expect(headers['LinkedIn-Version']).toBe('202608');
    expect(headers['X-Restli-Protocol-Version']).toBe('2.0.0');
  });
  test('maps auth, validation and rate-limit failures without leaking the token', async () => {
    const token = 'distinct-fake-token-xyz';
    for (const [status, pattern] of [
      [401, /token/i],
      [422, /422/],
      [429, /rate limit/i],
    ] as const) {
      const failing = mockFetch(() => new Response('e', { status }));
      await expect(
        publishLinkedin(
          token,
          buildLinkedinPayload(ptArticle(), urn),
          failing.fn,
        ),
      ).rejects.toThrow(pattern);
    }
    try {
      const failing = mockFetch(() => new Response('e', { status: 401 }));
      await publishLinkedin(
        token,
        buildLinkedinPayload(ptArticle(), urn),
        failing.fn,
      );
    } catch (error) {
      expect(String(error)).not.toContain(token);
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

describe('ledger canonical-aware skip', () => {
  test('stale DEV.to state never blocks the EN publication', () => {
    expect(isPublishedFor(undefined, EN_CANONICAL)).toBe(false);
    // Entry written before canonicalUrl existed (the mistaken PT post).
    expect(isPublishedFor({ id: '3', url: 'u3', at: 't' }, EN_CANONICAL)).toBe(
      false,
    );
    // Entry recording the old PT canonical.
    expect(
      isPublishedFor(
        { id: '3', url: 'u3', at: 't', canonicalUrl: PT_CANONICAL },
        EN_CANONICAL,
      ),
    ).toBe(false);
  });
  test('matching canonical causes skip, per channel', () => {
    expect(
      isPublishedFor(
        { id: '9', url: 'u9', at: 't', canonicalUrl: EN_CANONICAL },
        EN_CANONICAL,
      ),
    ).toBe(true);
    expect(
      isPublishedFor(
        { id: '9', url: 'u9', at: 't', canonicalUrl: EN_CANONICAL },
        PT_CANONICAL,
      ),
    ).toBe(false);
  });
  test('partial failure persists only the successful channel', () => {
    // Simulates the ledger file after DEV.to succeeded and LinkedIn failed:
    // distribute.ts writes the entry with both fields preserved.
    const written = JSON.stringify({
      [SLUG]: {
        devto: {
          id: '9',
          url: 'https://dev.to/x/9',
          at: '2026-09-13T00:00:00.000Z',
          canonicalUrl: EN_CANONICAL,
        },
      },
    });
    const reloaded = readLedger(written);
    expect(isPublishedFor(reloaded[SLUG]?.devto, EN_CANONICAL)).toBe(true);
    expect(isPublishedFor(reloaded[SLUG]?.linkedin, PT_CANONICAL)).toBe(false);
  });
});
