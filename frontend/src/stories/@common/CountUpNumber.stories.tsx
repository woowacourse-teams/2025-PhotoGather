import type { Meta, StoryObj } from '@storybook/react';
import CountUpNumber from '../../components/@common/countUpNumber/CountUpNumber';

const meta: Meta<typeof CountUpNumber> = {
  title: 'Components/CountUpNumber',
  component: CountUpNumber,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
