import type { Meta, StoryObj } from '@storybook/react-webpack5';
import FakeImageGrid from '../components/@common/imageLayout/imageGrid/fakeImageGrid/FakeImageGrid';

const meta: Meta<typeof FakeImageGrid> = {
  title: 'Components/ImageLayout/FakeImageGrid',
  component: FakeImageGrid,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rowImageAmount: 3,
    photoLength: 3,
  },
};
