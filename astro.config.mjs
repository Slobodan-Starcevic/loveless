// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://mrloveless.netlify.app/',
    devToolbar: { enabled: false },
    integrations: [vue(), sitemap()],
    vite: {
        css: {
          preprocessorOptions: {
            scss: {
              api: "modern-compiler",
              importers: [],
            },
          },
        },
      }
});