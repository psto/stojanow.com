import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  type: 'content',
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
  type: 'content',
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
  type: 'content',
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
  fiction: postCollection,
  notes: noteCollection,
  til: tilCollection
};
