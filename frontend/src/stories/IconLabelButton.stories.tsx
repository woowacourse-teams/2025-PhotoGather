import { ReactComponent as LinkIcon } from '@assets/icons/link.svg';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import IconLabelButton from '../components/@common/buttons/iconLabelButton/IconLabelButton';

const meta: Meta<typeof IconLabelButton> = {
  title: 'Components/IconLabelButton',
  component: IconLabelButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: false,
    },
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <LinkIcon />,
    label: '링크 복사',
  },
};

export const NoLabel: Story = {
  args: {
    icon: <LinkIcon />,
  },
};
