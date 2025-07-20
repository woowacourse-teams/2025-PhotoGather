import type { Meta, StoryObj } from '@storybook/react-webpack5';
import FloatingIconButton from '../components/@common/buttons/floatingIconButton/FloatingIconButton';

const meta: Meta<typeof FloatingIconButton> = {
  title: 'Components/FloatingIconButton',
  component: FloatingIconButton,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
