// LinkedIn channel (official Posts API). The author URN comes from the
// LINKEDIN_PERSON_URN variable — never derived, never logged.
// Idempotency relies on the ledger: the API offers no reliable
// content lookup, which is documented rather than worked around.

import type {
  FetchFn,
  LedgerChannelState,
  LinkedinPayload,
  ResolvedArticle,
} from './types';

const API = 'https://api.linkedin.com/rest/posts';
const API_VERSION = '202608';

export function buildLinkedinPayload(
  article: ResolvedArticle,
  authorUrn: string,
): LinkedinPayload {
  const text = article.distribution.linkedinText;
  if (!authorUrn || !authorUrn.startsWith('urn:li:person:'))
    throw new Error('invalid LinkedIn author URN');
  if (!text || text.trim().length === 0)
    throw new Error('linkedin text is required in frontmatter');
  if (text.length > 3000)
    throw new Error('linkedin text exceeds 3000 characters');
  if (!text.includes(article.canonicalUrl))
    throw new Error('linkedin text must contain the canonical URL');
  return {
    author: authorUrn,
    commentary: text,
    visibility: 'PUBLIC',
    lifecycleState: 'PUBLISHED',
  };
}

export async function publishLinkedin(
  accessToken: string,
  payload: LinkedinPayload,
  fetchFn: FetchFn = fetch,
): Promise<LedgerChannelState> {
  // Single request. The token travels only in this Authorization header;
  // every error below reports status codes, never credential material.
  const response = await fetchFn(API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'LinkedIn-Version': API_VERSION,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: payload.author,
      commentary: payload.commentary,
      visibility: payload.visibility,
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: payload.lifecycleState,
      isReshareDisabledByAuthor: false,
    }),
  });
  if (response.status === 401 || response.status === 403)
    throw new Error(
      'LinkedIn rejected the access token (HTTP ' +
        response.status +
        '); rotate LINKEDIN_ACCESS_TOKEN',
    );
  if (response.status === 422)
    throw new Error('LinkedIn rejected the post payload (HTTP 422)');
  if (response.status === 429)
    throw new Error('LinkedIn rate limit hit (HTTP 429)');
  if (response.status !== 201)
    throw new Error(`LinkedIn publish failed: HTTP ${response.status}`);
  const remoteId = response.headers.get('x-restli-id');
  if (!remoteId) throw new Error('LinkedIn returned no post id');
  // The API returns a URN, not a share URL; it is stored as-is so a
  // human can locate the post. No URL is fabricated here.
  return { id: remoteId, url: remoteId, at: new Date().toISOString() };
}
