import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastProvider';
import router from './router/router';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { goToTop } from './utils/goToTop';

const App = () => {
  useEffect(() => {
    goToTop();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
