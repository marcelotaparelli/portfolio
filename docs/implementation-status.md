# Implementation status

## Positioning review — software, AI, security, reliability (2026-09-19)

- Audited Home/About copy, skills, all published project and article topics,
  both CV sources, the Salus and Ops Triage AI cases, and the separate GitHub
  profile README. Software Engineer remains the only professional title;
  Applied AI Engineering remains a direction of depth. Security and
  performance are described as engineering considerations with named
  project evidence, never specialist titles.
- Home/About and skills now mention critical-rule tests, access boundaries,
  validation, secret management, request and concurrency limits, redacted
  logs, observability, and measured latency in context. The Salus case
  distinguishes the manually TDD-built core from the later agent-assisted
  production hardening and documents the implemented authorization,
  pagination, and operational controls. The Ops Triage AI highlight
  references its implemented controls and its frozen benchmark.
- The remote Salus refs checked read-only remain `main` at
  `ead5252b20bcd176a5b6ad873ef4935dc2557d6c` and `deep-clean` at
  `4bf326fbcdfd33dd800931b7d0f82a3b084492b7`; neither contains the current
  hardening state. The local hardening result supplied for this synchronization
  is the authoritative evidence used in the case and article: 64 tests (47
  unit + 17 integration), JWT verification and patient-route enforcement,
  owner-scoped access with cross-user 404, bounded cursor pagination,
  validation, integrity constraints, redacted logs, request correlation,
  health checks, graceful shutdown, migrations, and artifact smoke coverage.
- Current Ops Triage AI HEAD `fa443d79f162fb738dd88ab28a86485ea16e47f1`
  was audited read-only: `src/server.ts` implements API key checks, body and
  concurrency limits, request IDs, metrics, health/readiness, and controlled
  errors; `src/index.ts` handles shutdown; its official held-out artifact
  reports hybrid p50 6257.7313ms, p95 7078.5636ms, max 7556.8916ms.
- CV PT-BR/EN sources and PDFs updated; `bun run cv:generate` confirmed
  exactly one A4 page per locale, 15.9px bottom headroom each.
- Gates: typecheck 0 errors/0 warnings (16 existing hints), lint and format
  clean, 37 unit tests pass, production build 28 pages and artifact check
  clean, preview build 30 pages and artifact check clean, E2E 13 pass.
  `bun check:release` is green after the BOLA pair was approved and
  published. `dist/` currently holds the **preview** build.
- GitHub profile README is in a separate repository; no file there changed.

## CV positioning review — final (2026-09-19)

- `cv/pt-br.html` and `cv/en.html` now keep Software Engineer as the primary
  identity and Applied AI Engineering as the current direction. The summaries
  add reliable, testable software, security, observability, performance, LLM
  systems, measurable evaluation, and production-oriented controls without
  creating specialist titles.
- Applied AI skills now reflect implemented Ops Triage AI evidence: LLM
  integration, structured outputs, deterministic baselines, evals, held-out
  benchmarks, hybrid policies, human review, fallbacks, and AI coding agents
  with human review. RAG was removed as practical experience. AWS remains
  `AWS Cloud fundamentals` only.
- Security wording distinguishes implemented authentication and validation
  from ownership-based authorization now evidenced in the latest Salus
  hardening. Performance wording uses resource
  limits, observability, Core Web Vitals, and measured Ops Triage AI latency;
  no high-performance or specialist claim was added.
- At the time of this CV commit, the remote Salus HEAD available for read-only
  inspection remained `ead5252b20bcd176a5b6ad873ef4935dc2557d6c`. The newer
  hardening evidence supplied from the local development result supersedes
  that older remote snapshot for CV wording: 64 tests (47 unit + 17
  integration), JWT verification with issuer/audience/subject, per-user
  ownership isolation, bounded cursor pagination, request validation, safe
  logs, health/readiness, graceful shutdown, migrations, and artifact smoke
  coverage. The original core remains manually implemented with TDD; the
  later production-hardening phase used AI-assisted workflows under human
  review.
- `bun run cv:generate` produced exactly one A4 page per locale with 4.2px
  bottom headroom. Font size was unchanged; only the bottom sheet padding was
  compacted to preserve the one-page constraint.

## JWT and object authorization article — published (2026-09-19)

- Published the PT-BR and EN pair `jwt-valido-nao-significa-acesso-autorizado`
  with `status: published`, `reviewed: true`, `publishedAt: 2026-09-19`,
  and shared `translationKey`. The article covers BOLA, owner-scoped lookup,
  the 404/403 information-disclosure trade-off, and the concrete RED →
  ownership fix → GREEN regression-test path now implemented in Salus.
- Distribution metadata follows the existing convention: PT-BR LinkedIn
  copy includes the PT canonical (1,407 characters); EN carries DEV.to tags
  `security`, `api`, `backend`, `typescript`. Distribution dry-run resolved
  both canonicals and payloads without network publication.
- New MDX files pass Prettier. The release gate, production and preview
  builds, both artifact validations, and E2E all pass after publication.
- LinkedIn publication convention: every new PT-BR distribution copy should
  contain a concise PT-BR section, a concise EN section, the PT-BR canonical,
  and the EN canonical. This keeps the social post bilingual while directing
  readers to the complete versions on the portfolio site. The distribution
  workflow still receives the shared article slug; the convention is authored
  in each article's `distribution.linkedin.text` field.

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
| Production build           | `bun run build`                                 | 30 pages, drafts excluded                          |
| Production artifacts       | `bun scripts/check-artifacts.ts dist`           | 24 documents checked, clean                        |
| Preview build              | `bun run build:preview`                         | 30 pages (no drafts remain)                        |
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

## Evals article — bilingual publication ready for distribution (2026-09-16)

- New bilingual article `evals-stop-guessing-start-measuring`
  (`src/content/articles/{pt-br,en}/evals-stop-guessing-start-measuring.mdx`,
  `translationKey: evals-stop-guessing-start-measuring`, same slug both
  locales, `status: published`, `reviewed: true`,
  `publishedAt: 2026-09-16` both languages). Category follows the existing
  taxonomy from `llm-did-not-win-everywhere` (`IA aplicada · Engenharia` /
  `Applied AI · Engineering`); no new taxonomy invented. No schema, page,
  component, workflow, or distribution-script changes — content only.
- Distribution input per pipeline convention (audited against
  `llm-did-not-win-everywhere` + `scripts/distribution/*`): PT-BR carries
  only `distribution.linkedin.text` (1380 chars, contains the PT canonical,
  saved verbatim); EN carries only `distribution.devto.tags`
  (`ai, llm, machinelearning, programming` — pipeline requires 1–4
  non-empty tags, no allow-list). Titles quoted in frontmatter because the
  `Evals:` colon breaks YAML plain scalars.
- Dry-run (resolve + build both payloads, no network, no publish): pair
  resolves with per-locale canonicals (`/artigos/<slug>/`,
  `/en/articles/<slug>/`); DEV.to payload EN-only; LinkedIn payload PT
  copy, `PUBLIC`/`PUBLISHED`. No real publication, no deploy, no push.
- Gates: typecheck 0 errors, lint clean, format clean (normalized the 2
  new files with the repo's own Prettier), `bun test` 37 pass,
  production build 28 pages + `check-artifacts.ts dist` clean, preview
  build 28 pages + `--preview` clean, `check-release` ready, E2E 13 pass
  against preview build. `dist/` left holding a production build.

## External links — new-tab rule enforced by the validator (2026-09-16)

- Rule (now in `AGENTS.md`, Content model): every rendered off-site
  `http(s)` anchor must carry `target="_blank"` +
  `rel="noopener noreferrer"`. In MDX bodies authors write explicit
  anchors — never plain markdown links, and never a bare URL as link
  text (Sätteri's GFM autolinker nests a second anchor inside it).
  Same-origin, anchor, and `mailto:` links are untouched.
- Why not a rehype plugin: Astro 7 uses Sätteri; `rehypePlugins` in
  `mdx()`/`markdown` config are ignored unless `@astrojs/markdown-remark`
  is installed — a new dependency for a handful of links, rejected as
  disproportionate. A prototype (`src/lib/rehype-external-links.ts` +
  unit test) was written, verified in isolation, then deleted; the
  validator is this repo's enforcement mechanism, so the rule lives
  there (`scripts/check-artifacts.ts` fails the build on violation).
- Fixes applied (visible text/URLs unchanged, behavior only): Fowler
  link in `evals-stop-guessing-start-measuring` PT+EN → explicit anchor;
  bare repo URLs in both evals articles, both `llm-did-not-win-everywhere`
  articles, and both `ops-triage-ai` cases → explicit anchors with
  descriptive labels; `Footer.astro` GitHub/LinkedIn and `ContactBlock.astro`
  LinkedIn → `target`/`rel` (the validator caught these plus the GFM
  autolinked bare URLs on the first enforcing run — 10 violations, all
  fixed, none pre-existing after the fix).
- E2E extended in-pattern: article external links open in a new tab
  safely (Fowler link on both evals pages). Gates re-verified:
  typecheck 0 errors, lint clean, format clean, `bun test` 37 pass,
  production + preview builds 28 pages with `check-artifacts` clean in
  both modes, `check-release` ready, E2E 14 pass against preview build.
  `dist/` left holding a production build. No deploy, no publish,
  no commit.
- Follow-up (same day): the dedicated E2E test was removed again — it
  duplicated the validator as enforcement, so it was cost without
  benefit (user decision, option 1). The validator remains the single
  guarantee; E2E back to 13 pass, all other gates re-verified green,
  `dist/` holding a production build.

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
- Before the 2026-09-19 attempted Node preview build, `dist/` held a
  **production** build (28 pages, includes
  `/artigos/evals-stop-guessing-start-measuring/` +
  `/en/articles/evals-stop-guessing-start-measuring/` and both URLs in
  `sitemap.xml`). Rebuild with `bun run build:preview` before
  running the E2E suite, which serves `dist` on `:3100` (preview
  noindex expected).
