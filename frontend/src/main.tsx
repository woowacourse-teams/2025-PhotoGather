import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// biome-ignore lint/style/noNonNullAssertion : 루트에서 non-null 무시
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
