import type { Meta, StoryObj } from '@storybook/react';
import LeftTimeInformationBox from '../components/leftTimeInformationBox/LeftTimeInformationBox';

const meta: Meta<typeof LeftTimeInformationBox> = {
  title: 'components/LeftTimeInformationBox',
  component: LeftTimeInformationBox,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LeftTimeInformationBox>;

export const Default: Story = {
  args: {
    title: '나의 첫 스페이스',
    leftTime: '23:59:59',
    openDate: '2025-07-29T09:06:02.801Z',
  },
};

export const OneDayLeft: Story = {
  args: {
    title: '내일 열리는 스페이스',
    leftTime: '1일',
    openDate: '2025-07-29T09:06:02.801Z',
  },
};
