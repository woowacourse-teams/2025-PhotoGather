import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SpaceHeader from '../components/spaceHeader/SpaceHeader';

const meta: Meta<typeof SpaceHeader> = {
  title: 'Components/SpaceHeader',
  component: SpaceHeader,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
