import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ReactComponent as CheckMarkIcon } from '../@assets/icons/check.svg';
import { ReactComponent as XMarkIcon } from '../@assets/icons/close.svg';
import ToggleSwitch from '../components/@common/toggle/ToggleSwitch';
import { theme } from '../styles/theme';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    isToggle: { control: false },
    onToggleClick: { control: false },
  },
  render: (args) => {
    const [isToggle, setIsToggle] = useState(false);
    return (
      <ToggleSwitch
        {...args}
        isToggle={isToggle}
        onToggleClick={() => setIsToggle((prev) => !prev)}
      />
    );
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    thumbIconInfo: {
      offIcon: <XMarkIcon />,
      onIcon: <CheckMarkIcon color={theme.colors.primary} />,
    },
  },
};
