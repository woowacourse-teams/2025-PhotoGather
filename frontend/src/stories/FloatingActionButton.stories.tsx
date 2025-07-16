import type { Meta, StoryObj } from '@storybook/react';
import DownloadIcon from '../@assets/icons/download.svg';
import FloatingActionButton from '../components/@common/buttons/floatingActionButton/FloatingActionButton';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Components/FloatingActionButton',
  component: FloatingActionButton,
};
export default meta;

type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {
  args: {
    label: 'Floating Action Button',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: <img src={DownloadIcon} alt="" />,
  },
};
