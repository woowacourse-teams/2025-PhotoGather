import type { Meta, StoryObj } from '@storybook/react';
import DateTimeInput from '../components/@common/inputs/DateTimeInput';

const meta: Meta<typeof DateTimeInput> = {
  title: 'Components/Input/Date',
  component: DateTimeInput,
};

export default meta;
type Story = StoryObj<typeof DateTimeInput>;

export const Default: Story = {
  args: {
    inputType: 'date',
  },
};

export const ShowError: Story = {
  args: {
    inputType: 'date',
    errorMessage: '올바르지 않은 입력입니다.',
  },
};
