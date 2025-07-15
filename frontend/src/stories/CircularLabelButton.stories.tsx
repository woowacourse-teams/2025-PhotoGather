import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CircularLabelButton from '../components/@common/CircularLabelButton/CircularLabelButton';

const meta: Meta<typeof CircularLabelButton> = {
  title: 'Components/CircularLabelButton',
  component: CircularLabelButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: false,
    },
    text: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // icon: <Icon />,
    text: 'QR 코드',
  },
};
