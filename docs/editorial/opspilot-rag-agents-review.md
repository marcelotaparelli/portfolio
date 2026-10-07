# OpsPilot AI — draft editorial and factual review

Audited on 2026-10-07. This task creates a bilingual draft, not a release.
Both entries must remain `status: draft`, `reviewed: false`, without
`publishedAt`. Human editorial approval remains pending. No external publication,
distribution, push or deployment is authorized.

## Editorial decision

- PT: **OpsPilot AI: como construí RAG e agentes sem entregar autoridade ao LLM**.
- EN: **OpsPilot AI: Building RAG and Agents Without Giving the LLM Authority**.
- Shared slug/translationKey: `opspilot-rag-agents-deterministic-controls`.
- Thesis: a valid generated action is a proposal; deterministic application
  boundaries own authorization, approval and execution.
- Narrative: operational problem → authorized evidence → retrieval measurement
  → bounded proposals → exact-action approval → ambiguous writes/reconciliation
  → adversarial controls → observability → evaluation scope → limitations.
- First person, concrete engineering decisions, small evaluation tables and
  text diagrams. Avoid a stack inventory, framework tutorial or expanded case.

## Portfolio audit

Read both languages of `evals-stop-guessing-start-measuring`,
`llm-did-not-win-everywhere`, `jev-1-13-decision-model-benchmark`,
`laya-vs-jev-zero-shot-fine-tuning`, and `portfolio-bun-astro-mdx`, plus both
OpsPilot cases. Existing articles explain decisions through experiments,
retain denominators and scope, use first person, and link evidence explicitly.

Inspected `src/content.config.ts`, publication/content helpers, ArticlePage and
BaseLayout, `scripts/check-release.ts`, `scripts/check-artifacts.ts`, all five
`scripts/distribution/` files, CI/distribution workflows, `docs/github-actions.md`,
`docs/architecture.md`, the portfolio threat model, and prior editorial reports.

The schema accepts drafts without dates. Preview includes drafts and adds
`noindex, nofollow`; production filters them out. Locale/slug/translationKey
must pair correctly. Expected future canonicals are:

- `https://marcelotaparelli.com.br/artigos/opspilot-rag-agents-deterministic-controls/`
- `https://marcelotaparelli.com.br/en/articles/opspilot-rag-agents-deterministic-controls/`

PT holds the sole bilingual LinkedIn text (maximum 3,000 JavaScript string
characters), with PT first, a separator, `English version below 🇬🇧`, and both
canonicals. EN holds 1–4 DEV.to tags. Root-relative Markdown links are rewritten
by the distribution adapter; external HTML anchors require `_blank` and
`noopener noreferrer`. DEV.to publishes EN; LinkedIn uses the PT post.
Distribution requires a published/reviewed/dated pair and public HTTP 200 URLs,
then manual workflow dispatch. No distribution entry point will be executed.

`check:release` inspects all source entries and rejects any unapproved draft
or missing article date, even when production excludes it. Its expected failure
is the correct editorial block; the checker must not be weakened or the draft
promoted to make it pass. Existing CI therefore remains release-blocked until
a separately authorized editorial/release step.

## Source snapshot and inspected evidence

OpsPilot public main was cloned read-only outside the portfolio to
`/tmp/opspilot-article-source`, at
`cacf611c1e7e31effe04895ec383673c76568876`. Article evidence URLs pin this
snapshot. No source-project files or provider credentials were changed, and
no OpsPilot tests or live smokes were rerun by this task.

Inspected README, CURRENT-STATE, retrieval-v2 report/protocol/results,
agent-workflow, live-provider-status and both live JSON records, observability,
ADRs 001/002, final-validation, vulnerability-summary, Terraform validation,
AWS deployment blueprint, pyproject and CI. Code inspection covered domain
Protocols, RagService, retrieval, OpenAI adapter, PostgreSQL tenant transactions
and retrieval SQL, agent models/policy/graph/store/GitLab adapter and HTTP
contracts. Test inspection covered policy/hash/graph topology, approvals,
adversarial planning, recovery after committed writes/process death, retrieval
isolation/pool reuse, provider validation and benchmark freeze guards.
Security evidence is in ADR 002, agent-workflow §9, and security-v1 cases;
there is no standalone OpsPilot SECURITY.md or threat-model document in this
snapshot. Terraform was inspected only to establish blueprint/validation scope.

## Divergences and resolution

1. `final-validation.md` says live providers and hosted CI were not executed.
   It is the historical pre-publication gate record. CURRENT-STATE explicitly
   preserves that scope and records later release/hosted CI and live smokes.
2. Agent-workflow §6 still says marker lookup was not verified on real GitLab.
   Its later §12/§13 and live-provider-status record sandbox marker lookup.
   Lost-response recovery and delayed real search visibility remain unmeasured.
3. Observability's older limitations say usage parsing was mocked only. The
   post-release OpenAI JSON records real usage and served models. Pricing remains
   unconfigured; conditional cost-check success is not cost measurement.
4. ADR 001 describes a single Phase 1 migration. CURRENT-STATE/code describe
   schema v2 and later migration tests; the article avoids historical inventory.
5. Retrieval-v2 held-out belongs to `7ba3378`; later readiness changes alter its
   fingerprint. The current freeze guard intentionally refuses rerunning it.
   Do not describe these historical numbers as a current-main benchmark.
6. The workflow introduction says “create it once”; its explicit failure limits
   and code do not guarantee exactly-once external execution. The draft uses
   bounded attempts, stable markers and reconciliation instead.

## Claim matrix

Paths below refer to the pinned OpsPilot snapshot. Abbreviated code paths are
under `src/opspilot/`; graph/models/store refer to `src/opspilot/agent/`.
Release artifact filenames refer to `docs/evidence/release/`.
Code inspection establishes implementation; retained artifacts establish the
reported execution. This editorial task does not independently reproduce them.

| Claim                                                                                        | Source                                                                 | Evidence type                                               | Limitation                                                                                               |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Tenant identity comes from bearer credentials, not request/model fields                      | `agent/policy.py`, `api/app.py`, `api/contracts.py`; security case S10 | Code + offline regression                                   | Static configured tokens; no SSO/identity lifecycle                                                      |
| Tenant filtering precedes retrieval ranking/limits; transaction-local context and forced RLS | `persistence/postgres.py`, ADR 002, `tests/test_integration.py`        | Code + retained real-PostgreSQL tests                       | Runtime role sets the GUC; not defense against arbitrary SQL as that role; no within-tenant ACL          |
| Overlapping chunks, exact vector + FTS retrieval and RRF                                     | README, `application.py`, `retrieval.py`, PostgreSQL SQL               | Code                                                        | Exact search scales linearly; no semantic reranker                                                       |
| Fabricated/duplicate citation IDs are rejected; uncited answers abstain                      | `application.py`, OpenAI adapter, ADR 002                              | Code + offline tests                                        | Membership is not entailment or answer quality; proposals have no universal groundedness guarantee       |
| 36 synthetic held-out queries; MRR@5 0.7532 / 0.4375 / 0.6306                                | `docs/evaluation/retrieval-v2.md`, held-out official JSON              | Frozen historical offline evaluation, real PostgreSQL       | `7ba3378`, fake deterministic embedder; not semantic embeddings, generated answers or current-main rerun |
| 24 dev queries separate from the consumed held-out; CI runs dev only                         | Retrieval-v2 protocol, `tests/test_benchmark.py`, CI                   | Protocol + guards/code                                      | Synthetic, one author; new changes need fresh held-out                                                   |
| Model may search/prepare/answer; cannot select external creation                             | `agent/policy.py`, graph topology, `tests/test_agent_unit.py`          | Code + offline topology test                                | Bounded workflow, one proposal per run; not model-quality evidence                                       |
| Authorization resolves projects/labels/assignees from tenant config                          | `agent/policy.py`, unit policy tests                                   | Code + offline tests                                        | Prompt/schema validity never confers authority                                                           |
| Distinct approver, canonical SHA-256 action hash, recheck hash/current policy                | `agent/models.py`, `graph.py`, `store.py`, workflow tests              | Code + retained PostgreSQL integration tests                | Hash binds integrity, not semantic correctness; changed action requires a new run                        |
| Ambiguous writes reconcile by stable marker on explicit resume                               | GitLab adapter, graph/store; recovery/workflow tests                   | Code + offline fault injection, real PostgreSQL/fake GitLab | Search delay/deleted marker/in-flight request can still duplicate; no automatic worker or exactly-once   |
| Agent evaluation passed 16/16 cases                                                          | `docs/evidence/phase3/agent-eval-v1.json`; release agent artifact      | Offline scripted/heuristic evaluation                       | Real PostgreSQL, fake GitLab; no real LLM decision-quality claim                                         |
| Compromised scripted planner cannot bypass configured action controls                        | Workflow §9, security-v1 S01–S06, workflow tests                       | Offline adversarial regression                              | Does not prove complete prompt-injection resistance or eliminate answer poisoning                        |
| OTel boundary spans, request/run/trace correlation, allowlisted signals                      | `docs/observability.md`, observability code/tests, local runtime JSON  | Code + retained local telemetry tests                       | Approval/resume are separate request traces correlated by run/audit; export may lose signals             |
| OpenAI live smoke passed on 2026-10-04                                                       | `live-openai-smoke.json`, live-provider-status                         | Real-provider integration                                   | Separate from GitLab; one small RAG path; no quality/cost claim, prices absent                           |
| GitLab sandbox smoke passed on 2026-10-05                                                    | `live-gitlab-smoke.json`, live-provider-status                         | Real-provider integration with offline planner              | One observed issue/create; no real lost-response recovery or combined live OpenAI+GitLab E2E             |
| Local release passed 241 unit / 72 integration tests; hosted CI reported PASS                | CURRENT-STATE, final-validation/clean-room, CI                         | Retained local execution + owner-confirmed hosted CI        | Counts describe that release validation, not tests rerun here or production performance                  |
| v0.1.0 is published on GitHub; AWS remains a blueprint                                       | CURRENT-STATE, AWS deployment/terraform-validation                     | Published-source status + offline validation                | No AWS apply/deployment, runtime or restore evidence                                                     |
| Release image has 44 HIGH findings without reported fixes; fixable gate passed               | `vulnerability-summary.md`, image report                               | Historical scanner evidence                                 | Not zero vulnerabilities or a current rescan; four IaC risks also retained                               |

## Final review and validation

Reviewed PT/EN for production claims, unqualified security, exactly-once,
combined live E2E, metric scope, MRR definitions, fake versus semantic
embeddings, Terraform versus deployment, smoke versus quality, and unsourced
numbers. All quantitative claims map to the sources above. Historical versus
current status is explicit. Neither article claims deployment, complete security,
real-model quality, measured cost or exactly-once.

Both drafts have 12 level-two headings, three code/text diagrams and one small
MRR table. An initial three-column evaluation table split words on mobile;
replaced it with four parallel explanatory items in both languages, without
changing shared CSS or adding dependencies. Final rendered captures were
inspected at desktop and mobile, including the article intro, ranking table and
evaluation section. Local artifacts are ignored under `reports/opspilot-article/`:

- `pt-1440-top.png`, `en-1440-top.png`, `pt-390-top.png`, `en-390-top.png`.
- Corresponding `*-retrieval.png` and `*-evaluation.png` at 1440/390px.
- `pt-768-top.png`, `en-768-top.png`, `pt-320-top.png`, `en-320-top.png`.
- `visual-review.json`, `external-links.json`, and saved `preview/` artifact.

Eight final browser configurations (PT/EN × 1440/768/390/320px) passed:
zero horizontal document overflow, zero axe WCAG-tagged violations, reciprocal
language navigation, twelve TOC destinations, one h1, correct locale/canonical/
alternates, preview noindex, no publication date, three code blocks and the
ranking table. Prose stays 17px on desktop/tablet and 16px on mobile.
All nine distinct external evidence links returned HTTP 200 on HEAD requests.

Body counts using the site's whitespace-based MDX counting method:
**PT 2,671 tokens / 13 minutes; EN 2,620 tokens / 12 minutes**. These counts
include Markdown/HTML syntax and code, exclude frontmatter, and are not
linguistic word-tokenization counts. LinkedIn text: **1,619 JavaScript string
characters**, valid bilingual marker and both future canonicals. DEV.to tags:
`ai`, `python`, `rag`, `programming`. Pure metadata validation passed;
`resolveArticlePair` refused the actual draft before any external request.
No distribution payload was sent or workflow invoked.

Executed gates:

| Gate                                            | Result                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------- |
| `bun run format` / `format:check`               | Passed                                                                          |
| `bun run typecheck`                             | Passed: 0 errors, 0 warnings, 20 existing hints                                 |
| `bun run lint`                                  | Passed                                                                          |
| `bun run test`                                  | 42 passed, 112 assertions                                                       |
| `bun run build:preview`                         | Passed: 40 pages                                                                |
| `bun scripts/check-artifacts.ts dist --preview` | Passed: 40 HTML documents                                                       |
| `bun run test:e2e`                              | Final preview: 24 passed                                                        |
| Final article browser review                    | Eight configurations passed                                                     |
| `bun run build`                                 | Passed: 38 pages; drafts absent                                                 |
| `bun scripts/check-artifacts.ts dist`           | Passed: 38 HTML documents                                                       |
| Additional production HTML/XML scan             | No draft page or slug reference                                                 |
| `bun run check:release`                         | Expected block: both drafts await review/date; four findings, no checker change |

The first sandboxed build was blocked by esbuild EPERM and passed outside that
sandbox. The first custom browser probe used an incompatible implicit context;
it was corrected to explicit `browser.newContext()` and rerun successfully.
The first sandboxed external-link check failed DNS; the authorized read-only
network check returned 200 for every evidence URL. These failures did not
require changing product code or weakening gates.

`dist/` holds the production artifact. A saved local preview retains both
drafts for review, served locally at `http://127.0.0.1:3101`.
Both article routes return HTTP 200 there and HTTP 404 on the local production
artifact at port 3100. Editorial approval is still pending; `reviewed: false` is
intentional after this factual self-review. Git whitespace validation and
the final commit/status are recorded in the task report. No push, deploy,
publication, distribution, provider execution, or OpsPilot source edit occurred.
