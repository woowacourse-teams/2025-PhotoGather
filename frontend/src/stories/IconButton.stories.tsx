import type { Meta, StoryObj } from '@storybook/react';
import { FiLink } from 'react-icons/fi';
import IconButton from '../components/@common/buttons/iconButton/IconButton';

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
