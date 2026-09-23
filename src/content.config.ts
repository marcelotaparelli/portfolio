import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const common = {
  translationKey: z.string().min(1),
  locale: z.enum(['pt-BR', 'en']),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['draft', 'published']).default('draft'),
  reviewed: z.boolean().default(false),
};

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    ...common,
    order: z.number().int(),
    category: z.string(),
    role: z.string(),
    context: z.string(),
    technologies: z.array(z.string()),
    externalUrl: z.url().optional(),
    contribution: z.string(),
  }),
});

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/articles',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    ...common,
    category: z.string(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    // Distribution input metadata (DEV.to + LinkedIn).
    // Convention: the EN file carries devto.tags; the PT-BR file carries
    // one bilingual linkedin.text with PT + EN sections and both canonicals.
    // Remote publication state lives on `distribution-state`, never here.
    distribution: z
      .object({
        devto: z
          .object({
            // DEV API accepts at most 4 tags.
            tags: z.array(z.string().min(1)).min(1).max(4),
          })
          .optional(),
        linkedin: z
          .object({
            // One versioned bilingual post, reviewed in PR. The distribution
            // validator checks both canonicals and the English section marker.
            // LinkedIn allows up to 3000 characters.
            text: z.string().min(1).max(3000),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const collections = { projects, articles };
