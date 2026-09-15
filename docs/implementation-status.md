# Implementation status

Date: 2026-09-15. All quality gates below were re-verified on this date
(previous full verification: 2026-09-13).
Previous lab numbers (perf 1 / a11y 1, LCP ~1654 ms, CLS ~0.0006, TBT 0,
~93.5 KB transfer on Home mobile simulation) are **laboratory measurements,
not real-user Core Web Vitals**. Never present them as production RUM data.
Fresh lab numbers for this build are in `reports/lighthouse-summary.json`
and `reports/assets.json`.

## Quality gates (all green)

| Gate                       | Command                                         | Result                                             |
| -------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| Typecheck                  | `bun typecheck`                                 | 0 errors, 0 warnings                               |
| Lint                       | `bun lint`                                      | clean                                              |
| Format                     | `bun format:check`                              | clean (normalized with `bun format` on 2026-09-13) |
| Unit                       | `bun test`                                      | 37 pass                                            |
| Production build           | `bun run build`                                 | 24 pages, drafts excluded                          |
| Production artifacts       | `bun scripts/check-artifacts.ts dist`           | 24 documents checked, clean                        |
| Preview build              | `bun run build:preview`                         | 24 pages (no drafts remain)                        |
| Preview artifacts          | `bun scripts/check-artifacts.ts dist --preview` | 24 documents checked, clean                        |
| E2E (against preview dist) | `bun test:e2e`                                  | 13 passed                                          |
| Dev server                 | `bun dev`                                       | serves `0.0.0.0:3000`, strictPort configured       |
| Release readiness          | `bun check:release`                             | ready                                              |

## Bugs fixed on 2026-09-13

1. **Broken `/404/` link on the PT 404 page (code bug, now fixed).**
   `src/components/Header.astro` used `Astro.url.pathname` as the
   language-switch self link. On the PT 404 page that renders as `/404/`
   under `trailingSlash: 'always'`, but Astro special-cases `404.astro`
   into `dist/404.html`, so `/404/` never exists. The fix: when
   `page === 'notFound'`, link `pathFor('notFound', locale)` instead
   (`/404.html` for pt-BR, `/en/404/` for en). This is the correct
   publication model — `404.html` is the static-host 404 document and
   `/en/404/` is a regular page — so the validator was right and needed no
   special-casing. Rejected alternative: renaming the route to `/404/`,
   which is impossible with Astro's special `404.astro` and would break
   static-host 404 handling.
2. **Formatting drift (hygiene, now fixed).** 55 files failed
   `bun format:check` because the repo had never been normalized with its
   own Prettier config. Fixed with `bun format`; no semantic changes.

## Known non-issues (do not "fix")

- `No files found matching "**/*.mdx" in directory "src/content/articles"`
  during `astro check` / `build`: historical (2026-09-13 state, when the
  articles collection was still empty). The launch article has since been
  written and published, so this warning no longer applies.
- `The collection "articles" does not exist or is empty` build warnings:
  same historical cause, no longer applicable.
- `bun typecheck` failure reported in a previous session no longer
  reproduces (0 errors). No code change was needed for it.

## Editorial pendencies (resolved 2026-09-15)

These were content, not code. All resolved — `bun check:release` passes.
History kept below; do not re-invent resolved items:

1. `bun check:release` failed on: 6 project files awaiting bilingual
   editorial approval (`status: draft`, `reviewed: false`); missing
   bilingual article `portfolio-decisions`; missing reviewed résumé PDFs
   (`public/cv/marcelo-taparelli-pt-br.pdf`,
   `public/cv/marcelo-taparelli-en.pdf`).
   Resolved: all 5 project cases + the article are published and reviewed
   in both languages; both CV PDFs are reviewed (`reviewed: true`) and
   regenerated from source (1 A4 page each).
2. Launch article (write only with real build measurements in hand):
   PT "Por que construí meu portfólio com Bun + Astro + MDX em vez de
   usar uma stack mais complexa" / EN "Why I Built My Portfolio with Bun
   - Astro + MDX Instead of a More Complex Stack". Measurements are now
     available (`reports/lighthouse-summary.json`, `reports/assets.json`).
     Status 2026-09-13: both drafts written
     (`src/content/articles/{pt-br,en}/portfolio-bun-astro-mdx.mdx`,
     `translationKey: portfolio-decisions`, `status: draft`,
     `reviewed: false`, no `publishedAt` yet) and validated in preview
     (canonical + reciprocal alternates, noindex, awaiting your review;
     NOT switched to published).
     Update 2026-09-13: article approved and published
     (`status: published`, `reviewed: true`, `publishedAt: 2026-09-12`
     both languages). Production build now has 14 pages; article verified
     in listings, home pages, sitemap, canonical/hreflang, no noindex.
     Update 2026-09-13: all 3 cases approved and published
     (`status: published`, `reviewed: true` both languages; projects carry
     no `publishedAt` by schema, ordering via `order`). Production build
     now has 20 pages; all 6 case URLs verified (listings, reciprocal
     language switch, canonical + 3 alternates, sitemap, indexable, home
     order Catus → EVAG → Drive). `check:release` now fails only on the
     two missing reviewed CV PDFs.
3. Résumés PT-BR and EN to be supplied by the user.
   Resolved 2026-09-13: user-supplied content incorporated; PDFs generated
   from versioned `cv/*.html` source (see CV section below).

## Distribution — Phase 1 (DEV.to + LinkedIn, 2026-09-13)

- Pipeline code already present and kept as-is: `scripts/distribution/`
  (`types`, `article`, `devto`, `linkedin`, `distribute`), workflow
  `.github/workflows/distribute-content.yml` (manual dispatch, ledger on
  the `distribution-state` branch, never main), schema
  `distribution` in `src/content.config.ts`, tests
  `tests/unit/distribution.test.ts`.
- Fixes applied (no rework of existing design):
  `distribute.ts` strict-TS narrowing for `--slug`/`--ledger`
  (`noUncheckedIndexedAccess`); `splitFrontmatter` strips the single
  leading newline so `body` has no blank-line prefix; test mock for
  DEV.to pagination now matches `page=2` (the old `page=1` substring
  also matched `per_page=100`, causing an infinite lookup loop that
  OOM-killed the runner); test `calls[0]` access narrowed.
- Content: PT article `portfolio-bun-astro-mdx` now carries reviewed
  `distribution` input (`devto.tags`: webdev, astro, bun, showdev;
  `linkedin.text` PT-BR with canonical URL, 550 chars). EN article
  intentionally untouched (pipeline distributes from the PT source).
- Gates: `bun typecheck` 0 errors, `bun lint` clean,
  `bun format:check` clean, `bun test tests/unit` 26 pass,
  `astro sync` clean, distribution dry-run (resolve + build both
  payloads, no network, no publish) OK. No real publication, no deploy,
  production untouched.

## Distribution — bilingual correction (DEV.to EN + LinkedIn PT, 2026-09-13)

- Root cause of the bad first run: the pipeline resolved only the PT-BR
  file, so DEV.to received the Portuguese version. Fixed model:
  `resolveArticlePair(slug)` resolves the PT-BR + EN pair, fails closed
  unless both are published, reviewed, dated, share `translationKey`
  and carry the same slug; EN must provide `devto.tags`, PT must
  provide the LinkedIn copy (each validated against its own canonical).
- Channel split: DEV.to publishes exclusively from EN (`title`,
  `description`, `markdown`, canonical
  `https://marcelotaparelli.com.br/en/articles/<slug>/`); LinkedIn
  posts exclusively from PT-BR (custom copy, canonical
  `https://marcelotaparelli.com.br/artigos/<slug>/`). No runtime
  translation; single human approval (`workflow_dispatch` + slug) kept.
- Frontmatter: `devto.tags` moved PT → EN; PT keeps only
  `linkedin.text`. `src/content.config.ts` schema unchanged (already
  supports both blocks); only the convention comment was clarified.
- LinkedIn `LinkedIn-Version` was already `202608` (kept, now covered
  by a header test); `X-Restli-Protocol-Version: 2.0.0` unchanged.
- Ledger: `LedgerChannelState` gained optional `canonicalUrl`. Skip
  (`isPublishedFor`) requires the recorded canonical to equal the
  expected one, so the stale PT `devto` entry (no canonical) cannot
  block the EN publication. DEV.to remote lookup by EN `canonical_url`
  is kept as authoritative fallback. Partial failure still persists
  the successful channel; the next run skips it and retries the other.
- Tests: `tests/unit/distribution.test.ts` rewritten around the pair
  (33 distribution tests): pair resolution, EN→DEV.to content +
  canonical, PT→LinkedIn copy + canonical, key mismatch, missing EN,
  draft/unreviewed either side, missing tags/text, stale-PT lookup,
  canonical-aware skip, partial-failure round-trip, header version,
  secret redaction. Full suite 37 pass.
- Gates re-verified: typecheck 0 errors, lint clean, format clean,
  `bun test` 37 pass, `check-release` ready, production build 20 pages
  - `check-artifacts.ts dist` clean. No real publish, no deploy, no
    commit. The mistaken PT post on DEV.to must still be deleted manually.

## CV generation — reproducible source (2026-09-13)

- CVs are now generated from versioned source: `cv/pt-br.html`,
  `cv/en.html`, `cv/cv.css` via `bun run cv:generate`
  (`scripts/generate-cv.ts`, Playwright/Chromium, repo-local Inter
  fonts — no new dependencies). Outputs are the same reviewed paths
  (`public/cv/*.pdf`, `reviewed: true` kept).
- Content is the previous PDFs' factual content, plus the multichannel
  distribution evidence inside the Portfolio project line (PT/EN
  base texts). Nothing invented; Alura line compacted to hold 1 page.
- Guarantees, fail-closed: webfonts awaited before measuring/printing,
  single A4 (`@page`, `preferCSSPageSize`), content-overflow check +
  exactly-1-page PDF byte check per locale. Verified: 1 page each, A4
  (595×842pt), clickable `mailto`/site/LinkedIn/GitHub link
  annotations, PT bottom headroom ~37px / EN ~55px.
- Site case: no separate portfolio project created per decision; the
  `portfolio-bun-astro-mdx` article subsection (both languages) carries
  the evidence.
- Gates re-verified after regeneration: typecheck 0 errors, lint
  clean, format clean, `bun test` 37 pass, production build 20 pages +
  `check-artifacts.ts dist` clean, `check-release` ready. No deploy,
  no publish, no commit.
- Update 2026-09-15: CV lines evolved with positioning work (TDD added to
  the Engenharia/Engineering line with `princípios de DDD` / `DDD
principles` softening; `fundamentos de microsserviços` / `microservices
fundamentals` kept; ops-triage-ai added as a third `Projeto público` /
  `Public project` paragraph). Compactions to hold 1 page were measured
  line-by-line: Alura line (PT/EN), Portfolio paragraph (PT/EN), Salus
  tail (PT/EN), PO bullet (PT) and its EN mirror, AI-assisted line (EN).
  No experience entries, dates, or claims removed. Regenerated via
  `bun run cv:generate`: 1 A4 page each, PT/EN bottom headroom 15.9px.

## Salus — backend API case + CV evidence (2026-09-13)

- New bilingual project `salus` (`src/content/projects/{pt-br,en}/`
  `salus.mdx`, `translationKey: salus`, `order: 4`, published + reviewed
  both languages). Routes `/projetos/salus/` + `/en/projects/salus/`
  (same slug both locales, as `google-drive-wordpress`). No page,
  component, schema, or layout changes: cards, case pages, canonical,
  hreflang, and sitemap are all data-driven from frontmatter.
- Case content (PT professional, EN technical, no literal translation):
  problem, layered-architecture decisions, HTTP→…→PostgreSQL flow,
  domain invariants (CPF check digits etc.), 47 tests (36 unit + 11
  integration, real PostgreSQL), CI chain, security allow-list, honest
  trade-offs and limitations (JWT issued but no auth middleware — no
  route described as protected; no RBAC/refresh/pagination/rate
  limiting/observability).
- `externalUrl: https://github.com/marcelotaparelli/salus` uses the
  existing generic external-link pattern (`Visitar site` / `Visit
website`); no live demo invented. A custom per-project CTA label
  would have required schema + layout changes, so the pattern was kept.
- `scripts/check-release.ts` expected set gained `salus` (pair guard);
  E2E extended in-pattern: Salus page pair (reciprocal SEO) + PT/EN
  external-link expectations for the GitHub URL.
- CVs: Salus added as a second `Projeto público` / `Public project`
  paragraph in `cv/{pt-br,en}.html` (base texts, lightly compacted);
  PT also trimmed the PO bullets and the Engenharia line to hold one
  page. Regenerated via `bun run cv:generate`: 1 A4 page each
  (pdfinfo-confirmed), clickable mailto/site/LinkedIn/GitHub links,
  ~18px bottom headroom each.
- Gates: typecheck 0 errors, lint clean, format clean, `bun test` 37
  pass, production build 22 pages + `check-artifacts.ts dist` clean
  (both modes during the run), `check-release` ready, E2E 13 pass
  against preview build. `dist/` left holding a production build. No
  deploy, no publish, no commit.

## Positioning — TDD evidence for Salus (commit 5b9b35c, 2026-09-14)

- Correction of the earlier audit conclusion (tests exist ≠ TDD proven):
  per the author's factual statement, Salus was developed manually with
  TDD guiding rules and use cases, without AI-generated code. No
  red-green-refactor claims about specific commits; scope limited to
  Salus + the skills lines, never generalized to ops-triage-ai or
  employer work, no specialist titles.
- `cv/{pt-br,en}.html` Engenharia/Engineering lines now read `Clean
Architecture, princípios de DDD / DDD principles, SOLID, Clean Code,
TDD, fundamentos de microsserviços / microservices fundamentals, …`
  (microsserviços kept in both). `src/data/skills.ts` mirrors the same
  wording. Salus cases gained one factual TDD + manual-implementation
  paragraph each (PT/EN) in Quality; nothing else in the cases changed.
- PDFs regenerated from source (1 A4 page each). Identity for the commit
  passed via `git -c` flags; no `git config` touched.

## ops-triage-ai — Applied AI case publication (commit d5a25cd, 2026-09-15)

- New bilingual project `ops-triage-ai`
  (`src/content/projects/{pt-br,en}/ops-triage-ai.mdx`,
  `translationKey: ops-triage-ai`, same slug both locales as `salus`,
  `order: 0`, published + reviewed both languages). Routes
  `/projetos/ops-triage-ai/` + `/en/projects/ops-triage-ai/`, first in
  home/projects listings; Salus and all other cases untouched. No page,
  component, schema, or layout changes — data-driven from frontmatter.
- Case content: problem, hybrid architecture (deterministic baseline +
  local Ollama LLM + pure HybridPolicy, no field-merge), persisted
  lifecycle with append-only feedback, security/observability allow-list,
  frozen held-out methodology (70 synthetic tickets, single run, commit
  `f36e8ef…`, prompt `ollama-triage-v3`, qwen2.5:7b-instruct-q5_K_S,
  120s timeout), official results table (e.g. category 0.8286→0.9571,
  HIGH/CRITICAL recall 0.7857→1.0, risk-accuracy regression disclosed),
  operations (review 0.5143, disagreement 0.3286, 0 fallback, p50/p95/max
  latency), trade-offs, 13 published limitations, evidence links (repo +
  official report + machine-readable artifact). No prohibited claims
  (no "LLM best at everything", no production validation, no calibrated
  confidence, no review P/R, no suggested-team correctness).
- `scripts/check-release.ts` expected set gained `ops-triage-ai`; E2E
  extended in-pattern: page pair (reciprocal SEO) + PT/EN external-link
  expectations for the GitHub URL.
- `src/data/skills.ts` AI skill extended contextually (LLM integration
  with evaluation, hybrid human-in-the-loop systems, audit trail); main
  Engineering skill untouched. `about.learningText` (PT/EN) gained one
  sentence on the completed case — no metrics duplicated outside the
  MDX sources.
- CVs: ops-triage-ai added as a third `Projeto público` / `Public
project` paragraph (hybrid architecture, frozen held-out, headline
  result, risk honesty). Regenerated via `bun run cv:generate`: 1 A4
  page each, PT/EN headroom 15.9px.
- Gates: typecheck 0 errors, lint clean, format clean, `bun test` 37
  pass, production build 24 pages + `check-artifacts.ts dist` clean,
  preview build 24 pages + `--preview` clean, `check-release` ready,
  E2E 13 pass against preview build (new pair included). `dist/` left
  holding a production build (24 pages, sitemap lists both new URLs
  first among projects). No deploy, no publish, no push.

## Environment notes

- `git` 2.47.3 is available in this container and history is usable
  (`git log`/`status`/`show` verified; commits created with `git -c`
  identity flags, no `git config` touched). Earlier notes claiming no
  git binary are outdated.
- Playwright browsers + OS deps (`libglib` etc.) were missing and were
  installed via `bunx --bun playwright install chromium` and
  `bunx --bun playwright install-deps chromium`. If E2E fails with
  `Executable doesn't exist` or `libglib-2.0.so.0`, reinstall those.
- No `curl`/`ps`/`pkill` in this container; use `bun -e 'fetch(...)'` and
  `/proc` scans to probe/kill background servers.
- `dist/` currently holds a **production** build (24 pages, includes
  `/projetos/ops-triage-ai/` + `/en/projects/ops-triage-ai/` and both
  URLs in `sitemap.xml`). Rebuild with `bun run build:preview` before
  running the E2E suite, which serves `dist` on `:3100` (preview
  noindex expected).
