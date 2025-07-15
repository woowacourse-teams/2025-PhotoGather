import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import Input from './components/input/Input';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Input
        id="input"
        aria-label="input"
        value={value}
        onChange={handleChange}
        maxCount={10}
      />
    </ThemeProvider>
  );
};

export default App;
