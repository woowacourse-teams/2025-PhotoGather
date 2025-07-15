import { ThemeProvider } from '@emotion/react';
import InfoBox from './components/infoBox/InfoBox';
import { INFO } from './constants/messages';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <InfoBox
        description={INFO.LINK_WARNING.description}
        highlightText={INFO.LINK_WARNING.highlightText}
      />
    </ThemeProvider>
  );
};

export default App;
