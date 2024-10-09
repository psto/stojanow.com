import sitemap from "@astrojs/sitemap";
import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import Icons from "unplugin-icons/vite";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://stojanow.com/",
  image: {
    service: squooshImageService(),
  },
  integrations: [
    sitemap(),
    tailwind(),
    compress({ img: false, svg: false }),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
    ssr: {
      external: ["svgo"],
    },
  },
});
