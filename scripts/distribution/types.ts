// Shared types for Phase 1 content distribution (DEV.to + LinkedIn).
// No secrets are ever stored in these structures.

export const ORIGIN = 'https://marcelotaparelli.com.br';

export interface DistributionInput {
  devtoTags?: string[];
  linkedinText?: string;
}

export interface ResolvedArticle {
  slug: string;
  translationKey: string;
  title: string;
  description: string;
  markdown: string;
  canonicalUrl: string;
  distribution: DistributionInput;
}

/**
 * Bilingual article pair for distribution.
 * DEV.to publishes exclusively from `en` (canonical /en/articles/…);
 * LinkedIn posts exclusively from `pt` (canonical /artigos/…).
 * No runtime translation: both versions already exist in the repo.
 */
export interface ResolvedPair {
  slug: string;
  translationKey: string;
  pt: ResolvedArticle;
  en: ResolvedArticle;
}

export type ChannelStatus =
  'published' | 'already-published' | 'failed' | 'skipped';

export interface ChannelResult {
  channel: 'devto' | 'linkedin';
  status: ChannelStatus;
  url?: string;
  remoteId?: string;
  error?: string;
}

export interface LedgerChannelState {
  id: string;
  url: string;
  at: string;
  /**
   * Canonical URL that was published. Entries written before this field
   * existed (e.g. the mistaken PT post on DEV.to) carry no canonical or a
   * stale one, and must NOT satisfy the skip check for the current
   * canonical. Always compare before skipping.
   */
  canonicalUrl?: string;
}

export interface LedgerEntry {
  devto?: LedgerChannelState;
  linkedin?: LedgerChannelState;
}

export type Ledger = Record<string, LedgerEntry>;

export interface DevtoPayload {
  title: string;
  body_markdown: string;
  published: boolean;
  tags: string[];
  canonical_url: string;
  description: string;
}

export interface LinkedinPayload {
  author: string;
  commentary: string;
  visibility: 'PUBLIC';
  lifecycleState: 'PUBLISHED';
}

export type FetchFn = typeof fetch;
