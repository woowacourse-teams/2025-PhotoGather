import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

export const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion : 루트에서 non-null 무시
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  // </StrictMode>,
);
