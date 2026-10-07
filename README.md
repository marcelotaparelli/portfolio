# Marcelo Taparelli — Professional Portfolio

AI Engineer with a strong Software Engineering foundation and a Product mindset.

Built around a simple principle:

> From real problems to AI products.

## How I work

I build AI systems from the business problem to production — combining AI Engineering, Software Engineering, verification, security, observability and measurement.

Business Problem → Domain Model → Architecture → Constraints → AI / Agent Orchestration → Verification → Security → Production → Measurement → Improvement

AI Engineering is my primary career, Software Engineering is the foundation, and Product is the lens for deciding what is worth building. Public cases document the evidence and limits of experiments, labs, and integrations; this method does not imply every project has been deployed to production.

## Stack

- Bun
- Astro
- TypeScript
- MDX
- Tailwind CSS

The site is statically generated and intentionally ships almost no client-side JavaScript.

## Architecture

The portfolio was designed as a bilingual editorial system rather than a conventional SPA.

- PT-BR at `/`
- English at `/en/`
- statically generated content
- bilingual projects and articles
- canonical and hreflang validation
- draft/publication workflow
- automated artifact validation

No backend, database, CMS or application server is required.

## Engineering principles

- simplicity before complexity
- explicit architecture
- dependencies only when justified
- accessibility as a product requirement
- automated quality gates
- security controls proportional to trust boundaries
- bounded resource use and performance measured rather than assumed
- human review in AI-assisted development

## Quality

The project includes automated validation for:

- TypeScript
- linting and formatting
- bilingual publication integrity
- internal links
- SEO metadata
- accessibility
- browser navigation
- production artifacts

## Performance

Laboratory measurements of the production build have achieved:

- Lighthouse Performance: 100
- Lighthouse Accessibility: 100
- LCP: ~1.5–1.7s
- CLS: ~0.0006
- TBT: 0ms

These are laboratory measurements, not real-user Core Web Vitals.

## Development

```bash
bun install
bun dev
```

Development server:

```text
http://localhost:3000
```

The project uses a strict port configuration and does not silently fall back to another port.

## Build

```bash
bun run build
```

The production artifact is generated in:

```text
dist/
```

## Operations

- GitHub Actions and publishing runbook: `docs/github-actions.md`

## Author

**Marcelo Taparelli**

AI Engineer | Software Engineer | Product-minded

- Portfolio: https://marcelotaparelli.com.br
- LinkedIn: https://www.linkedin.com/in/marcelo-taparelli/
- GitHub: https://github.com/marcelotaparelli
