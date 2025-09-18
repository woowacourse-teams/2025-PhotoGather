import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import ToggleSwitch from '../components/@common/toggle/ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  render: () => {
    const [isToggle, setIsToggle] = useState(false);
    return (
      <ToggleSwitch
        isToggle={isToggle}
        onToggleClick={() => setIsToggle((prev) => !prev)}
      />
    );
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
