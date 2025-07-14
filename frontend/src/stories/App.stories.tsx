import type { Meta, StoryObj } from '@storybook/react-webpack5';
import App from '../App';

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
