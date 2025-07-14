import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>안녕하세요</div>
      <div>Hello World</div>
    </ThemeProvider>
  );
};

export default App;
