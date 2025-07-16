import type { Meta, StoryObj } from '@storybook/react';
import CopyButton from '../components/@common/buttons/copyButton/CopyButton';

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
};
export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Filled: Story = {
  args: {
    label: 'Filled Copy Button',
    copyText: 'filled-copy-text',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Copy Button',
    copyText: 'outlined-copy-text',
    variant: 'outlined',
  },
};
