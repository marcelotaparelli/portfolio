# Implementation status

Date: 2026-09-13. All quality gates below were re-verified on this date.
Previous lab numbers (perf 1 / a11y 1, LCP ~1654 ms, CLS ~0.0006, TBT 0,
~93.5 KB transfer on Home mobile simulation) are **laboratory measurements,
not real-user Core Web Vitals**. Never present them as production RUM data.
Fresh lab numbers for this build are in `reports/lighthouse-summary.json`
and `reports/assets.json`.

## Quality gates (all green except editorial release)

| Gate                       | Command                                         | Result                                             |
| -------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| Typecheck                  | `bun typecheck`                                 | 0 errors, 0 warnings                               |
| Lint                       | `bun lint`                                      | clean                                              |
| Format                     | `bun format:check`                              | clean (normalized with `bun format` on 2026-09-13) |
| Unit                       | `bun test`                                      | 4 pass                                             |
| Production build           | `bun run build`                                 | 12 pages, drafts excluded                          |
| Production artifacts       | `bun scripts/check-artifacts.ts dist`           | 12 documents checked, clean                        |
| Preview build              | `bun run build:preview`                         | 20 pages, drafts included (18 + 2 article drafts)  |
| Preview artifacts          | `bun scripts/check-artifacts.ts dist --preview` | 18 documents checked, clean                        |
| E2E (against preview dist) | `bun test:e2e`                                  | 12 passed                                          |
| Dev server                 | `bun dev`                                       | serves `0.0.0.0:3000`, strictPort configured       |
| Release readiness          | `bun check:release`                             | NOT ready — editorial pendencies only (see below)  |

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
  during `astro check` / `build`: expected. The articles collection is
  empty because the launch article has not been written yet. Not the cause
  of any failure.
- `The collection "articles" does not exist or is empty` build warnings:
  same expected cause.
- `bun typecheck` failure reported in a previous session no longer
  reproduces (0 errors). No code change was needed for it.

## Editorial pendencies (launch blockers, awaiting the user)

These are content, not code. Do not invent them:

1. `bun check:release` fails on: 6 project files awaiting bilingual
   editorial approval (`status: draft`, `reviewed: false`); missing
   bilingual article `portfolio-decisions`; missing reviewed résumé PDFs
   (`public/cv/marcelo-taparelli-pt-br.pdf`,
   `public/cv/marcelo-taparelli-en.pdf`).
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

## Environment notes

- `git` binary is not installed in this container (a `.git` dir exists but
  no commits could be inspected or created). Do not assume git history is
  available.
- Playwright browsers + OS deps (`libglib` etc.) were missing and were
  installed via `bunx --bun playwright install chromium` and
  `bunx --bun playwright install-deps chromium`. If E2E fails with
  `Executable doesn't exist` or `libglib-2.0.so.0`, reinstall those.
- No `curl`/`ps`/`pkill` in this container; use `bun -e 'fetch(...)'` and
  `/proc` scans to probe/kill background servers.
- `dist/` currently holds a **production** build (12 pages). Rebuild with
  `bun run build:preview` before running the E2E suite, which expects drafts.
