import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const isProduction = process.env.VITE_ENVIRONMENT === 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
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
