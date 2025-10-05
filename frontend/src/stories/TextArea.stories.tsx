import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Textarea from '../components/@common/inputs/textArea/Textarea';
import useGraphemeInput from '../hooks/@common/useGraphemeInput';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Input/Textarea',
  component: Textarea,
  args: {
    maxCount: 10,
    placeholder: '내용을 입력하세요',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const { validLength, validValue } = useGraphemeInput({
      initialValue: value,
      onChange: (e) => setValue(e.target.value),
    });
    return (
      <Textarea
        {...args}
        value={validValue}
        maxCount={100}
        validLength={value.length}
        onChange={(e) => setValue(e.target.value)}
        errorMessage={
          validLength > 100 ? '최대 10자까지 입력할 수 있습니다.' : ''
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
