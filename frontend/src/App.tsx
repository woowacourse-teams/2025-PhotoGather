import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Test>안녕하세요</Test>
    </ThemeProvider>
  );
};

const Test = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}
`;

export default App;
