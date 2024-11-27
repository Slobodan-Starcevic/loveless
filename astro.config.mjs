// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import playformInline from '@playform/inline';

import playformFormat from '@playform/format';

import sitemap from '@astrojs/sitemap';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
    site: 'https://mrloveless.netlify.app/',
    devToolbar: { enabled: false },
    integrations: [vue(), sitemap(), playformInline({}), playformFormat({})],
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