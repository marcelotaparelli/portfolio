# Implementation status

## OpsPilot AI bilingual engineering article draft (2026-10-07)

- Audited existing PT/EN articles, content schema, publication filters, release
  gates and distribution code before writing. Read OpsPilot public main at
  `cacf611c1e7e31effe04895ec383673c76568876` in an isolated source clone.
  Recorded historical/current source divergences and a claim/source/evidence/
  limitation matrix in `docs/editorial/opspilot-rag-agents-review.md`.
- Added PT/EN `opspilot-rag-agents-deterministic-controls` articles about evidence
  versus authority: retrieval, deterministic policy, exact-action approval,
  ambiguous GitLab writes, reconciliation, observability and evaluation scope.
  Both remain `draft`, `reviewed: false`, without `publishedAt`.
- Prepared one PT-first bilingual LinkedIn post (1,619 characters, both future
  canonicals) and EN DEV.to tags `ai`, `python`, `rag`, `programming`. Local
  metadata checks passed; the distribution resolver rejected the actual draft.
  No distribution workflow or external write was performed.
- Passed format, typecheck (0 errors/warnings, 20 existing hints), lint, 42 unit
  tests/112 assertions, preview build/artifact validation (40 pages), final
  24 E2E, production build/artifact validation (38 pages). Production HTML/XML
  contains neither draft pages nor slug references. `check:release` deliberately
  blocks both drafts for missing editorial approval/date; the checker is intact.
- Reviewed eight PT/EN browser configurations at 1440/768/390/320px: no overflow,
  no axe WCAG-tagged violations, reciprocal SEO/navigation, intact TOC and code.
  Simplified the evaluation comparison into readable items after inspecting
  mobile screenshots; no shared layout/CSS/dependency changes. Screenshots,
  measurements and a saved preview are ignored in `reports/opspilot-article/`.
  Nine distinct public evidence links returned HTTP 200. Reading estimates
  follow the site's MDX count: PT 13 minutes, EN 12 minutes.
- `dist/` retains production output. No push, deploy, publication, external
  distribution, live provider call or OpsPilot source modification.

## Selected Work heading hierarchy (2026-10-07)

- Replaced Selected Work's bottom-aligned heading composition with a scoped
  `section-heading--split` grid: the eyebrow spans the first row; title and
  description/CTA occupy the second row and align at their top. Reused the
  existing 24px/56px spacing and 350px aside width, without positional offsets.
  Mobile keeps DOM order: eyebrow, title, description, CTA.
- Audited both `section-heading` instances. Writing retains its existing flex
  composition and was visually reviewed alongside Selected Work. PT/EN copy,
  Home section order, methodology and project order are unchanged.
- Inspected eight PT/EN configurations at 1440, 1920, 768 and 390px. Browser
  measurements confirmed the full-width eyebrow, equal desktop title/description
  top coordinates, correct mobile order and no horizontal overflow. Axe reported
  zero WCAG-tagged violations. Local captures and measurements are ignored under
  `reports/section-heading/`.
- Passed format, typecheck (0 errors, 0 warnings, 20 existing hints), lint,
  42 unit tests, 24 E2E, preview/production builds (38 pages each), both artifact
  validators and release checker. No push, deploy or distribution.

## Home method immediately after Hero (2026-10-07)

- Moved Engineering Method directly after Hero in the shared PT/EN Home.
  Numbering now reads 01 Method, 02 Selected Work, 03 Experience and 04 Writing.
  About, diagram design and methodology remain unchanged; the Hero work link
  still targets `#selected-work`.
- Verified rendered order, ten steps, sequential numbering, no horizontal
  overflow and the work anchor at 1440/390px in both languages. Reviewed local
  screenshots under the ignored `reports/home-method-order/` directory.
- Passed format, typecheck (0 errors, 0 warnings, 20 existing hints), lint,
  42 unit tests, 24 E2E, preview/production builds (38 pages each), both artifact
  validators and release checker. No push, deploy or distribution.

## Engineering system map and Home information architecture (2026-10-07)

- Replaced the desktop vertical timeline with a full-width system map in the
  existing `EngineeringMethod.astro`. The ten labels and their order are intact:
  01–04 share the framing line, which feeds central 05 through a technical
  bracket; its output feeds 06–08 and then 09–10. A dashed return from 10 to 01
  closes the iteration loop. SVG connectors are native and decorative.
- Audited reuse before removing the Home-only `thinking-section`, its PT/EN
  translations and exclusive desktop/mobile styles. Home now reads Hero →
  Selected Work → Engineering Method → Experience → Writing → Contact.
  Method occupies section 02; existing 01, 03 and 04 remain sequential. About
  reuses the same markup and map with compact section padding.
- Applied the author's new PT description/scope and natural EN equivalents.
  Desktop descriptions occupy two lines at 1440/1920px. No other positioning
  copy, case evidence, project ordering, CVs, metadata or dependencies changed.
- At 900px and below, geometry switches to a vertical grouped flow with a
  distinct bracket/node for 05 and a compact measurement/improvement return.
  Step labels are at least 14px. HTML remains one ordered list of ten items;
  numbers, phase captions, nodes and SVG paths do not enter its accessible text.
  No client JavaScript, canvas, animation or new dependency is used.
- Rendered and visually assessed PT Home at 1440 and 1920px, EN Home at 1440px,
  mobile at 390px and About PT/EN desktop. Full-width distribution eliminates
  the empty side column. Consistent row heights and aligned nodes control
  density; negative space exposes the convergence and output of 05. Iterated
  after screenshots showed the phase-2 caption crossing its entry connector:
  moved it beside that connector and separated the return arrowhead from the
  dashed path. The final return visibly leads from Improvement to Business
  Problem without obscuring any label.
- Browser checks covered all four routes at 320, 390, 768, 1024, 1440 and 1920px:
  24 configurations, exact label order, aligned SVG/node geometry (within 1px),
  no horizontal overflow and zero axe WCAG-tagged violations. All four routes
  also retain the component with JavaScript disabled. Final local screenshots
  and measurements are ignored under `reports/system-map/`.
- Passed format, format check, typecheck (0 errors, 0 warnings, 20 existing
  hints), lint, 42 unit tests (112 assertions), 24 E2E, preview/production builds
  (38 pages each), both artifact validators (38 HTML documents each), release
  checker and Git whitespace validation. `dist/` holds the final local
  production artifact. One local commit is requested; no push, deploy or
  external distribution is performed.

## Shared AI engineering pipeline design (2026-10-07)

- Reworked the existing `EngineeringMethod.astro` visualization on Home and
  Sobre/About PT/EN. Kept both introductory paragraphs, all ten English step
  names and their order unchanged; translations and methodology did not change.
- Replaced boxed Home rows and the compact About list with a shared editorial
  pipeline: separate monospace numbers, continuous rail, small outlined nodes,
  restrained horizontal rules and an emphasized square node at step 05.
  An inline decorative SVG connects Improvement back to Measurement. Existing
  theme tokens and typography remain; no dependencies or client JavaScript.
- Desktop uses two balanced columns (flow measured at 49% of section width at
  1440px). At 900px and below the introduction precedes the vertical pipeline.
  Step labels remain 14px; step 05 fits one line at 390px and wraps between
  AGENT and ORCHESTRATION at 320px without splitting either word.
- Reviewed rendered Home/About in both languages. Browser checks covered 24
  configurations at 320, 390, 768, 1024, 1440 and 1920px: exact step order,
  no horizontal overflow and zero axe WCAG-tagged violations. All four routes
  retained the method without JavaScript. Captures and checks are ignored under
  `reports/method-pipeline/`; earlier captures remain in `reports/method-design/`.
- Ordered-list semantics are explicit; numbers, nodes and the feedback SVG
  are decorative. Step 05 differs by shape and weight as well as color. No
  animation is introduced. Existing E2E suite passed all 24 tests; format,
  typecheck (0 errors, 0 warnings, 20 existing hints), lint, unit tests and
  preview/production builds (38 pages each) passed. Both artifact validators
  checked 38 HTML documents; release and Git whitespace checks passed.
  `dist/` holds the final local production build. No push or deploy.

## About engineering method visual refinement (2026-10-07)

- At the author's request, refined the method section on Sobre/About PT/EN
  with the existing About column proportions, 28px heading, and section spacing.
  Replaced wide filled boxes with a compact numbered vertical timeline; AI
  orchestration and measurement have restrained accent emphasis. Preserved all
  ten steps, copy, semantic reading order and the Home presentation through an
  About-specific component variant. No new dependencies or client JavaScript.
- Visually inspected PT/EN at 1440, 768, 390 and 320px. All eight configurations
  retained ten steps, no horizontal overflow and zero axe WCAG-tagged violations.
  Local captures and measurements are ignored under `reports/method-design/`.
- Passed format/format check, typecheck (0 errors, 0 warnings, 20 existing
  hints), lint, 42 unit tests, 24 E2E, release check, preview/production builds
  (38 pages each), both artifact validators and Git whitespace validation.
  CVs and public positioning copy were not changed. No push or deployment.

## AI Engineering career, Software foundation, Product lens (2026-10-07)

- Audited Home/About PT/EN, skills, shared hero/identity/metadata/SEO/JSON-LD,
  footer, OG, README, both CVs and print pipeline, seven bilingual cases,
  learning/education, article/index copy, publication rules and quality gates
  before editing. Initial tree was clean at `055ff5e`. The audit and classified
  old-positioning occurrences are in `docs/editorial/brand-ai-engineering-review.md`.
- Preserved Home headlines and FROM REAL PROBLEMS TO AI PRODUCTS. Made AI
  Engineering the career, Software Engineering the foundation, and Product
  the perspective in shared copy, About, CVs, README and derived metadata.
  Split skills into AI, Software, Production/security/reliability, and Product.
  Added the ten-step business-problem-to-improvement method to Home/About in
  both languages with a static, responsive Astro component and to README.
- Removed the old author-development narrative and intelligent-products brand
  signature from the portfolio article pair and its local distribution input.
  Preserved technical Applied AI categories and dated internal records; marked
  the earlier editorial review as historical. Cases, metrics, limitations,
  professional roles and project order remain unchanged. CV institutions now
  use Cruzeiro do Sul and UniBF as requested; existing education dates remain.
- Generated and visually inspected both one-page A4 PDFs with the unchanged
  9.5pt font/CSS: 34.4px PT and 1.5px EN measured bottom headroom. Verified PDF
  text and raster output. Reviewed Home/About and methodology PT/EN at desktop
  and mobile; 12 configurations at 1440/390/320px had no horizontal overflow.
  Reviewed regenerated OG cards. Local evidence is ignored under
  `reports/brand-review/`.
- Passed format/format check, typecheck (0 errors, 0 warnings, 20 existing
  hints), lint, 42 unit tests, CV generation, release checker, preview and
  production builds (38 pages each), both artifact validators (38 documents
  each), 24 E2E against the final preview, and Git whitespace validation.
  `dist/` contains the validated local production artifact. No dependency,
  stack, workflow, validator, secret, source-project or profile-repo changes.
  One local commit is requested; no push, deploy or external distribution.

## Named Software Engineering training (2026-10-05)

- Replaced the generic third education item in PT/EN About and CVs with
  Engenharia de Software — Alura / Software Engineering — Alura. The topic
  lists now begin with Back-end and retain the existing subjects. About shows
  Alura but still excludes UniBF and Cruzeiro do Sul Virtual; the CVs retain
  all three institutions.
- Regenerated both PDFs through the existing pipeline: one A4 page each,
  20.0px measured bottom headroom, with no observed clipping. Verified their
  extracted text and reviewed About desktop/mobile and CV HTML in both
  languages. No horizontal overflow at 1440px or 390px.
- Passed format check, lint, typecheck (0 errors, 0 warnings, 20 hints), 42
  unit tests, 24 E2E tests, release check, preview and production builds (38
  pages each), and preview/production artifact checks (38 HTML documents
  each). The E2E education check now permits Alura on About while rejecting
  UniBF and Cruzeiro there.

## Bilingual education and CV structure (2026-10-05)

- Replaced the About/Sobre complementary-training block with one ordered
  Education/Formação section: ongoing postgraduate AI Engineering (expected
  April 2027), Systems Analysis and Development (completed 2026), then
  additional coursework. Institution names appear only in the CVs.
- Reorganized both CVs into Education/Formação and separate
  Languages/Idiomas sections. The postgraduate program is identified as such,
  with Cruzeiro do Sul Virtual and expected 04/2027 (Apr 2027 in EN); ADS
  lists UniBF and 2026; coursework lists Alura. Both PDFs were regenerated
  from the existing HTML/CSS pipeline and verified as one A4 page each, with
  4.4px measured bottom headroom and no observed clipping.
- Updated the E2E exposure rule to allow postgraduate education on About while
  rejecting institution names there, and added PT/EN checks for site/CV
  education order, dates, providers, and language sections. Verification
  passed: format check, lint, typecheck (0 errors, 0 warnings, 20 hints), 42
  unit tests, 24 E2E tests, release check, preview and production builds (38
  pages each), both artifact checks (38 HTML documents each), PDF generation,
  PDF text/raster inspection, and visual review of About desktop/mobile and
  CV HTML/PDF in both languages. No horizontal overflow at 1440px or 390px.

## AI Engineer and Software Engineer portfolio positioning (2026-10-05)

- Audited the bilingual Astro site, project/article collections, shared copy,
  metadata and Person JSON-LD, CV source/generator/PDFs, publication checks,
  and repository quality gates before editing. Confirmed OpsPilot and Ops
  Triage evidence against their public repository documentation; retained the
  independent OpenAI live-smoke and GitLab sandbox-smoke boundary, and made no
  production deployment, exactly-once, measured cost, or model-quality claims.
- Updated PT-BR and EN Home, About, shared identity metadata, skills, footer,
  and social cards to present AI Engineer & Software Engineer with Product
  thinking. Added the paired OpsPilot case and reordered the bilingual cases:
  OpsPilot, Ops Triage, Resilient Transaction API, Salus, then other projects.
  Reframed Ops Triage as model evaluation/domain adaptation, Resilient as
  reliability/cloud engineering, and Salus as backend/software architecture.
  Historical editorial articles remain intact.
- Updated both one-page A4 CVs through the existing generator. Each has 10.2px
  measured bottom headroom; the PDF pipeline verified one page per locale.
  Refreshed PT/EN OpenGraph cards through the existing generator.
- Verified: frozen dependency installation; lint; format check; typecheck (0
  errors, 0 warnings, 20 hints); 42 unit tests; CV generation; release check;
  preview and production builds (38 pages each); preview and production
  artifact validation (38 HTML documents each); 23 E2E tests; asset measurement;
  Lighthouse mobile runs for Home, About, and a project case (all reported
  performance/accessibility 1.0); visual review of Home, About, project index,
  OpsPilot, Ops Triage, and Resilient in both locales at desktop and 390/320px.
  No page overflow or observed clipping; `git diff --check` passed.
- The repository-wide old-positioning search found only dated internal status
  history and preserved editorial/article records, not current public identity
  copy. No such institution reference is present in current site or CV output.
  Performance and visual review reports remain ignored local artifacts under
  `reports/`; browser tooling remains under ignored `node_modules/`.
- Changes are committed locally with the configured author/committer identity.
  No push or deployment performed.

## Commit identity correction (2026-10-02)

- At the author's request, configured repository-local Git identity as
  `marcelotaparelli <contato@marcelotaparelli.com.br>` and recorded the same
  author/committer requirement for future agent-created commits in AGENTS.md.
- Audited all locally available branches: four session commits had Codex
  identity; 47 earlier main commits already used the author's contact email.
  The 25 GitHub Actions bot commits belong to deploy/distribution histories.
  Preserved those automation records and remote-tracking refs.
- Recreated the four divergent commits on local main with the requested
  author and committer. Verified identical trees for each old/new pair;
  preserved dates, messages, and all staged distribution-fix changes.
  A pre-rewrite bundle and hash mapping were saved outside the repository
  under /tmp. No push or remote-history change performed.

## Distribution website-access investigation (2026-10-02)

- Read GitHub Actions run `37076736260` and the preceding failed run
  `37076292661`. Both used the expected published article pair; the latest
  checked out `6c62635`. The latest website check failed after about 134
  seconds with a connection error; the preceding check received HTTP 403
  almost immediately. Neither reached the channel publication calls or
  changed the ledger. The runner used Ubuntu 24.04, so the Ubuntu 26
  migration notice does not explain these failures.
- Added a 15-second timeout to each canonical GET and up to three attempts
  for connection errors only, with one-second pauses. HTTP errors still fail
  immediately; both canonical pages must return HTTP 200. Final connection
  errors now include the URL, attempt count, and error code/name. Publication
  POSTs are unchanged and are not retried by this change.
- Added read-only, bounded IPv4/IPv6 curl diagnostics after a failed
  distribution step. They do not use publication credentials or override
  the website gate. Updated troubleshooting documentation to distinguish
  metadata failures, HTTP refusal, and connection failures.
- The revised public check returned HTTP 200 for both Laya article URLs
  from this environment. This does not establish the runner's failure cause;
  DNS, routing, TLS, and hosting refusal remain unconfirmed. Runner diagnostics
  require the local workflow change to be pushed and a subsequent run by the
  author. No workflow rerun, push, deployment, or distribution performed here.
- Local checks passed: format/format check, typecheck (0 errors, 0 warnings,
  20 hints), lint, 42 unit tests, release checker, preview and production
  builds (36 pages each), both artifact validators, 13 E2E tests, and Git
  whitespace validation. Workflow YAML parsed, the diagnostic shell passed
  `bash -n`, and its article resolver produced the correct PT/EN public URLs.

## About copy refinement (2026-10-02)

- At the author's request, removed the institution name from the PT/EN
  About introductions and their derived description metadata. The ongoing
  postgraduate program remains visible; CV education entries are unchanged.
  Updated the final-text editorial record to match the revised introductions.

## AI Engineering positioning and Laya case evidence (2026-10-02)

- Audited the local CV sources/CSS, Home/About, skills, metadata/OG copy,
  Ops Triage cases, full Laya/Jev articles, content schema, publication model,
  CV generation, release/artifact validators, and existing gates. Updated
  current professional positioning to `Software Engineer | Engenharia de IA`
  and `Software Engineer | AI Engineering`, preserving Software Engineering
  as the professional base. Technical Applied AI categories and dated status
  history remain intact; only the author-positioning sentence changed in the
  historical portfolio architecture article.
- Added the author-confirmed ongoing postgraduate program in AI Engineering
  at Cruzeiro do Sul to both About introductions and both CVs, ahead of ADS
  completed in 2026. No campus, modality, dates, or specialist title invented.
  Existing professional experience and the temporary AWS evidence were
  preserved. Home copy stays concise and contains no training tools or school.
- Rechecked Ops Triage public main read-only at
  `e8c75f0ff75aafcd24403f860e1ad7d4450392f5`: final/zero-shot/Jev reports,
  Freeze 2, held-out, training, selection, checkpoint metadata, README, and
  mapping audit. No metrics recalculated and no benchmark executed. The case
  now follows zero-shot -> adaptation -> validation selection -> Freeze 2 ->
  final evaluation; it retains the asymmetric TRAIN exposure, severity-recall
  regression, saturated confidence with ten incorrect tuples, measured-task
  cost scope, and evaluation-only/runtime boundary. Added Python, PyTorch,
  Laya, and CUDA to the technologies; first practical ML Systems / AI
  Infrastructure evidence is bounded to experimental work. Public evidence
  explicitly says the Pod was not destroyed; no teardown experience claimed.
- Regenerated both PDFs with the unchanged CV stylesheet and 9.5pt body font:
  exactly one A4 page each, 5.1px bottom headroom per locale, no visual clipping.
  Updated and regenerated both OG images. Reviewed About and Ops Triage in
  both languages on desktop/mobile; shortened new table labels for legibility.
  Browser review at 1440/390/320px across Home/About/case: 18 configurations,
  HTTP 200, no page overflow or WCAG-tagged axe violations. Six unique public
  case-source links returned HTTP 200; local links passed artifact validation.
- All final gates pass: format, format check, typecheck (0 errors, 0 warnings,
  18 existing hints), lint, 38 unit tests, CV generation, release checker,
  preview build/validator (36 pages/documents), 13 E2E, production
  build/validator (36 pages/documents), and Git whitespace check. `dist/`
  holds the production build with both published Laya article routes.
- Full institutional audit, final PT/EN texts, case metadata, source caveats,
  and screenshot references: `docs/editorial/positioning-laya-review.md`.
  Screenshots/visual checks are local ignored artifacts under
  `reports/positioning-review/`. No schema, workflow, validator, test,
  dependency, distribution, or Ops Triage source changes. One local commit
  records this update; its hash/status are provided in the delivery report.
  No push, deployment, or external distribution.

## Laya vs Jev — final editorial release (2026-10-02)

- Completed the full PT-BR/EN article-body review requested by the user and
  marked both files `status: published`, `reviewed: true`, with shared
  `publishedAt: 2026-10-02`. The user explicitly authorized local release
  after factual review, while prohibiting push and external distribution.
- Shortened repeated/defensive passages and training implementation detail.
  The hook compares public records dated 15 and 18 September, not development
  duration. The official Hub API reconfirmed the initial-release commit date.
  The comparison table names each model's TRAIN exposure, and the conclusion
  emphasizes strong Jev zero-shot generalization and open-source adaptation
  control. All classification, confidence, coverage, latency, and cost values
  are preserved, including the measured-task scope of US$ 0.1185.
- Verified all 22 unique source links and four published internal targets by
  read-only GET: HTTP 200, including six GitHub artifact pages after transient
  503 retries. The same raw snapshot files are public. No material factual
  issue was found; the source/audit limitations remain explicit.
- Revised the single bilingual LinkedIn copy (2,077 characters); EN DEV.to
  tags and canonical remain unchanged. The existing pair resolver and both
  payload builders passed local validation without network publication.
- Re-ran format and format check, typecheck (0 errors, 0 warnings, 18 existing
  hints), lint, 38 unit tests, 13 E2E, preview build/validator (36 documents),
  production build/validator (36 documents), and release checker (exit 0).
  Both new production routes and sitemap entries exist, are indexable, and
  carry the same editorial date. Browser inspection of both final articles at
  320px and 1440px found no page overflow or WCAG-tagged axe violations.
- No schema, workflow, validator, test, dependency, or Ops Triage source
  changes. No push, deployment, or external distribution. `dist/` holds the
  production build. Final Git whitespace and status checks accompany the
  local release commit in the delivery report.

## Laya vs Jev article — bilingual draft (2026-10-02)

- Created the PT-BR/EN pair `laya-vs-jev-zero-shot-fine-tuning` as
  `status: draft`, `reviewed: false`, without a publication date, pending
  human editorial review. The narrative covers structured decision models,
  zero-shot versus adaptation, training infrastructure, calibration,
  generalization, serving context, and the operational cost of control.
- Inspected public Ops Triage AI read-only at
  `e8c75f0ff75aafcd24403f860e1ad7d4450392f5`. Both Laya reports, protocols,
  Freeze 2, training/selection metadata, held-out artifacts, and historical
  Jev evidence agree on the aggregates used. No model run or metric
  recalculation was performed. The README still summarizes only zero-shot;
  the articles disclose that adaptation evidence is in the final report and
  artifacts. The mapping audit retained parsed outputs, not untouched native
  responses; both articles preserve that limitation.
- Verified Jev's 2026-09-15 announcement and the official Hugging Face
  initial-release commit for Laya dated 2026-09-18. This is a comparison of
  public records, not a claim that Laya was developed in three days. The
  benchmark uses the general English checkpoint at revision
  `55cf4c4ebb4ebe31b2550e8bdf3bd21b99753851` and `laya==0.3.23`.
- Distribution inputs: one bilingual LinkedIn post in PT-BR frontmatter,
  1,970 characters with both canonicals; EN DEV.to tags `ai`,
  `machinelearning`, `opensource`, `mlops`, with the EN canonical derived
  by the existing builder. Local metadata/payload inspection made no network
  publication calls. Workflow, schema, tests, and validators are unchanged.
- Verified gates: format/format check and lint clean; typecheck has
  0 errors, 0 warnings, 18 existing hints; 38 unit tests and 13 E2E pass.
  Preview build/validator: 36 pages/documents. Production build/validator:
  34 pages/documents, with both new draft routes and sitemap entries absent.
  Additional browser inspection of each new article at 320px and 1440px
  found no page overflow or WCAG-tagged axe violations; each has one H1,
  18 section headings, seven tables, and preview noindex metadata.
- `check:release` fails only on the two new drafts awaiting editorial
  approval and their unset publication dates (four messages). This is an
  intentional release boundary, not a validator weakened for this task.
  Editorial evidence and review notes are in
  `docs/editorial/laya-vs-jev-review.md`. No push, deploy, or distribution.

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
  copy is one bilingual post with both canonicals (1,407 characters); EN carries DEV.to tags
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

## Distribution audit — one bilingual LinkedIn post (2026-09-23)

- The bilingual LinkedIn convention was already recorded above and practiced
  in the JWT article metadata. `docs/github-actions.md`, the distribution
  type comments, workflow comments, and validator still described or allowed
  a PT-only post; the Jev metadata also had only Portuguese copy.
- Corrected the Jev metadata to one PT-BR + EN post, with the PT canonical in
  the first section, `---` + `English version below 🇬🇧`, the EN canonical in
  the second section, and shared hashtags at the end.
- The distribution pair validator now fails closed unless that single LinkedIn
  copy contains both canonicals and the English section marker. `check-release`
  resolves every published article pair, so future published articles receive
  the same check. DEV.to remains EN-only; the publication workflow and API
  mechanism are unchanged.
- Updated existing LinkedIn frontmatter copy to follow the same two-language
  convention; article bodies and the DEV.to EN metadata were not changed.

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

## Distribution — initial channel split (DEV.to EN + LinkedIn copy from PT-BR, 2026-09-13)

- Root cause of the bad first run: the pipeline resolved only the PT-BR
  file, so DEV.to received the Portuguese version. Fixed model:
  `resolveArticlePair(slug)` resolves the PT-BR + EN pair, fails closed
  unless both are published, reviewed, dated, share `translationKey`
  and carry the same slug; EN must provide `devto.tags`, PT must
  provide the LinkedIn copy (each validated against its own canonical).
- Original channel split: DEV.to publishes exclusively from EN (`title`,
  `description`, `markdown`, canonical
  `https://marcelotaparelli.com.br/en/articles/<slug>/`); LinkedIn's custom
  copy is authored in the PT-BR frontmatter and uses the PT canonical. The
  later bilingual-copy convention adds the EN section and EN canonical to
  that same post. No runtime translation; single human approval
  (`workflow_dispatch` + slug) kept.
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
  `/en/articles/<slug>/`); DEV.to payload EN-only; LinkedIn payload is one
  custom post from PT-BR metadata. No real publication, no deploy, no push.
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
