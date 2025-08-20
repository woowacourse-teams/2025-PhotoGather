import type { Meta, StoryObj } from '@storybook/react-webpack5';
import DonutGraph from '../components/donutGraph/DonutGraph';

const meta: Meta<typeof DonutGraph> = {
  title: 'Components/DonutGraph',
  component: DonutGraph,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
