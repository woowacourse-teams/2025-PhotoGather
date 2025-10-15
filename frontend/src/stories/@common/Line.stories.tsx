import type { Meta, StoryObj } from '@storybook/react';
import Line from '../../components/@common/line/Line';

const meta: Meta<typeof Line> = {
  title: 'Components/Line',
  component: Line,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 64,
    leftElement: <>왼쪽</>,
    rightElement: <>오른쪽</>,
  },
};
