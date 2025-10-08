import type { Meta, StoryObj } from '@storybook/react';
import PhotoUploadButton from '../../components/specific/photoUploadButton/PhotoUploadButton';

const meta: Meta<typeof PhotoUploadButton> = {
  title: 'Components/Input/Photo',
  component: PhotoUploadButton,
  args: {
    originalSrc: '',
  },
};

export default meta;
type Story = StoryObj<typeof PhotoUploadButton>;

export const Default: Story = {
  render: () => {
    return <PhotoUploadButton />;
  },
};
