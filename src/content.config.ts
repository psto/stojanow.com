import { defineCollection, type SchemaContext } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const CONTENT_BASE = "./src/data";
const GLOB_PATTERN = "**/[^_]*.md";

const createPostSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string(),
    draft: z.boolean().optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
  });

const essays = defineCollection({
  loader: glob({ pattern: GLOB_PATTERN, base: `${CONTENT_BASE}/essays` }),
  schema: ({ image }) => createPostSchema({ image }),
});

const fiction = defineCollection({
  loader: glob({ pattern: GLOB_PATTERN, base: `${CONTENT_BASE}/fiction` }),
  schema: ({ image }) => createPostSchema({ image }),
});

const notes = defineCollection({
  loader: glob({ pattern: GLOB_PATTERN, base: `${CONTENT_BASE}/notes` }),
  schema: ({ image }) =>
    createPostSchema({ image }).extend({
      dateRead: z.string().or(z.date()),
      amazon: z.string(),
    }),
});

const tilSchema = z.object({
  title: z.string(),
  date: z.string().or(z.date()),
  description: z.string(),
  draft: z.boolean().optional(),
  tags: z.string(),
  imageAlt: z.string().optional(),
});

const til = defineCollection({
  loader: glob({ pattern: GLOB_PATTERN, base: `${CONTENT_BASE}/til` }),
  schema: tilSchema,
});

export const collections = {
  essays,
  fiction,
  notes,
  til,
};
