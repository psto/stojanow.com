import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["tests/**/*.test.ts"],
  },
} as Parameters<typeof getViteConfig>[0]);
