import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import Toggle from '../components/@common/toggle/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  render: () => {
    const [isToggle, setIsToggle] = useState(false);
    return (
      <Toggle
        isToggle={isToggle}
        onToggleClick={() => setIsToggle((prev) => !prev)}
      />
    );
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
