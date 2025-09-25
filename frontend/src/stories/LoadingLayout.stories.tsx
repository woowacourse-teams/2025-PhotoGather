import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RocketImg as rocketImage } from '../@assets/images';
import LoadingLayout from '../components/layout/loadingLayout/LoadingLayout';

const meta: Meta<typeof LoadingLayout> = {
  title: 'Components/LoadingLayout',
  component: LoadingLayout,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loadingContents: [
      {
        icon: { src: rocketImage, alt: '데모 페이지 아이콘' },
        description: '추억 담는 중',
      },
      {
        icon: { src: rocketImage, alt: '데모 페이지 아이콘' },
        description: '선물 상자 포장하는 중',
      },
      {
        icon: { src: rocketImage, alt: '데모 페이지 아이콘' },
        description: '배달 가는 중',
      },
      {
        icon: { src: rocketImage, alt: '데모 페이지 아이콘' },
        description: '당신에게 전달 중',
      },
    ],
    totalAmount: 24,
    currentAmount: 17,
  },
};
