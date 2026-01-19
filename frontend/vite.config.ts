import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import svgr from 'vite-plugin-svgr';

const isProduction = process.env.VITE_ENVIRONMENT === 'production';

const DEFAULT_IMAGE_CONFIG = {
  format: 'webp',
  w: '600',
};

const IMAGE_CONFIG_OPTION = {
  'space-create.png': { w: '300' },
} as const;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    imagetools({
      defaultDirectives: (url: URL) => {
        const isImage = /\.(png|jpg|jpeg)$/.test(url.pathname);
        if (!isImage) return new URLSearchParams();

        const fileName = url.pathname.split('/').pop() || '';
        const OVERRIDE_CONFIG = IMAGE_CONFIG_OPTION[fileName as keyof typeof IMAGE_CONFIG_OPTION];

        return new URLSearchParams({
          ...DEFAULT_IMAGE_CONFIG,
          ...OVERRIDE_CONFIG,
        });
      },
    }),
    isProduction
      ? sentryVitePlugin({
          org: process.env.VITE_SENTRY_ORG,
          project: process.env.VITE_SENTRY_PROJECT,
          authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
        })
      : null,
  ],
  build: {
    sourcemap: true,
  },
});
