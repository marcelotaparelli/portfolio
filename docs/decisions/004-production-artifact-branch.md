# ADR 004 — Production artifact branch

Status: Accepted

## Context

The available Hostinger plan offers Git integration with GitHub but no
SSH. It deploys a selected branch into `public_html`. `main` contains
source code and must not be deployed directly. We need a branch whose
root is exactly the validated static artifact, updated only through
deterministic gates plus human approval — without third-party deploy
actions, personal tokens, or automatic hosting deploys.

## Decision

- `main` is the only development branch. CI (`.github/workflows/ci.yml`,
  `contents: read`) runs the full gate suite on PRs and on pushes to
  `main`: typecheck, lint, format check, unit tests, preview build +
  preview artifact validation, E2E, production build, production
  artifact validation, release check.
- After CI succeeds on `main`, a human explicitly runs
  `.github/workflows/deploy.yml` via `workflow_dispatch`, passing the
  approved CI run id (`ci_run_id`). The workflow first re-validates
  that run through the API — same repository, CI workflow, `push`
  event on `main`, completed with `success` — and rejects anything
  else (PR runs, forks, failed runs, unknown ids). It then downloads
  the `production-dist` artifact from that exact run. There is
  **no rebuild**: the downloaded artifact is the source of truth, so
  the published bytes are byte-for-byte the bytes CI validated.
  Pre-push safety checks (`index.html`, `.htaccess`, sitemap, robots,
  PDFs present; no `src/`, `tests/`, `docs/`, `.github/`,
  `node_modules/`, manifests; secrets grep) run against the downloaded
  artifact, then its content (including dotfiles, excluding `.git`) is
  published to the root of the `production` branch using native git in
  an isolated temp clone. The whole flow is serialized via a
  concurrency group so two manual runs can never race.
- Production approval is an explicit manual `workflow_dispatch`
  action — no GitHub Environment is involved. The publish job is the
  only one with `contents: write` (+ `actions: read` to validate the
  run and fetch the artifact); everything else is read-only. No PAT,
  no third-party deploy action, no hosting secrets, plain (non-force)
  push for linear history.
- Each production commit is `deploy: <main-sha>` with
  `Source-Commit:` and `CI-Run:` trailers, mapping the artifact back
  to its source commit and CI run (lightweight provenance; no formal
  attestation system at this stage). Hostinger is connected manually
  to `production` → `public_html`; no automatic hosting deploy is
  configured here.

## Consequences

- Deployable state is always reviewable: `production` holds no source,
  only the artifact.
- Publishing is traceable (`deploy:` SHA) and serialized; unexpected
  branch movement fails the push instead of rewriting history.
- Merges to `main` require one CI run plus one approval; the cost is
  slower delivery, accepted deliberately.
- The CSP hash and any inline-asset fingerprint must be kept in sync
  with the published artifact (see threat model).
- First publication has not run yet: connecting Hostinger remains a
  manual step after `production` exists and is verified.

## Alternatives considered

- Deploy `main` directly: rejected — would publish source, tooling and
  lockfiles to `public_html`.
- Third-party gh-pages/deploy action: rejected — native git is
  sufficient and reduces supply-chain surface.
- Force-push artifact snapshots: rejected — destroys auditability;
  linear history preserves it.
- Automatic deploy on every push: rejected — human approval is a
  deliberate gate for a professional portfolio.

## Rollback (manual)

1. Find the last known-good commit on `production`
   (`git log --oneline production`, each message holds its source SHA).
2. Restore it: `git checkout production && git revert <bad-sha>` (or
   `git reset --hard <good-sha>` followed by a **new** commit — never
   force-push shared history without explicit agreement).
3. Push and trigger a manual redeploy in the Hostinger panel.
4. No automatic rollback is implemented by design.
