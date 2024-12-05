import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const postCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/essays" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string(),
    draft: z.boolean().optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
  }),
});

const fictionCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/fiction" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string(),
    draft: z.boolean().optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
  }),
});

const noteCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/notes" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string(),
    draft: z.boolean().optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    dateRead: z.string().or(z.date()),
    amazon: z.string(),
  }),
});

const tilCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/til" }),
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string(),
    draft: z.boolean().optional(),
    tags: z.string(),
    imageAlt: z.string().optional(),
  }),
})

export const collections = {
  essays: postCollection,
  fiction: fictionCollection,
  notes: noteCollection,
  til: tilCollection
};
