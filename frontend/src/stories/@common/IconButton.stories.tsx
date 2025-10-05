import type { Meta, StoryObj } from '@storybook/react';
import { FiLink, FiSave, FiTrash2 } from 'react-icons/fi';
import IconButton from '../../components/@common/buttons/iconButton/IconButton';
import { theme } from '../../styles/theme';

const meta: Meta<typeof IconButton> = {
  title: 'Components/Button/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: false,
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <FiLink />,
    variant: 'default',
  },
};

export const Outline: Story = {
  args: {
    icon: <FiLink />,
    variant: 'outline',
  },
};

export const Dark: Story = {
  args: {
    icon: <FiLink />,
    variant: 'dark',
  },
};

export const DarkWithWhiteIcon: Story = {
  args: {
    icon: <FiSave color={theme.colors.white} />,
    variant: 'dark',
  },
};

export const Danger: Story = {
  args: {
    icon: <FiTrash2 color={theme.colors.error} />,
    variant: 'danger',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: theme.colors.gray02,
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
