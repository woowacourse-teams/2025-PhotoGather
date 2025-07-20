import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ImageGrid from '../components/@common/imageGrid/ImageGrid';

const meta: Meta<typeof ImageGrid> = {
  title: 'Components/ImageGrid',
  component: ImageGrid,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rowImageAmount: 3,
    imageUrlList: [
      'https://avatars.githubusercontent.com/MinSungJe',
      'https://avatars.githubusercontent.com/ShinjungOh',
      'https://avatars.githubusercontent.com/hanheel',
      'https://avatars.githubusercontent.com/H0ngJu',
      'https://velog.velcdn.com/images/minsungje/post/e84b8e68-0f4b-4d5c-a9ab-f2c9a6a48c3se/image.jpg',
    ],
  },
};
