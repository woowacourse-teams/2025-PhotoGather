import type { Meta, StoryObj } from '@storybook/react';
import DateTimeInput from '../components/@common/dateTimeInput/DateTimeInput';

const meta: Meta<typeof DateTimeInput> = {
  title: 'Components/Input/Time',
  component: DateTimeInput,
};

export default meta;
type Story = StoryObj<typeof DateTimeInput>;

export const Default: Story = {
  args: {
    inputType: 'time',
  },
};

export const ShowError: Story = {
  args: {
    inputType: 'time',
    errorMessage: '올바르지 않은 입력입니다.',
  },
};
