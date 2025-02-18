import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";
import compress from "astro-compress";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://stojanow.com/",
  integrations: [
    sitemap(),
    compress({ img: false, svg: false }),
  ],
  vite: {
    plugins: [Icons({ compiler: "astro", }), tailwindcss()],
    ssr: {
      external: ["svgo"],
    },
  },
});
