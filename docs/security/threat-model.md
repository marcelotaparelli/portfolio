# Threat Model

Proportional to a static portfolio site. No backend, database, auth or
runtime API — web-application attack classes that require a server do
not apply (listed explicitly below to avoid checklist noise).

## System summary

Astro static site (PT `/`, EN `/en/`), built with Bun, served as static
files from Hostinger (`public_html`) via the Git integration pointed at
the `production` artifact branch. One small inline client script (mobile
menu); no analytics, no cookies, no external requests.

## Assets

- Repository source (`main`).
- Production artifact (`dist/` content, mirrored on `production`).
- Domain and professional reputation.
- CV PDFs and published professional content.

## Trust boundaries

- Developer environment → GitHub (`main`, PRs, CI).
- Manual `workflow_dispatch` (human approval) → `production` branch
  (only via `deploy.yml`, which re-validates the referenced CI run;
  `GITHUB_TOKEN`, `contents: write` + `actions: read` on that job
  only).
- Dependency registry (npm, via Bun lockfile) → build environment.
- Hostinger (Git deployment, `.htaccess`, TLS) → visitor browser.
- Visitor browser → external links (GitHub, LinkedIn, Catus, EVAG,
  Alura) in new tabs with `rel="noopener noreferrer"`.

## Attack surfaces

- Dependency supply chain (build-time; nothing third-party ships to
  the browser — see residual risks).
- Secrets accidentally committed (mitigated by `.gitignore` + pre-push
  grep in `deploy.yml`; audit found none).
- Content injection / XSS (content is repo-controlled; single `set:html`
  is JSON-LD with `<` escaped; CSP via `.htaccess` as defense in depth).
- Unsafe external links (all `target="_blank"` carry
  `rel="noopener noreferrer"`; verified in E2E).
- Headers/hosting misconfiguration (`.htaccess` sets `nosniff`,
  `Referrer-Policy`, `-Indexes`, 404 document, cache, compression; CSP
  - `Permissions-Policy` to be added).
- Malicious modification through repository access (branch protection
  - required reviews on `main` recommended; `production` writable only
    by the approved deploy job, linear history `deploy: <sha>`).
- Accidental publication of drafts/internal files (blocked by
  `check-artifacts.ts` in CI and pre-push checks).
- Stale deploy: Hostinger serving an old `production` commit (mitigated
  by linear history + manual redeploy procedure in ADR 004).

## Out of scope / not applicable

No backend, database, session, or runtime API exists, so these do not
apply: SQL injection, SSRF, account takeover, API authorization flaws,
database attacks, CSRF (no state-changing requests, no cookies).

## Existing controls

Static output; TypeScript strict; artifact validation (both modes);
bilingual publication gates; Playwright E2E incl. axe checks and 320px
reflow; minimal inline JS (hash-pinnable for CSP); local fonts; no
analytics/trackers; reproducible lockfile (`--frozen-lockfile` in CI);
explicit manual approval (`workflow_dispatch` with a validated CI run
id — no GitHub Environment involved) before any publish.

## Residual risks

- A compromised build dependency could alter output: mitigated by
  pinned toolchain, lockfile, `bun audit`, and artifact validation —
  not eliminated.
- CSP hash must be refreshed whenever the inline menu script changes,
  or the script must move to an external file (`script-src 'self'`).
- HSTS only after confirmed production HTTPS (no preload without
  deliberate decision).
- The `production` branch is a high-value target: protect it
  (restrict direct pushes; only the deploy job writes).

## Future changes

If analytics, forms, backends, APIs or third-party scripts are added,
this threat model must be reviewed before they ship.
