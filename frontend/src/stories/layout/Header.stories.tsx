import type { Meta, StoryObj } from '@storybook/react';
import { FiSettings, FiShare2 } from 'react-icons/fi';
import Header from '../../components/@common/header/Header';
import { theme } from '../../styles/theme';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    icons: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {
    mode: 'light',
    icons: [
      {
        icon: <FiSettings size={24} />,
        onClick: () => console.log('Settings clicked'),
      },
      {
        icon: <FiShare2 size={24} />,
        onClick: () => console.log('Share clicked'),
      },
    ],
  },
};

export const DarkMode: Story = {
  args: {
    mode: 'dark',
    icons: [
      {
        icon: <FiSettings size={24} />,
        onClick: () => console.log('Settings clicked'),
      },
      {
        icon: <FiShare2 size={24} />,
        onClick: () => console.log('Share clicked'),
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: theme.colors.gray05 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutIcons: Story = {
  args: {
    mode: 'light',
    icons: [],
  },
};

export const WithSingleIcon: Story = {
  args: {
    mode: 'light',
    icons: [
      {
        icon: <FiSettings size={24} />,
        onClick: () => console.log('Settings clicked'),
      },
    ],
  },
};
