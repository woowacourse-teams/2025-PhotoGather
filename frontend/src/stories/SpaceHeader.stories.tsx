import { ReactComponent as SaveIcon } from '@assets/icons/download.svg';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SpaceHeader from '../components/header/spaceHeader/SpaceHeader';

const meta: Meta<typeof SpaceHeader> = {
  title: 'Components/SpaceHeader',
  component: SpaceHeader,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '제목임',
    timer: {
      days: 0,
      hours: 1,
      minutes: 45,
      seconds: 30,
    },
    icon: <SaveIcon />,
  },
};

export const Urgent: Story = {
  args: {
    title: '제목임',
    timer: {
      days: 0,
      hours: 0,
      minutes: 45,
      seconds: 30,
    },
    icon: <SaveIcon />,
  },
};
