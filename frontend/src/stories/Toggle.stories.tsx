import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Toggle from '../components/@common/toggle/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
