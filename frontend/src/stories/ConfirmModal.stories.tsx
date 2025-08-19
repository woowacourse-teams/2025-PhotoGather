import rocketImage from '@assets/images/rocket.png';
import type { Meta, StoryObj } from '@storybook/react';
import ConfirmModal from '../components/@common/modal/confirmModal/ConfirmModal';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/Modal/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: '계속 진행할까요?',
    confirmButtonProps: {
      text: '확인',
      onClick: () => {},
    },
    cancelButtonProps: {
      text: '취소',
      onClick: () => {},
    },
  },
};

export const UploadConfirm: Story = {
  args: {
    image: {
      src: rocketImage,
      alt: 'rocket',
    },
    description: '100장의 사진을 업로드할까요?',
    confirmButtonProps: {
      text: '업로드',
      onClick: () => {},
    },
    cancelButtonProps: {
      text: '취소',
      onClick: () => {},
    },
  },
};

export const DownloadConfirm: Story = {
  args: {
    image: {
      src: rocketImage,
      alt: 'rocket',
    },
    description: '선택한 사진을 다운로드할까요?',
    confirmButtonProps: {
      text: '다운로드',
      onClick: () => {},
    },
    cancelButtonProps: {
      text: '취소',
      onClick: () => {},
    },
  },
};

export const DeleteConfirm: Story = {
  args: {
    image: {
      src: rocketImage,
      alt: 'rocket',
    },
    description: '정말로 삭제할까요?',
    confirmButtonProps: {
      text: '삭제',
      onClick: () => {},
    },
    cancelButtonProps: {
      text: '취소',
      onClick: () => {},
    },
  },
};
