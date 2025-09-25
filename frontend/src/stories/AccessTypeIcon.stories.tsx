import type { Meta, StoryObj } from '@storybook/react-webpack5';
import AccessTypeIcon from '../components/@common/accessTypeIcon/AccessTypeIcon';

const meta: Meta<typeof AccessTypeIcon> = {
  title: 'Components/AccessTypeIcon',
  component: AccessTypeIcon,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Public: Story = {
  args: {
    accessType: 'PUBLIC',
    color: 'black',
  },
};
export const Private: Story = {
  args: {
    accessType: 'PRIVATE',
    color: 'black',
  },
};
