import type { Meta, StoryObj } from '@storybook/react';
import BorderButton from '../components/@common/buttons/borderButton/BorderButton';

const meta: Meta<typeof BorderButton> = {
  title: 'Components/Button/Border',
  component: BorderButton,
};
export default meta;

type Story = StoryObj<typeof BorderButton>;

export const Selected: Story = {
  args: {
    heading: { text: '버튼 타이틀', icon: <span>😎</span> },
    description: '선택된 테두리 버튼입니다.',
    variant: 'selected',
    disabled: false,
  },
};

export const Unselected: Story = {
  args: {
    heading: { text: '버튼 타이틀', icon: <span>🥲</span> },
    description: '선택되지 않은 테두리 버튼입니다.',
    variant: 'unselected',
    disabled: false,
  },
};
