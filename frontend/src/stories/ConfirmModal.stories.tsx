import rocketImage from '@assets/images/rocket.png';
import type { Meta, StoryObj } from '@storybook/react';
import ConfirmModal from '../components/modal/ConfirmModal';

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
    confirmText: '확인',
    cancelText: '취소',
  },
};

export const UploadConfirm: Story = {
  args: {
    image: rocketImage,
    description: '100장의 사진을 업로드할까요?',
    confirmText: '업로드',
    cancelText: '취소',
  },
};

export const DownloadConfirm: Story = {
  args: {
    image: rocketImage,
    description: '선택한 사진을 다운로드할까요?',
    confirmText: '다운로드',
    cancelText: '취소',
  },
};

export const DeleteConfirm: Story = {
  args: {
    image: rocketImage,
    description: '정말로 삭제할까요?',
    confirmText: '삭제',
    cancelText: '취소',
  },
};
