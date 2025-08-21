import { ReactComponent as WarningIcon } from '@assets/icons/warning.svg';
import rocketImage from '@assets/images/rocket.png';
import type { Meta, StoryObj } from '@storybook/react';
import ConfirmModal from '../components/@common/modal/confirmModal/ConfirmModal';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/Modal/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
  },
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
        <ConfirmModal {...args} />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '계속 진행하시겠습니까?',
    description: '이 작업은 되돌릴 수 없습니다.',
    confirmText: '확인',
    cancelText: '취소',
    mode: 'default',
  },
};

export const WithoutDescription: Story = {
  args: {
    title: '계속 진행하시겠습니까?',
    confirmText: '확인',
    cancelText: '취소',
    mode: 'default',
  },
};

export const WithImage: Story = {
  args: {
    image: {
      src: rocketImage,
      alt: 'rocket',
    },
    title: '업로드 확인',
    description: '100장의 사진을 업로드할까요?',
    confirmText: '업로드',
    cancelText: '취소',
    mode: 'default',
  },
};

export const ErrorMode: Story = {
  args: {
    title: '정말 삭제하시겠어요?',
    description: '삭제 후에는 복구할 수 없어요',
    confirmText: '삭제',
    cancelText: '취소',
    mode: 'error',
  },
};

export const ErrorWithIcon: Story = {
  args: {
    icon: <WarningIcon />,
    title: '정말 삭제하시겠어요?',
    description: '삭제 후에는 복구할 수 없어요',
    confirmText: '삭제',
    cancelText: '취소',
    mode: 'error',
  },
};
