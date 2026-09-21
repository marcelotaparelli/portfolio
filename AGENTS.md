# AGENTS.md

This file defines durable constraints for coding agents working in this repository.
Variable execution state belongs in `docs/implementation-status.md`, not here.

## Architecture

- Bun + Astro + TypeScript strict; static output.
- PT-BR served at `/`, EN served at `/en/`.
- Published content must keep parity between both languages.
- Favor simplicity, performance, and few dependencies.
- Do not switch stacks, redesign, or refactor by preference.

## Quality gates

- Consult `package.json` for commands; do not invent commands.
- Relevant principles: typecheck, lint, format check, unit tests, E2E,
  production build, preview build, and artifact validation.
- Never weaken tests or validators only to make them green.

## Dependency policy

- Do not add a dependency without demonstrated, concrete need.
- Introduce abstractions only when justified.
- Do not add React or a parallel stack without a real problem requiring it.

## Security and publication integrity

- Drafts must never leak into production.
- Preserve the existing PT/EN publication model.
- Do not invent metrics, results, claims, or content.
- Preserve security and publication constraints already enforced by code and tests.

## Agent workflow

- Agents may work only within repository constraints.
- Architectural changes require explicit justification.
- Generated changes require human review.
- Never weaken tests or validators.
- Do not add dependencies without demonstrated need.
- Do not push automatically unless explicitly authorized.
- Update status and documentation only with verified facts.
