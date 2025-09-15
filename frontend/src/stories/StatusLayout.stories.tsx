import type { Meta, StoryObj } from '@storybook/react';
import { LockImg as lockImage } from '../@assets/images';
import StatusLayout from '../components/layout/statusLayout/StatusLayout';

const meta: Meta<typeof StatusLayout> = {
  title: 'Components/StatusLayout',
  component: StatusLayout,
};
export default meta;

type Story = StoryObj<typeof StatusLayout>;

export const Default: Story = {
  args: {
    image: {
      src: lockImage,
      alt: '자물쇠 이미지',
    },
    element: (
      <>
        <p style={{ color: 'white' }}>스페이스 기간이</p>
        <p style={{ color: 'white' }}>만료되었어요</p>
      </>
    ),
  },
};
