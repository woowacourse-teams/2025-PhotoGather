import type { Meta, StoryObj } from '@storybook/react';
// import { ReactComponent as DownloadIcon } from './assets/download.svg';
import FloatingButton from '../components/floatingActionButton/FloatingActionButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    label: 'Floating Button',
    onClick: () => {},
  },
};

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    onClick: () => {},
    icon: <img src="/icons/download.svg" alt="download icon" />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
