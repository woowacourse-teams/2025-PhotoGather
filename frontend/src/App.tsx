import { ThemeProvider } from '@emotion/react';
import InfoBox from './components/infoBox/InfoBox';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <InfoBox description="설명입니다" />
    </ThemeProvider>
  );
};

export default App;
