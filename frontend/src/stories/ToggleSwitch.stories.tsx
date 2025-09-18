import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import ToggleSwitch from '../components/@common/toggle/ToggleSwitch';

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
