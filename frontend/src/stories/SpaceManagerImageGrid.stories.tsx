import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SpaceManagerImageGrid from '../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';

const meta: Meta<typeof SpaceManagerImageGrid> = {
  title: 'Components/ImageLayout/SpaceManagerImageGrid',
  component: SpaceManagerImageGrid,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rowImageAmount: 3,
    photoData: [
      {
        id: 1,
        path: 'https://avatars.githubusercontent.com/MinSungJe',
        originalName: '스페이스 이미지',
        guest: {
          id: 1,
          name: '스토리북 사용자',
        },
        capturedAt: '2025-07-31',
        createdAt: '2025-07-31',
      },
      {
        id: 2,
        path: 'https://avatars.githubusercontent.com/ShinjungOh',
        originalName: '스페이스 이미지',
        guest: {
          id: 1,
          name: '스토리북 사용자2',
        },
        capturedAt: '2025-07-31',
        createdAt: '2025-07-31',
      },
    ],
    thumbnailUrlList: new Map([
      [
        1,
        'https://velog.velcdn.com/images/minsungje/post/e84b8e68-0f4b-4d5c-a9ab-f2c9a6a48c3e/image.jpg',
      ],
      [
        2,
        'https://velog.velcdn.com/images/minsungje/post/e84b8e68-0f4b-4d5c-a9ab-f2c9a6a48c3e/image.jpg',
      ],
    ]),
  },
};
