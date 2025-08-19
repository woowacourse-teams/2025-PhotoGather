import type { Meta, StoryObj } from '@storybook/react';
import HighlightText from '../components/@common/highlightText/HighlightText';
import InputModal from '../components/@common/modal/inputModal/InputModal';
import { CONSTRAINTS } from '../constants/constraints';

const meta: Meta<typeof InputModal> = {
  title: 'Components/Modal/InputModal',
  component: InputModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    description: (
      <HighlightText
        text="닉네임을 입력해 주세요"
        highlightTextArray={['닉네임']}
        fontStyle="header03"
        highlightColorStyle="primary"
      />
    ),
    subDescription: '공백 없이 10자까지 입력할 수 있어요.',
    confirmText: '확인',
    cancelText: '취소',
    errorMessage: `${CONSTRAINTS.NAME_MAX_LENGTH}자 이하로 입력해주세요.`,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <InputModal {...args} initialValue={''} />
      </div>
    );
  },
};
