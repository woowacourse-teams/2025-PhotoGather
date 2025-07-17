import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ImageElement from '../components/@common/imageGrid/imageElement/ImageElement';

const meta: Meta<typeof ImageElement> = {
  title: 'Component/ImageElement',
  component: ImageElement,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 1,
    src: 'https://velog.velcdn.com/images/minsungje/post/e84b8e68-0f4b-4d5c-a9ab-f2c9a6a48c3e/image.jpg',
    onImageClick: () => {
      alert('클릭');
    },
  },
};
