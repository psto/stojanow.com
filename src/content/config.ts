import { z, defineCollection } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  date: z.string().or(z.date()),
  description: z.string(),
  draft: z.boolean().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const postCollection = defineCollection({
  schema: postSchema,
});

const noteCollection = defineCollection({
  schema: postSchema.extend({
    dateRead: z.string().or(z.date()),
    amazon: z.string(),
  }),
});

export const collections = {
  essays: postCollection,
  fiction: postCollection,
  notes: noteCollection,
};
