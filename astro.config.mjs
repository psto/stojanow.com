import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://stojanow.com/",
	integrations: [
    sitemap(),
		(await import("@playform/compress")).default({
			Image: false,
			SVG: false,
		}),
	],
  vite: {
    plugins: [Icons({ compiler: "astro", }), tailwindcss()],
    ssr: {
      external: ["svgo"],
    },
  },
});
