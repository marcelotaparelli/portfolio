# Marcelo Taparelli — Professional Portfolio

Professional engineering portfolio focused on Software Engineering, Applied AI Engineering and Product.

Built around a simple principle:

> From real problems to intelligent products.

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
- performance measured rather than assumed
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
