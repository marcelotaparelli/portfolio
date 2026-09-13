// DEV.to (Forem API) channel. Lookup by canonical_url makes re-runs safe
// even if the ledger diverges; the ledger remains the primary record.

import type {
  DevtoPayload,
  FetchFn,
  LedgerChannelState,
  ResolvedArticle,
} from './types';

const API = 'https://dev.to/api';

export function buildDevtoPayload(article: ResolvedArticle): DevtoPayload {
  const tags = article.distribution.devtoTags;
  if (!tags || tags.length < 1 || tags.length > 4)
    throw new Error('devto requires 1 to 4 tags in frontmatter');
  if (!article.canonicalUrl) throw new Error('canonical_url is required');
  return {
    title: article.title,
    body_markdown: article.markdown,
    published: true,
    tags,
    canonical_url: article.canonicalUrl,
    description: article.description,
  };
}

interface DevtoArticle {
  id: number;
  url: string;
  canonical_url: string;
}

async function authedGet(
  apiKey: string,
  path: string,
  fetchFn: FetchFn,
): Promise<Response> {
  return fetchFn(`${API}${path}`, {
    headers: { 'api-key': apiKey, Accept: 'application/vnd.forem.api-v1+json' },
  });
}

/** Find an already-published article owned by the key, by canonical URL. */
export async function findByCanonical(
  apiKey: string,
  canonicalUrl: string,
  fetchFn: FetchFn = fetch,
): Promise<LedgerChannelState | null> {
  let page = 1;
  for (;;) {
    const response = await authedGet(
      apiKey,
      `/articles/me?per_page=100&page=${page}`,
      fetchFn,
    );
    if (!response.ok)
      throw new Error(`DEV.to lookup failed: HTTP ${response.status}`);
    const items = (await response.json()) as DevtoArticle[];
    if (!Array.isArray(items) || items.length === 0) return null;
    const found = items.find((item) => item.canonical_url === canonicalUrl);
    if (found)
      return {
        id: String(found.id),
        url: found.url,
        at: new Date().toISOString(),
      };
    page += 1;
  }
}

export async function publishDevto(
  apiKey: string,
  payload: DevtoPayload,
  fetchFn: FetchFn = fetch,
): Promise<LedgerChannelState> {
  const response = await fetchFn(`${API}/articles`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.forem.api-v1+json',
    },
    body: JSON.stringify({ article: payload }),
  });
  if (response.status === 401 || response.status === 403)
    throw new Error(
      'DEV.to rejected the API key (HTTP ' + response.status + ')',
    );
  if (response.status === 422)
    throw new Error('DEV.to rejected the payload (HTTP 422)');
  if (response.status === 429)
    throw new Error('DEV.to rate limit hit (HTTP 429)');
  if (!response.ok)
    throw new Error(`DEV.to publish failed: HTTP ${response.status}`);
  const created = (await response.json()) as DevtoArticle;
  if (!created?.id || !created?.url)
    throw new Error('DEV.to returned an unexpected response');
  return {
    id: String(created.id),
    url: created.url,
    at: new Date().toISOString(),
  };
}
