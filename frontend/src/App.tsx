import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
