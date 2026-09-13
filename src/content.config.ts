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
  }),
});

export const collections = { projects, articles };
