import type { Meta, StoryObj } from '@storybook/react-webpack5';
import GuestImageElement from '../components/@common/imageGrid/imageElement/guestImageElement/GuestImageElement';

const meta: Meta<typeof GuestImageElement> = {
  title: 'Components/GuestImageElement',
  component: GuestImageElement,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800',
    alt: '스페이스 이미지',
    onImageClick: () => {
      console.log('클릭');
    },
    onDeleteClick: () => {
      console.log('삭제');
    },
  },
};
