import type { Meta, StoryObj } from '@storybook/react-webpack5';
import BorderButton from '../components/@common/buttons/borderButton/BorderButton';

const meta: Meta<typeof BorderButton> = {
  title: 'Components/Button/BorderButton',
  component: BorderButton,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClick: () => {},
  },
};
