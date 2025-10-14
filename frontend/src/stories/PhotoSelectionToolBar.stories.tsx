import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PhotoSelectionToolBar from '../components/specific/photoSelectionToolBar/PhotoSelectionToolBar';

const meta: Meta<typeof PhotoSelectionToolBar> = {
  title: 'Components/PhotoSelectionToolBar',
  component: PhotoSelectionToolBar,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedCount: 10,
  },
};
