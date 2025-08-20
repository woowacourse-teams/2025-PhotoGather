import type { Meta, StoryObj } from '@storybook/react-webpack5';
import StepProgressBar from '../components/progressBar/step/StepProgressBar';

const meta: Meta<typeof StepProgressBar> = {
  title: 'Components/ProgressBar/StepProgressBar',
  component: StepProgressBar,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 1,
    maxStep: 4,
  },
};
