import type { Meta, StoryObj } from '@storybook/react-webpack5';
import KakaoLoginButton from '../components/kakaoLoginButton/KakaoLoginButton';

const meta: Meta<typeof KakaoLoginButton> = {
  title: 'Components/Button/KakaoLogin',
  component: KakaoLoginButton,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};

export const LeftIcon: Story = {
  args: {
    onClick: () => {},
    iconPosition: 'left',
  },
};
