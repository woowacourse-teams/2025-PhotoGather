import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextInput from '../components/@common/inputs/textInput/TextInput';
import { CONSTRAINTS } from '../constants/constraints';
import useGraphemeInput from '../hooks/@common/useGraphemeInput';

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
    const { validLength, validValue } = useGraphemeInput({
      initialValue: value,
      onChange: (e) => setValue(e.target.value),
    });
    return (
      <TextInput
        {...args}
        value={validValue}
        maxCount={CONSTRAINTS.NAME_MAX_LENGTH}
        validLength={validLength}
        onChange={(e) => setValue(e.target.value)}
        errorMessage={
          validLength > CONSTRAINTS.NAME_MAX_LENGTH
            ? '최대 10자까지 입력할 수 있습니다.'
            : ''
        }
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
