import type { Meta, StoryObj } from '@storybook/react-webpack5';
import rocketImage from '../@assets/images/rocket.png';
import LoadingLayout from '../components/layout/LoadingLayout/LoadingLayout';

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
        description: '로딩 텍스트 1',
      },
      {
        icon: { src: rocketImage, alt: '데모 페이지 아이콘' },
        description: '로딩 텍스트 2',
      },
      {
        icon: { src: rocketImage, alt: '데모 페이지 아이콘' },
        description: '로딩 텍스트 2',
      },
      {
        icon: { src: rocketImage, alt: '데모 페이지 아이콘' },
        description: '로딩 텍스트 2',
      },
    ],
    percentage: 30,
  },
};
