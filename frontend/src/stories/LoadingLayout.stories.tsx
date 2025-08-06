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
    iconList: [
      { src: rocketImage, alt: '데모 페이지 아이콘' },
      { src: rocketImage, alt: '데모 페이지 아이콘' },
      { src: rocketImage, alt: '데모 페이지 아이콘' },
      { src: rocketImage, alt: '데모 페이지 아이콘' },
    ],
    descriptionList: ['로딩 텍스트 1', '로딩 텍스트 2', '로딩 텍스트 3', '로딩 텍스트 4'],
    percentage: 30,
  },
};
