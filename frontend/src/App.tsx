import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import router from './router/router';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
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
