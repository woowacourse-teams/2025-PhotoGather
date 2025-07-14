import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
