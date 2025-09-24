import type { Meta, StoryObj } from '@storybook/react-webpack5';
import LinearProgressBar from '../components/@common/progressBar/linear/LinearProgressBar';

const meta: Meta<typeof LinearProgressBar> = {
  title: 'Components/ProgressBar/LinearProgressBar',
  component: LinearProgressBar,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 24,
  },
};
