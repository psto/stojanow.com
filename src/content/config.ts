import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const noteCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    dateRead: z.string().or(z.date()),
    description: z.string(),
    amazon: z.string(),
    image: z.string(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = {
  'essays': postCollection,
  'fiction': postCollection,
  'notes': noteCollection,
};

