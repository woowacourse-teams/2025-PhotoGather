import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '../components/@common/buttons/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      description: '버튼의 스타일 variant',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    text: {
      description: '버튼에 표시될 텍스트',
      control: 'text',
    },
    onClick: {
      description: '버튼 클릭 시 실행될 함수',
      action: 'clicked',
    },
    disabled: {
      description: '버튼 비활성화 여부',
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    text: 'Primary Button',
    onClick: () => {},
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Secondary Button',
    onClick: () => {},
    disabled: false,
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary Button',
    onClick: () => {},
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    text: 'Disabled Button',
    onClick: () => {},
    disabled: true,
  },
};
