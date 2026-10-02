# Laya vs Jev — editorial evidence and release review

Prepared and editorially finalized on 2026-10-02. The user explicitly
authorized marking the pair publishable after a complete factual and editorial
review. Both articles now have `status: published`, `reviewed: true`, and
`publishedAt: 2026-10-02`. This enables the production artifact locally; no
push, deployment, distribution API call, model execution, or modification to
Ops Triage AI was performed.

## Deliverables

- PT-BR: **Laya vs Jev na prática: zero-shot, fine-tuning e o custo real de um
  decision model open-source**.
- EN: **Laya vs Jev in Practice: Zero-Shot, Fine-Tuning, and the Real Cost of
  an Open-Source Decision Model**.
- Shared slug/translationKey: `laya-vs-jev-zero-shot-fine-tuning`.
- PT-BR frontmatter contains one bilingual LinkedIn post, both canonicals,
  the English section marker, and shared hashtags. It is the sole versioned
  source of that post.
- EN frontmatter contains DEV.to tags: `ai`, `machinelearning`, `opensource`,
  `mlops`. The existing payload builder derives title, description, and body
  from EN, and canonical
  `https://marcelotaparelli.com.br/en/articles/laya-vs-jev-zero-shot-fine-tuning/`.
- Existing distribution workflow remains manual; it was not invoked.

The narrative asks what changes when a hosted model that works well zero-shot
is compared with open weights that can be adapted. It explains the interface,
keeps the demo anecdotal, reuses the existing benchmark, follows the training
audit, and treats control as an operational responsibility. It makes no
general winner, replacement, production-readiness, or zero-total-cost claim.

## Sources inspected

Portfolio sources: `src/content/articles/`, `src/content.config.ts`, both Jev
articles and Ops Triage cases, `docs/architecture.md`, editorial checklist and
distribution conventions in `docs/github-actions.md`,
`docs/implementation-status.md`, all five files in `scripts/distribution/`,
`.github/workflows/distribute-content.yml`, `scripts/check-release.ts`,
`scripts/check-artifacts.ts`, CI workflow, and E2E configuration.

Ops Triage AI was inspected read-only at public `main` commit
`e8c75f0ff75aafcd24403f860e1ad7d4450392f5`. Article evidence links pin that
snapshot. The primary sources are its README, Laya zero-shot protocol/report,
adaptation audit, domain-adaptation protocol/runbook/final report, both freeze
manifests, Jev report/artifact, Laya held-out artifacts, training artifact,
checkpoint-selection artifact, selected TRAIN evaluation, and checkpoint
metadata. Sources were downloaded outside the portfolio to `/tmp` for review.

Key public evidence:

- [Zero-shot report](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/laya-held-out-a9725ea.md)
  and [artifact](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-held-out.json).
- [Domain-adaptation protocol](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/laya-domain-adaptation-protocol.md),
  [Freeze 2](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-adapt-freeze.json),
  [final report](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/laya-domain-adaptation-final-report.md),
  and [held-out artifact](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/artifacts/laya-adapt-held-out.json).
- [Mapping audit](https://github.com/marcelotaparelli/ops-triage-ai/blob/e8c75f0ff75aafcd24403f860e1ad7d4450392f5/docs/evaluation/laya-adaptation-audit.md).

External primary sources:

| Source                                                                                                                             | Editorial use                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [TypeSafe announcement](https://typesafe.ai/blog/introducing-system-one-models-and-jev)                                            | Jev announcement dated 2026-09-15; vendor category name; typed non-generative interface. Vendor marketing about hallucination or universal calibration is not adopted.                                           |
| [Laya initial-release commit](https://huggingface.co/convaiinnovations/laya/commit/00c37c405e3c3ad73ee070227614c89cda06b99e)       | Official Hub history dates the commit titled “Initial release of Laya fine-tuned System 1 decision model” to 2026-09-18T05:13:12Z. Copy describes that record precisely; it does not infer development duration. |
| [Official Laya repository](https://github.com/NandhaKishorM/laya)                                                                  | Project identity, non-autoregressive architecture, self-hosting and adaptation.                                                                                                                                  |
| [Laya runtime release v0.3.23](https://github.com/NandhaKishorM/laya/releases/tag/v0.3.23)                                         | GitHub API `published_at`: 2026-10-01T17:30:49Z; matches the experimental runtime version.                                                                                                                       |
| [Pinned English model card](https://huggingface.co/convaiinnovations/laya/blob/55cf4c4ebb4ebe31b2550e8bdf3bd21b99753851/README.md) | General English checkpoint, ModernBERT-large plus decision head, 421M parameters.                                                                                                                                |
| [Runtime license](https://github.com/NandhaKishorM/laya/blob/v0.3.23/LICENSE)                                                      | Apache 2.0; base and specialized model cards also identify Apache 2.0.                                                                                                                                           |
| [Specialized model card](https://huggingface.co/convaiinnovations/laya-typed-decisions)                                            | Fine-tuned workflows, base/specialized distinction, third-party Jev numbers not measured in the same run. Third-party benchmark figures are not reproduced as an Ops Triage ranking.                             |

Flowtivity was not used as a factual source. No verifiable voice-demo URL was
found in the project context. The article explicitly presents the voice flow
and 1,000+ assets/components as the user-observed demonstration, without
benchmark status or a universal requirement claim.

## Source consistency and interpretation

The inspected README still summarizes zero-shot and does not include
domain adaptation. It has no competing adapted metric; this is a missing
summary, not a numeric conflict. The article discloses the omission and links
the final report and artifacts directly. No README change was made.

The audit does **not** preserve native raw responses byte for byte. Parsed
choices and copied probabilities, mapping/order code, and example rows are
auditable. The article follows that scope instead of the stronger raw-output
audit claim suggested in the request.

The article uses recorded report/artifact aggregates and reported counts,
converting their display to locale-appropriate percentages and rounding
latency/cost as already displayed in the reports. No experiment or metric
recalculation was run. Reviewed aggregates agree across reports and artifacts:

| Metric                        |       Jev 1.13 | Laya zero-shot |   Laya adapted |
| ----------------------------- | -------------: | -------------: | -------------: |
| Category accuracy             |           100% |         84.29% |         97.14% |
| Priority accuracy             |         98.57% |         31.43% |         94.29% |
| Risk accuracy                 |         95.71% |         62.86% |         92.86% |
| HIGH/CRITICAL priority recall |           100% |         92.86% |         85.71% |
| HIGH risk recall              |         85.71% |         57.14% |           100% |
| Exact tuple                   | 94.29% (66/70) |  11.43% (8/70) | 85.71% (60/70) |

Other published measurements:

- LOW→MEDIUM errors: base 40/40, adapted 0/40.
- TRAIN/VALIDATION/HELD-OUT exact tuple: 100% / 92.50% / 85.71%.
- Adapted answer-confidence means: 0.99986 / 0.99997 / 0.99884.
- Adapted Brier: 0.05715 / 0.11429 / 0.13841; ECE:
  0.02844 / 0.05711 / 0.07027 (category / priority / risk).
- Selective thresholds through 0.90: 70/70 retained, 85.71% exact tuple;
  0.95 and 0.99: 69/70 retained, 86.96% exact tuple. No threshold tuning.
- Mean request latency: base CPU 1,414 ms; adapted CPU 1,619 ms;
  historical Jev network/API 569 ms. Load excluded from Laya request means.
- Historical Jev usage: US$ 0.003789618; Laya external inference charge:
  US$ 0, with CPU/infrastructure/energy cost unmonetized.
- Observed Pod rates: approximately US$ 0.27/GPU-hour or US$ 0.28/h with
  container disk. Measured task duration: 1,523.51 seconds; estimated task
  cost including disk US$ 0.1185. Setup, startup, idle time, and total billing
  are not included; invoice unavailable.
- Corrected training accounting: 420 attempts / 413 applied updates /
  7 GradScaler skips / 413 scheduler steps; RTX A5000 24 GB; four epochs.

Jev is defined as a non-generative probabilistic structured-decision model;
“System One” is identified as TypeSafe terminology. Laya is defined as an
open-code/open-weight non-autoregressive decision model. Experiment A compares
zero-shot results. B reuses historical unchanged Jev against Laya adapted with
1,120 TRAIN tickets and checkpoint selection on 280 VALIDATION tickets.
Different prompts, exposure, and serving paths are explicit.

Limitations cover synthetic English data, 70 held-out tickets, one official
run per protocol, related TRAIN/VALIDATION scenarios, no real traffic or
production, confidence semantics, incomparable latency paths, unavailable
native raw responses and billing, and evaluation-only status outside
HybridPolicy. Public artifacts contain checkpoint metadata and hashes, not the
approximately 843 MB adapted weights; byte-identical reproduction requires
those externally retained weights. Memorization/overconfidence is an
interpretation of perfect TRAIN fit and split differences, not a diagnosis of
severe overfitting.

## Final editorial review

Both complete article bodies and the bilingual LinkedIn copy were read and
reviewed. Repetition and defensive report-style sentences were shortened,
and the infrastructure explanation retains the RTX A5000, mixed precision,
GradScaler/scheduler correction, preserved first run, and corrected update
accounting without expanding into a training tutorial.

The temporal hook now explicitly compares the Jev announcement and the
initial release record used for Laya. The official Hub commits API confirms
`00c37c405e3c3ad73ee070227614c89cda06b99e` at
`2026-09-18T05:13:12.000Z`; the wording measures public records, not development
time. This precision also appears in the LinkedIn hook.

The comparison table names the TRAIN exposure in both column headers. Its
interpretation now emphasizes strong Jev out-of-the-box generalization and
Laya's adaptation control, replacing the comparative phrase “generalized
better.” The 11.43% → 85.71% trajectory and Jev's 94.29% without our TRAIN
tickets are repeated immediately beside that table so it cannot be read as a
matched-training contest. Classification, confidence, coverage, latency, and
cost values are unchanged. No independent calibration claim was introduced.

All 22 unique public source URLs and four already-published internal targets
returned HTTP 200. Six GitHub artifact pages initially returned transient 503
and returned 200 on retry; their raw files at the same pinned commit also
returned 200. All linked snapshot paths are publicly available. The two new
article canonicals are prepared for the eventual deployment, not claimed to
have been deployed by this task.

## Final validation and release state

| Gate                                            | Result                                          |
| ----------------------------------------------- | ----------------------------------------------- |
| `bun run format` / `bun run format:check`       | Passed; existing files unchanged by formatting. |
| `bun run typecheck`                             | 0 errors, 0 warnings, 18 existing hints.        |
| `bun run lint`                                  | Passed.                                         |
| `bun run test`                                  | 38 passed, 0 failed.                            |
| `bun run build:preview`                         | 36 pages.                                       |
| `bun scripts/check-artifacts.ts dist --preview` | 36 HTML documents validated.                    |
| `bun run test:e2e`                              | 13 passed.                                      |
| `bun run build`                                 | 36 pages; both new article routes included.     |
| `bun scripts/check-artifacts.ts dist`           | 36 HTML documents validated.                    |
| `bun run check:release`                         | Passed, exit 0.                                 |

The final production article routes were inspected in Chromium at 320px and
1440px: no page overflow and no WCAG-tagged axe violations. Production
inspection confirmed both routes and sitemap entries, indexable metadata,
and the same editorial date. Preview artifact validation still enforces
noindex. Each article retains 18 section headings and seven tables.

The revised LinkedIn input is 2,077 characters, with PT-BR, the separator and
English section marker, EN, both canonicals, and shared hashtags. The existing
pair resolver and DEV.to/LinkedIn payload builders were exercised locally
without network publication. DEV.to uses the EN body and canonical with the
same four tags. No distribution CLI or workflow was invoked.

The environment initially lacked Git and Bun. Bun 1.4.2, Git, and Chromium
were installed as tooling; `bun install --frozen-lockfile` used the existing
lockfile without dependency changes. Builds and browser checks required
escalated execution after sandbox EPERM failures. The first extra axe
inspection needed an explicit browser context and was corrected; the
four successful article/viewport inspections above followed that correction.

The release validator remains unchanged and is now green. Deployment and
external distribution remain explicitly unauthorized by the user for this
task. Final whitespace and working-tree checks are recorded in the delivery
report after the local commit.
