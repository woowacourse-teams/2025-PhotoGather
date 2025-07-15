import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ImageElement from '../components/@common/imageGrid/imageElement/ImageElement';

const meta: Meta<typeof ImageElement> = {
  title: 'Component/ImageElement',
  component: ImageElement,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
