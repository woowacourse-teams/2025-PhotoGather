import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextInput from '../components/@common/inputs/textInput/TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input/Text',
  component: TextInput,
  args: {
    maxCount: 10,
    placeholder: '내용을 입력하세요',
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
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
    errorMessage: '최대 10자까지 입력할 수 있습니다.',
  },
};
