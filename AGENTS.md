# AGENTS.md — portfolio marcelo-taparelli

Read this before touching anything. Do not restart the project, redesign it,
switch stacks, refactor by preference, or add dependencies without
demonstrated need. Current state: `docs/implementation-status.md`.

## Stack and principles

- Bun, Astro (static output), TypeScript strict, Tailwind, MDX.
- React is NOT installed and must not be added without real need.
- PT-BR at `/`, EN at `/en/`. Every published content item must exist in
  both languages (enforced by `src/lib/publication.ts` + unit tests).
- Simplicity, performance, minimal dependencies. Arch-like: explicitness,
  little magic, abstractions only when justified.

## Product positioning

- Authority for Marcelo Taparelli as Software Engineer + Applied AI
  Engineering. Signature: FROM REAL PROBLEMS TO INTELLIGENT PRODUCTS.
- Do NOT present him as a senior AI specialist. Proven experience is
  software/product engineering; Applied AI is the current direction of
  depth.

## Commands (read `package.json`; do not invent commands)

- `bun dev` — dev server, must stay `0.0.0.0:3000` with strictPort
  (see `astro.config.mjs` + `scripts/dev.ts`). Never accept silent fallback
  to 3001.
- `bun typecheck` | `bun lint` | `bun format:check` | `bun test`
  (unit only: `bunfig.toml` sets `root = "./tests/unit"`).
- `bun run build` — production (drafts excluded, 12 pages).
  `bun run build:preview` (`CONTENT_PREVIEW=true`) — preview with drafts
  (18 pages). `dist/` is build output; note which one it holds before
  validating or deploying.
- `bun scripts/check-artifacts.ts dist [--preview]` — validates exactly one
  H1, canonical, 3 alternates, noindex in preview, local links/resources,
  language pairs, no draft leakage. Must pass in BOTH modes (rebuild in
  each mode first).
- `bun test:e2e` — Playwright serves `dist` via `scripts/serve-build.ts`
  on `:3100`. The suite expects a **preview** build (draft case pages,
  preview noindex). If browsers are missing:
  `bunx --bun playwright install chromium` (+ `install-deps chromium` for
  OS libs like `libglib`).
- `bun check:release` — launch readiness (bilingual published+reviewed
  pairs, article dates, reviewed CV PDFs, `CONTENT_PREVIEW` off). Expected
  to fail until the user supplies content (see below). Never fake it green.
- `bun run cv:generate` — regenerates `public/cv/*.pdf` from `cv/*.html` +
  `cv/cv.css` via Playwright/Chromium (repo-local Inter fonts, no new
  deps). Fails closed unless each PDF has exactly 1 A4 page.
- `bun scripts/lighthouse.ts` — lab-only Lighthouse (mobile sim) for `/`,
  `/sobre/`, `/projetos/agencia-catus/` (+ article flags). Requires the
  static server up on `:3100`. Results are LABORATORY, never real-user CWV.
- `bun scripts/measure-assets.ts` — asset budgets (CSS gzip ≤ 25 KB,
  JS gzip ≤ 10 KB, fonts ≤ 100 KB). Writes `reports/assets.json`.

## Content model (do not break)

- Collections: `src/content/projects/{en,pt-br}/*.mdx`,
  `src/content/articles/{en,pt-br}/*.mdx`, schema in
  `src/content.config.ts`. `translationKey` + `locale` pair is the identity;
  `status: draft|published`, `reviewed: boolean`.
- Production shows only `published`; preview shows drafts too
  (`src/lib/content.ts` `isPreview`). Drafts may be incomplete but must
  never leak to production (validator checks).
- 404 model: `src/pages/404.astro` → `dist/404.html` (static-host 404
  document, canonical `/404.html`); `src/pages/en/404.astro` → regular page
  `/en/404/`. On 404 pages the header language switch must link the
  canonical notFound paths (`pathFor('notFound', locale)`), NOT
  `Astro.url.pathname` (which renders the nonexistent `/404/` for PT).
- Sitemap excludes 404s and is empty in preview. 404s stay noindex even in
  production (see `check-artifacts.ts`).
- `src/data/site.ts` `cv` entries: `reviewed` stays `false` and no link
  renders until a user-supplied PDF passes review (`CvLink.astro` hides
  unreviewed/missing PDFs; E2E asserts zero dead `/cv/` links).

## Workflow rules

1. Do not start new features while typecheck, lint, format, build, unit,
   E2E, and both artifact validations are not green.
2. Fix the publication model, never workaround the validator to make a test
   pass.
3. Editorial pendencies (NOT code tasks, do not invent): bilingual approval
   of the 3 project cases, the launch article
   (PT "Por que construí meu portfólio com Bun + Astro + MDX em vez de usar
   uma stack mais complexa" / EN "Why I Built My Portfolio with Bun + Astro
   - MDX Instead of a More Complex Stack" — write only with real build
     measurements in hand), and the user-supplied PT/EN résumé PDFs.
4. After stabilizing, update `docs/implementation-status.md`.
5. This container may lack `git`, `curl`, `ps`, `pkill`. Probe background
   servers with `bun -e 'fetch(...)'`, find PIDs via `/proc` scans, stop
   with `kill <pid>`.
