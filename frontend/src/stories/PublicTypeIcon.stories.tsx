import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PublicTypeIcon from '../components/publicTypeIcon/PublicTypeIcon';

const meta: Meta<typeof PublicTypeIcon> = {
  title: 'Components/PublicTypeIcon',
  component: PublicTypeIcon,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Public: Story = {
  args: {
    publicType: 'PUBLIC',
    color: 'black',
  },
};
export const Private: Story = {
  args: {
    publicType: 'PRIVATE',
    color: 'black',
  },
};
