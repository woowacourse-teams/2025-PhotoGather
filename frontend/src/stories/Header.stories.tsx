import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/layout/global/header/Header';
import { theme } from '../styles/theme';

const meta: Meta<typeof Header> = {
  title: 'Components/Layout/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.primary,
          }}
        >
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profileImageSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800',
  },
};
