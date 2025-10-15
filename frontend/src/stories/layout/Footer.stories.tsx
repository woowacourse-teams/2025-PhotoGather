import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../../components/@common/footer/Footer';
import { theme } from '../../styles/theme';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {
    mode: 'light',
  },
};

export const DarkMode: Story = {
  args: {
    mode: 'dark',
  },

  decorators: [
    (Story) => (
      <div style={{ backgroundColor: theme.colors.gray05 }}>
        <Story />
      </div>
    ),
  ],
};
