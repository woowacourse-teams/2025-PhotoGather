import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CircularLabelButton from '../components/@common/buttons/circularLabelButton/CircularLabelButton';

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
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // icon: <Icon />,
    label: 'QR 코드',
  },
};
