import { describe, expect, test } from 'bun:test';
import {
  projectReader,
  resolveProjectPost,
} from '../../scripts/distribution/project';
import { buildLinkedinPayload } from '../../scripts/distribution/linkedin';
import { buildDevtoPayload } from '../../scripts/distribution/devto';
import type { ArticleReader } from '../../scripts/distribution/article';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const slug = 'defectrisk-ml';
const copyPath = `docs/editorial/${slug}-linkedin.md`;

function modifiedReader(
  transform: (path: string, source: string) => string,
): ArticleReader {
  return {
    ...projectReader,
    readFile: async (path) =>
      transform(path, await projectReader.readFile(path)),
  };
}

describe('project launch distribution', () => {
  test('uses the approved copy exactly and links to the published project pair', async () => {
    const pair = await resolveProjectPost(slug);
    const copy = await Bun.file(copyPath).text();
    const approvedBody = copy.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
    expect(buildLinkedinPayload(pair.pt, 'urn:li:person:test').commentary).toBe(
      approvedBody,
    );
    expect(pair.pt.canonicalUrl).toBe(
      `https://marcelotaparelli.com.br/projetos/${slug}/`,
    );
    expect(pair.en.canonicalUrl).toBe(
      `https://marcelotaparelli.com.br/en/projects/${slug}/`,
    );
    expect(pair.pt.distribution.devtoTags).toBeUndefined();
    const devto = buildDevtoPayload(pair.en);
    expect(devto.canonical_url).toBe(pair.en.canonicalUrl);
    expect(devto.tags).toEqual([
      'ai',
      'machinelearning',
      'python',
      'programming',
    ]);
    expect(devto.body_markdown).toContain('300 of the 421');
    expect(devto.body_markdown).toContain(
      'https://marcelotaparelli.com.br/en/articles/better-models-are-not-enough/',
    );
    expect(devto.body_markdown).not.toContain('Nem todo problema');
  });

  test('rejects drafts and unreviewed project cases in either locale', async () => {
    for (const locale of ['pt-br', 'en']) {
      for (const [before, after] of [
        ['status: published', 'status: draft'],
        ['reviewed: true', 'reviewed: false'],
      ]) {
        const reader = modifiedReader((path, source) =>
          path.includes(`/projects/${locale}/`)
            ? source.replace(before!, after!)
            : source,
        );
        await expect(resolveProjectPost(slug, reader)).rejects.toThrow(
          'not published and reviewed',
        );
      }
    }
  });

  test('rejects a missing locale or mismatched translation identity', async () => {
    await expect(
      resolveProjectPost(slug, {
        ...projectReader,
        listEnFiles: async () => [],
      }),
    ).rejects.toThrow('no published en project');
    const reader = modifiedReader((path, source) =>
      path.includes('/projects/en/')
        ? source.replace(
            'translationKey: defectrisk-ml',
            'translationKey: other',
          )
        : source,
    );
    await expect(resolveProjectPost(slug, reader)).rejects.toThrow(
      'translationKey mismatch',
    );
  });

  test('rejects unapproved copy, wrong slug and wrong language', async () => {
    for (const [before, after] of [
      ['status: approved', 'status: draft'],
      ['reviewed: true', 'reviewed: false'],
      ['slug: defectrisk-ml', 'slug: other'],
      ['locale: pt-BR', 'locale: en'],
    ]) {
      const reader = modifiedReader((path, source) =>
        path === copyPath ? source.replace(before!, after!) : source,
      );
      await expect(resolveProjectPost(slug, reader)).rejects.toThrow(
        'not approved and reviewed',
      );
    }
  });

  test('rejects missing canonical links and oversized copy', async () => {
    const missingLink = modifiedReader((path, source) =>
      path === copyPath
        ? source.replace(
            'https://marcelotaparelli.com.br/projetos/defectrisk-ml/',
            'missing',
          )
        : source,
    );
    await expect(resolveProjectPost(slug, missingLink)).rejects.toThrow(
      'canonical URL',
    );
    const oversized = modifiedReader((path, source) =>
      path === copyPath ? source + 'x'.repeat(3001) : source,
    );
    await expect(resolveProjectPost(slug, oversized)).rejects.toThrow('3000');
  });

  test('rejects traversal and unknown slugs', async () => {
    await expect(resolveProjectPost('../defectrisk-ml')).rejects.toThrow(
      'invalid slug',
    );
    await expect(resolveProjectPost('unknown')).rejects.toThrow(
      'no published pt-BR project',
    );
  });

  test('requires valid DEV.to tags and a nonempty English case', async () => {
    for (const replacement of [
      'tags: []',
      'tags: [a, b, c, d, e]',
      'tags: [42]',
    ]) {
      const reader = modifiedReader((path, source) =>
        path === copyPath
          ? source.replace(
              'tags: [ai, machinelearning, python, programming]',
              replacement,
            )
          : source,
      );
      await expect(resolveProjectPost(slug, reader)).rejects.toThrow(/tags/);
    }
    const emptyCase = modifiedReader((path, source) =>
      path === `src/content/projects/en/${slug}.mdx`
        ? source.match(/^---\n[\s\S]*?\n---\n/)![0]
        : source,
    );
    await expect(resolveProjectPost(slug, emptyCase)).rejects.toThrow(
      'must not be empty',
    );
  });
});

// Exercise the actual CLI with an offline network stub. No external requests.
describe('project launch CLI', () => {
  async function fixture(run: (dir: string) => Promise<void>) {
    const dir = await mkdtemp(join(tmpdir(), 'defectrisk-distribution-'));
    try {
      await Bun.write(join(dir, 'ledger.json'), '{}');
      await Bun.write(join(dir, 'calls.json'), '[]');
      await Bun.write(
        join(dir, 'network.ts'),
        `
        const calls = [];
        globalThis.fetch = async (url, init) => {
          calls.push({ url: String(url), method: init?.method ?? 'GET', body: init?.body });
          await Bun.write(process.env.TEST_CALLS_PATH, JSON.stringify(calls));
          if (String(url).startsWith('https://marcelotaparelli.com.br/')) {
            const locale = String(url).includes('/en/projects/') ? 'en' : 'pt-BR';
            return new Response('', { status: locale === process.env.TEST_FAILED_LOCALE ? Number(process.env.TEST_WEBSITE_STATUS ?? 200) : 200 });
          }
          if (String(url) === 'https://api.linkedin.com/rest/posts')
            return new Response('{}', { status: 201, headers: { 'x-restli-id': 'urn:li:ugcPost:offline-test' } });
          if (String(url).startsWith('https://dev.to/api/articles/me?'))
            return Response.json([]);
          if (String(url) === 'https://dev.to/api/articles')
            return Response.json({ id: 99, url: 'https://dev.to/offline-test/defectrisk' }, { status: Number(process.env.TEST_DEVTO_STATUS ?? 201) });
          throw new Error('Unexpected network request');
        };
      `,
      );
      await run(dir);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }

  async function cli(
    dir: string,
    websiteStatus = '200',
    kind = 'project',
    failedLocale = 'pt-BR',
    devtoStatus = '201',
    devtoKey = 'offline-devto-key',
  ) {
    const child = Bun.spawn(
      [
        process.execPath,
        '--preload',
        join(dir, 'network.ts'),
        'scripts/distribution/distribute.ts',
        '--slug',
        slug,
        '--kind',
        kind,
        '--ledger',
        join(dir, 'ledger.json'),
      ],
      {
        env: {
          ...process.env,
          DEVTO_API_KEY: devtoKey,
          LINKEDIN_ACCESS_TOKEN: 'offline-test-token',
          LINKEDIN_PERSON_URN: 'urn:li:person:offline-test',
          TEST_CALLS_PATH: join(dir, 'calls.json'),
          TEST_WEBSITE_STATUS: websiteStatus,
          TEST_FAILED_LOCALE: failedLocale,
          TEST_DEVTO_STATUS: devtoStatus,
        },
        stdout: 'pipe',
        stderr: 'pipe',
      },
    );
    const [code, stdout, stderr] = await Promise.all([
      child.exited,
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
    ]);
    const calls = (await Bun.file(join(dir, 'calls.json')).json()) as Array<{
      url: string;
      method: string;
      body?: string;
    }>;
    return { code, stdout, stderr, calls };
  }

  test('publishes the English case on DEV.to and approved LinkedIn copy, then skips both on rerun', async () => {
    await fixture(async (dir) => {
      const originalArticle = {
        linkedin: {
          id: 'article-id',
          url: 'article-url',
          at: '2026-10-10',
          canonicalUrl: 'article-canonical',
        },
      };
      await Bun.write(
        join(dir, 'ledger.json'),
        JSON.stringify({ [slug]: originalArticle }),
      );
      const first = await cli(dir);
      expect(first.code).toBe(0);
      expect(first.stdout).toContain('DEV.to: published');
      expect(first.calls.map((call) => call.method)).toEqual([
        'GET',
        'GET',
        'GET',
        'POST',
        'POST',
      ]);
      const body = JSON.parse(first.calls[4]!.body!);
      expect(body.commentary).toBe(
        (await resolveProjectPost(slug)).pt.distribution.linkedinText,
      );
      const ledger = await Bun.file(join(dir, 'ledger.json')).json();
      expect(ledger[slug]).toEqual(originalArticle);
      expect(ledger[`project:${slug}`].devto.id).toBe('99');
      expect(JSON.parse(first.calls[3]!.body!).article).toEqual(
        buildDevtoPayload((await resolveProjectPost(slug)).en),
      );
      expect(ledger[`project:${slug}`].linkedin.id).toBe(
        'urn:li:ugcPost:offline-test',
      );
      const second = await cli(dir);
      expect(second.code).toBe(0);
      expect(second.stdout).toContain('LinkedIn: already-published');
      expect(second.stdout).toContain('DEV.to: already-published');
      expect(second.calls.map((call) => call.method)).toEqual(['GET', 'GET']);
      expect(
        first.stdout + first.stderr + second.stdout + second.stderr,
      ).not.toContain('offline-test-token');
      expect(first.stdout + first.stderr).not.toContain('offline-devto-key');
    });
  });

  test('retries a failed DEV.to publication without reposting successful LinkedIn', async () => {
    await fixture(async (dir) => {
      const failed = await cli(dir, '200', 'project', 'pt-BR', '422');
      expect(failed.code).toBe(1);
      const partial = await Bun.file(join(dir, 'ledger.json')).json();
      expect(partial[`project:${slug}`].linkedin.id).toBe(
        'urn:li:ugcPost:offline-test',
      );
      expect(partial[`project:${slug}`].devto).toBeUndefined();
      const retry = await cli(dir);
      expect(retry.code).toBe(0);
      expect(retry.stdout).toContain('LinkedIn: already-published');
      expect(
        retry.calls
          .filter((call) => call.method === 'POST')
          .map((call) => call.url),
      ).toEqual(['https://dev.to/api/articles']);
    });
  });

  test('requires DEV.to credentials before publishing either channel', async () => {
    await fixture(async (dir) => {
      const result = await cli(dir, '200', 'project', 'pt-BR', '201', '');
      expect(result.code).toBe(1);
      expect(result.stderr).toContain('DEVTO_API_KEY');
      expect(result.calls.some((call) => call.method === 'POST')).toBe(false);
    });
  });

  test('blocks publication when either project URL is unavailable', async () => {
    await fixture(async (dir) => {
      for (const locale of ['pt-BR', 'en']) {
        const result = await cli(dir, '404', 'project', locale);
        expect(result.code).toBe(1);
        expect(result.calls.every((call) => call.method === 'GET')).toBe(true);
        expect(await Bun.file(join(dir, 'ledger.json')).text()).toBe('{}');
      }
    });
  });

  test('rejects corrupt ledgers and unsupported kinds before network access', async () => {
    await fixture(async (dir) => {
      await Bun.write(join(dir, 'ledger.json'), '{broken');
      const corrupt = await cli(dir);
      expect(corrupt.code).toBe(1);
      expect(corrupt.calls).toEqual([]);
      expect(corrupt.stderr).toContain('ledger is not valid JSON');
      const invalid = await cli(dir, '200', 'unsupported');
      expect(invalid.code).toBe(2);
      expect(invalid.calls).toEqual([]);
    });
  });
});
