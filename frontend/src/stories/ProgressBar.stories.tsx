import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ProgressBar from '../components/progressBar/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    step: 1,
    maxStep: 4,
  },
};
