import Clarity from '@microsoft/clarity';
import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

export const queryClient = new QueryClient();

if (import.meta.env.VITE_ENVIRONMENT === 'production') {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT,
    sendDefaultPii: true,
  });
  Clarity.init(import.meta.env.VITE_CLARITY_PROJECT_ID);
}

// biome-ignore lint/style/noNonNullAssertion : 루트에서 non-null 무시
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  // </StrictMode>,
);
