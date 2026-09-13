# Architecture

Portfolio of Marcelo Taparelli — static site, two languages, zero runtime.

## Stack

- Bun 1.4.2 (toolchain: install, scripts, tests).
- Astro 7 static output (`output: 'static'`, `trailingSlash: 'always'`).
- TypeScript strict, Tailwind CSS 4, MDX for cases/articles.
- No backend, no database, no auth, no analytics, no cookies.
- React is not installed. Client JavaScript is one small inline module
  (mobile menu enhancement; the menu works without JS via
  `<details>`/`<summary>`).

## Content model

- PT-BR at `/`, EN at `/en/`. Every published item exists in both
  languages (`translationKey` + `locale` pair is the identity).
- `status: draft | published`, `reviewed: boolean`. Production renders
  only `published`; preview (`CONTENT_PREVIEW=true`) also renders drafts.
- Collections live in `src/content/{projects,articles}/{en,pt-br}/*.mdx`,
  schema in `src/content.config.ts`.
- `public/` holds fonts, CV PDFs, OG images, `robots.txt` and `.htaccess`
  (Hostinger: security headers, cache, compression, 404 document).

## Build pipeline

```text
Content / Data (MDX, i18n, data/)
      ↓
Astro build (Bun)
      ↓
Static HTML / CSS / minimal JS  →  dist/
      ↓
Artifact validation (scripts/check-artifacts.ts)
      ↓
dist/  →  static hosting
```

`scripts/check-artifacts.ts` enforces exactly one H1, canonical +
alternates (incl. `x-default`), noindex rules, local links/resources,
language pairs and no draft leakage — in both production and preview
modes. `dist/` is never edited by hand; preview builds are always
followed by a production rebuild before deploy.

## Delivery (see ADR 004)

```text
GitHub main
  → deterministic CI (.github/workflows/ci.yml, contents: read)
  → validated static artifact (dist/) + release check
  → artifact uploaded as `production-dist`
  → explicit manual approval (workflow_dispatch with the CI run id)
  → exact artifact published to production branch
  → Hostinger Git deployment → public_html
```

The `production` branch is a deployment artifact branch, not a source
branch: its root contains only the CI-validated content of `dist/`
(HTML, assets, `.htaccess`, PDFs, `sitemap.xml`, `robots.txt`).
It is written exclusively by `.github/workflows/deploy.yml`, which
downloads the `production-dist` artifact from the exact approved CI run
(same repository, `main`, green conclusion) and publishes it with native
git — no rebuild on deploy, so the published bytes are the validated
bytes. Production approval is an explicit manual `workflow_dispatch`
action carrying the CI run id; the workflow re-validates that run via
the API before downloading anything. `GITHUB_TOKEN` has
`contents: write` + `actions: read` on that job only.
History is linear (`deploy: <main-sha>` per publish) so any production
commit maps back to its source SHA. Rollback is manual: republish a
previous known production commit and trigger a redeploy in Hostinger.
