import type { Meta, StoryObj } from '@storybook/react';
import InformationConfirmBox from '../components/informationConfirmBox/InformationConfirmBox';

const meta: Meta<typeof InformationConfirmBox> = {
  title: 'components/InformationConfirmBox',
  component: InformationConfirmBox,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InformationConfirmBox>;

export const Default: Story = {
  args: {
    title: '나의 첫 스페이스',
    openedAt: '2025-07-29T09:06:02.801Z',
  },
};
