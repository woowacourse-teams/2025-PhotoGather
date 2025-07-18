import type { Meta, StoryObj } from '@storybook/react';
import UploadBox from '../components/uploadBox/UploadBox';

const meta: Meta<typeof UploadBox> = {
  title: 'Components/UploadBox',
  component: UploadBox,
};
export default meta;

type Story = StoryObj<typeof UploadBox>;

export const Filled: Story = {
  args: {
    text: '이어 올리기',
  },
};
