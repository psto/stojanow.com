import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import Icons from 'unplugin-icons/vite';
import mdx from "@astrojs/mdx";
import robotsTxt from 'astro-robots-txt';
import compress from "astro-compress";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://stojanow.com',
  experimental: {
    integrations: true
  },
  integrations: [sitemap(), tailwind(), vue(), mdx(), compress(), robotsTxt({
    sitemap: false
  }), image()],
  vite: {
    plugins: [Icons()],
    ssr: {
      external: ['svgo']
    }
  }
});