import type { Meta, StoryObj } from '@storybook/react-webpack5';
import GuestImageGrid from '../components/@common/imageLayout/imageGrid/guestImageGrid/GuestImageGrid';

const meta: Meta<typeof GuestImageGrid> = {
  title: 'Components/ImageLayout/GuestImageGrid',
  component: GuestImageGrid,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rowImageAmount: 3,
    photoData: [
      {
        id: 1,
        path: 'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800',
      },
      {
        id: 2,
        path: 'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800',
      },
      {
        id: 3,
        path: 'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800',
      },
    ],
  },
};
