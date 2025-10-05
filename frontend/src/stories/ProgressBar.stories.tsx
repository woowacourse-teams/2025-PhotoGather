import type { Meta, StoryObj } from '@storybook/react';
import StepProgressBar from '../components/@common/progressBar/step/StepProgressBar';

const meta: Meta<typeof StepProgressBar> = {
  title: 'Components/ProgressBar/Step',
  component: StepProgressBar,
};
export default meta;

type Story = StoryObj<typeof StepProgressBar>;

export const Default: Story = {
  args: {
    currentStep: 1,
    maxStep: 3,
  },
};
