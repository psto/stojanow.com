import { z, defineCollection } from "astro:content";

const postSchema = ({ image }) => z.object({
  title: z.string(),
  date: z.string().or(z.date()),
  description: z.string(),
  draft: z.boolean().optional(),
  image: image().optional(),
  imageAlt: z.string().optional(),
});

const postCollection = defineCollection({
  schema: postSchema,
});

const noteCollection = defineCollection({
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

export const collections = {
  essays: postCollection,
  fiction: postCollection,
  notes: noteCollection,
};
