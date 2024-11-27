// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import playformInline from '@playform/inline';

import playformCompress from '@playform/compress';

import playformFormat from '@playform/format';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://mrloveless.netlify.app/',
    devToolbar: { enabled: false },
    integrations: [vue(), sitemap(), playformInline({}), playformFormat({}), playformCompress()],
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