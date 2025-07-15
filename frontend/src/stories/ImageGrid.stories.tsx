import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ImageGrid from '../components/@common/imageGrid/ImageGrid';

const meta: Meta<typeof ImageGrid> = {
  title: 'Component/ImageGrid',
  component: ImageGrid,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
