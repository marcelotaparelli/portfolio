// Phase 1 content distribution CLI (DEV.to + LinkedIn).
// Single manual execution: bun scripts/distribution/distribute.ts --slug <pt-slug> --ledger <path>
// Secrets come only from the environment and are never printed.
// Exit 0: every requested channel published or already-published.
// Exit 1: any channel failed (including fail-closed validation).

import { checkPublic, DistributionError, resolveArticle } from './article';
import { buildDevtoPayload, findByCanonical, publishDevto } from './devto';
import { buildLinkedinPayload, publishLinkedin } from './linkedin';
import type {
  ChannelResult,
  Ledger,
  LedgerEntry,
  ResolvedArticle,
} from './types';

function usage(): never {
  console.error(
    'usage: bun scripts/distribution/distribute.ts --slug <pt-slug> --ledger <path>',
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
  let article: ResolvedArticle | null = null;

  try {
    article = await resolveArticle(slug);
    await checkPublic(article.canonicalUrl);
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

  const resolved = article as ResolvedArticle;
  results.push(
    await runChannel(
      'devto',
      async () => {
        const existing = await findByCanonical(devtoKey, resolved.canonicalUrl);
        if (existing) {
          entry.devto = existing;
          return {
            url: existing.url,
            remoteId: existing.id,
            preexisting: true,
          };
        }
        const done = await publishDevto(devtoKey, buildDevtoPayload(resolved));
        entry.devto = done;
        return { url: done.url, remoteId: done.id };
      },
      entry.devto !== undefined,
      secrets,
    ),
  );
  // Skip means zero API calls: the ledger is the source of truth.
  // The remote DEV.to lookup inside the publish path protects the case
  // where the ledger lacks an entry but the post already exists.

  results.push(
    await runChannel(
      'linkedin',
      async () => {
        const done = await publishLinkedin(
          linkedinToken,
          buildLinkedinPayload(resolved, linkedinUrn),
        );
        entry.linkedin = done;
        return { url: done.url, remoteId: done.id };
      },
      entry.linkedin !== undefined,
      secrets,
    ),
  );

  ledger[slug] = entry;
  await Bun.write(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
  printSummary(slug, websiteOk, results);
  if (results.some((result) => result.status === 'failed')) process.exit(1);
}

if (import.meta.main) await main();
