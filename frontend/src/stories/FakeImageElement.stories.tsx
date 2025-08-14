import type { Meta, StoryObj } from '@storybook/react-webpack5';
import FakeImageElement from '../components/@common/imageLayout/imageElement/fakeImageElement/FakeImageElement';

const meta: Meta<typeof FakeImageElement> = {
  title: 'Components/ImageLayout/FakeImageElement',
  component: FakeImageElement,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: '#000', ratio: 1, width: '100%' },
};
