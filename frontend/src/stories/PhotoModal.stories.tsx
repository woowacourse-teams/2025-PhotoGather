import type { Meta, StoryObj } from '@storybook/react';
import PhotoModal from '../components/modal/PhotoModal';

const meta: Meta<typeof PhotoModal> = {
  title: 'Components/Modal/PhotoModal',
  component: PhotoModal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Guest: Story = {
  args: {
    photoId: 123,
    uploaderName: '업로더 이름',
    mode: 'guest',
  },
};

export const Manager: Story = {
  args: {
    photoId: 123,
    uploaderName: '업로더 이름',
    mode: 'manager',
  },
};
