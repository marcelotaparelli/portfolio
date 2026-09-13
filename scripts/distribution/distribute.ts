// Phase 1 content distribution CLI (DEV.to + LinkedIn).
// Single manual execution: bun scripts/distribution/distribute.ts --slug <slug> --ledger <path>
// The slug identifies a PT-BR + EN article pair: DEV.to publishes
// exclusively from EN (canonical /en/articles/…), LinkedIn posts
// exclusively from PT-BR (canonical /artigos/…).
// Secrets come only from the environment and are never printed.
// Exit 0: every requested channel published or already-published.
// Exit 1: any channel failed (including fail-closed validation).

import { checkPublic, DistributionError, resolveArticlePair } from './article';
import { buildDevtoPayload, findByCanonical, publishDevto } from './devto';
import { buildLinkedinPayload, publishLinkedin } from './linkedin';
import type {
  ChannelResult,
  Ledger,
  LedgerChannelState,
  LedgerEntry,
  ResolvedPair,
} from './types';

function usage(): never {
  console.error(
    'usage: bun scripts/distribution/distribute.ts --slug <slug> --ledger <path>',
  );
  process.exit(2);
}

function redact(message: string, secrets: string[]): string {
  let out = message;
  for (const secret of secrets) {
    if (secret && secret.length > 0) out = out.split(secret).join('***');
  }
  return out;
}

export function readLedger(source: string): Ledger {
  if (source.trim().length === 0) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(source);
  } catch {
    throw new DistributionError('ledger is not valid JSON');
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed))
    throw new DistributionError('ledger must be a JSON object');
  return parsed as Ledger;
}

/**
 * A channel counts as already published only when the ledger records the
 * exact canonical URL expected now. Stale entries — missing canonicalUrl
 * (written before the field existed) or a different one (e.g. the mistaken
 * PT post on DEV.to) — never block a fresh publication.
 */
export function isPublishedFor(
  state: LedgerChannelState | undefined,
  canonicalUrl: string,
): boolean {
  return state !== undefined && state.canonicalUrl === canonicalUrl;
}

async function runChannel(
  channel: 'devto' | 'linkedin',
  work: () => Promise<{
    url?: string;
    remoteId?: string;
    preexisting?: boolean;
  }>,
  already: boolean,
  secrets: string[],
): Promise<ChannelResult> {
  if (already) return { channel, status: 'already-published' };
  try {
    const done = await work();
    return {
      channel,
      status: done.preexisting === true ? 'already-published' : 'published',
      url: done.url,
      remoteId: done.remoteId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { channel, status: 'failed', error: redact(message, secrets) };
  }
}

function printSummary(
  slug: string,
  websiteOk: boolean,
  results: ChannelResult[],
): void {
  const line = (channel: string, status: string) =>
    console.log(`${channel}: ${status}`);
  console.log(`Article: ${slug}`);
  console.log(`Website: ${websiteOk ? 'OK' : 'failed'}`);
  for (const result of results) {
    line(
      result.channel === 'devto' ? 'DEV.to' : 'LinkedIn',
      result.error
        ? `failed (${result.error})`
        : result.status === 'already-published'
          ? 'already-published'
          : `published (${result.url ?? result.remoteId ?? 'ok'})`,
    );
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const slugFlag = args.indexOf('--slug');
  const ledgerFlag = args.indexOf('--ledger');
  const slugValue = args[slugFlag + 1];
  const ledgerValue = args[ledgerFlag + 1];
  if (slugFlag === -1 || ledgerFlag === -1 || !slugValue || !ledgerValue)
    usage();
  const slug: string = slugValue;
  const ledgerPath: string = ledgerValue;

  const devtoKey = process.env.DEVTO_API_KEY ?? '';
  const linkedinToken = process.env.LINKEDIN_ACCESS_TOKEN ?? '';
  const linkedinUrn = process.env.LINKEDIN_PERSON_URN ?? '';
  const secrets = [devtoKey, linkedinToken];
  const missing: string[] = [];
  if (!devtoKey) missing.push('DEVTO_API_KEY');
  if (!linkedinToken) missing.push('LINKEDIN_ACCESS_TOKEN');
  if (!linkedinUrn) missing.push('LINKEDIN_PERSON_URN');

  let ledger: Ledger;
  try {
    ledger = readLedger(await Bun.file(ledgerPath).text());
  } catch {
    ledger = {};
  }
  const entry: LedgerEntry = ledger[slug] ?? {};
  const results: ChannelResult[] = [];
  let websiteOk = false;
  let pair: ResolvedPair | null = null;

  try {
    pair = await resolveArticlePair(slug);
    await checkPublic(pair.pt.canonicalUrl);
    await checkPublic(pair.en.canonicalUrl);
    websiteOk = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`Article: ${slug}`);
    console.log(`Website: failed (${redact(message, secrets)})`);
    console.log('DEV.to: failed (article not distributable)');
    console.log('LinkedIn: failed (article not distributable)');
    process.exit(1);
  }

  if (missing.length > 0) {
    printSummary(slug, websiteOk, [
      { channel: 'devto', status: 'failed', error: 'disabled' },
      { channel: 'linkedin', status: 'failed', error: 'disabled' },
    ]);
    console.error(`missing secrets: ${missing.join(', ')}`);
    process.exit(1);
  }

  const resolved = pair as ResolvedPair;
  results.push(
    await runChannel(
      'devto',
      async () => {
        // Remote lookup by the EN canonical is authoritative: it catches a
        // post that exists even when the ledger lacks (or contradicts) it,
        // and it never matches the old mistaken PT post.
        const existing = await findByCanonical(
          devtoKey,
          resolved.en.canonicalUrl,
        );
        if (existing) {
          entry.devto = { ...existing, canonicalUrl: resolved.en.canonicalUrl };
          return {
            url: existing.url,
            remoteId: existing.id,
            preexisting: true,
          };
        }
        const done = await publishDevto(
          devtoKey,
          buildDevtoPayload(resolved.en),
        );
        entry.devto = { ...done, canonicalUrl: resolved.en.canonicalUrl };
        return { url: done.url, remoteId: done.id };
      },
      isPublishedFor(entry.devto, resolved.en.canonicalUrl),
      secrets,
    ),
  );
  // Skip means zero API calls: the ledger is the source of truth, but only
  // when it records the canonical we expect now. The remote DEV.to lookup
  // inside the publish path protects the case where the ledger lacks an
  // entry but the post already exists.

  results.push(
    await runChannel(
      'linkedin',
      async () => {
        const done = await publishLinkedin(
          linkedinToken,
          buildLinkedinPayload(resolved.pt, linkedinUrn),
        );
        entry.linkedin = { ...done, canonicalUrl: resolved.pt.canonicalUrl };
        return { url: done.url, remoteId: done.id };
      },
      isPublishedFor(entry.linkedin, resolved.pt.canonicalUrl),
      secrets,
    ),
  );

  ledger[slug] = entry;
  await Bun.write(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
  printSummary(slug, websiteOk, results);
  if (results.some((result) => result.status === 'failed')) process.exit(1);
}

if (import.meta.main) await main();
