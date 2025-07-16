import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/@common/input/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    maxCount: 10,
    placeholder: '내용을 입력하세요',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    value: '기본값',
  },
};

export const ShowError: Story = {
  args: {
    errorMessage: '올바르지 않은 입력입니다.',
    value: '잘못된 값',
  },
};

export const FiveCharacters: Story = {
  args: {
    value: '12345',
  },
};

export const OverMaxLength: Story = {
  args: {
    value: '12345678901',
  },
};
