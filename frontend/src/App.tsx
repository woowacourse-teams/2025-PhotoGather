import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import OverlayProvider from './context/OverlayProvider';
import router from './router/router';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <OverlayProvider>
        <RouterProvider router={router} />
      </OverlayProvider>
    </ThemeProvider>
  );
};

export default App;
