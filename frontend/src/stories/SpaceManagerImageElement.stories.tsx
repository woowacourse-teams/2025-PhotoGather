import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SpaceManagerImageElement from '../components/@common/imageLayout/imageElement/spaceManagerImageElement/SpaceManagerImageElement';

const meta: Meta<typeof SpaceManagerImageElement> = {
  title: 'Components/SpaceManagerImageElement',
  component: SpaceManagerImageElement,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://velog.velcdn.com/images/minsungje/post/e84b8e68-0f4b-4d5c-a9ab-f2c9a6a48c3e/image.jpg',
    alt: '스페이스 이미지',
    ratio: 1,
    width: '100%',
    isSelected: false,
  },
};
