import type { Decorator, Preview } from '@storybook/react-webpack5';
import GlobalStyles from '../src/styles/GlobalStyles';

const withGlobalStyle: Decorator = (Story) => (
  <>
    <GlobalStyles />
    <Story />
  </>
);

const preview: Preview = {
  decorators: [withGlobalStyle],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
