import type { Meta, StoryObj } from '@storybook/react';
import UserBadge from '../components/userBadge/UserBadge';

const meta: Meta<typeof UserBadge> = {
  title: 'Components/UserBadge',
  component: UserBadge,
};
export default meta;

type Story = StoryObj<typeof UserBadge>;

export const Default: Story = {
  args: {
    nickName: '성원숭의분노의주먹',
  },
};
