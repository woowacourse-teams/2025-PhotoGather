import { ThemeProvider } from '@emotion/react';
import type { Decorator, Preview } from '@storybook/react-webpack5';
import GlobalStyles from '../src/styles/GlobalStyles';
import { theme } from '../src/styles/theme';

const withGlobalStyle: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withGlobalStyle],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
