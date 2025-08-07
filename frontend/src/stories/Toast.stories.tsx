import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../components/@common/notification/toast/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    text: '토스트 안내 메시지입니다.',
  },
};

export const ErrorToast: Story = {
  args: {
    text: '에러 안내 메시지입니다.',
    type: 'error',
  },
};

export const TopToast: Story = {
  args: {
    text: '새로운 사진 5장이 추가됐어요',
    position: 'top',
  },
};

export const LongTextToast: Story = {
  args: {
    text: '아주아주아주아주아주아주아주 긴 토스트입니다.',
    type: 'error',
  },
};
