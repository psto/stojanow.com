import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://stojanow.com/",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap(),
    (await import("@playform/compress")).default({
      Image: false,
      SVG: false,
    }),
  ],
  vite: {
    plugins: [Icons({ compiler: "astro" }), tailwindcss()],
    ssr: {
      external: ["svgo"],
    },
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
    },
  },
});
