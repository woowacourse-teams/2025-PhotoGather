import Clarity from '@microsoft/clarity';
import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import mixpanel from 'mixpanel-browser';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App.tsx';

export const queryClient = new QueryClient();

if (import.meta.env.VITE_ENVIRONMENT === 'production') {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT,
    sendDefaultPii: true,
  });
  Clarity.init(import.meta.env.VITE_CLARITY_PROJECT_ID);

  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
    debug: false,
    ignore_dnt: true,
  });

  const MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_TAG_ID;
  if (MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID, {
      gtagOptions: {
        send_page_view: false,
      },
    });
  }
}

const JAVASCRIPT_KEY = import.meta.env.VITE_APP_JAVASCRIPT_KEY;
window.Kakao.init(JAVASCRIPT_KEY);
window.Kakao.isInitialized();

// biome-ignore lint/style/noNonNullAssertion : 루트에서 non-null 무시
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  // </StrictMode>,
);
