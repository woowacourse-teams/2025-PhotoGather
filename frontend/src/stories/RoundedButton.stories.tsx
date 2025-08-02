import type { Meta, StoryObj } from '@storybook/react-webpack5';
import RoundedButton from '../components/@common/buttons/roundedButton/RoundedButton';

const meta: Meta<typeof RoundedButton> = {
  title: 'Components/RoundedButton',
  component: RoundedButton,
  args: {
    text: '버튼',
  },
};

export default meta;
type Story = StoryObj<typeof RoundedButton>;

export const Default: Story = {};
