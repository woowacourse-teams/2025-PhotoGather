import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FolderIcon } from '../@assets/icons';
import BorderButton from '../components/@common/buttons/borderButton/BorderButton';

const meta: Meta<typeof BorderButton> = {
  title: 'Components/Button/Border',
  component: BorderButton,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    heading: { text: '테두리 버튼', icon: <FolderIcon /> },
    description: '테두리 버튼 설명입니다.',
    onClick: () => alert('테두리 버튼 클릭됨'),
    disabled: false,
    variant: 'selected',
  },
};

export const Unselected: Story = {
  args: {
    heading: { text: '테두리 버튼', icon: <FolderIcon /> },
    description: '테두리 버튼 설명입니다.',
    onClick: () => alert('테두리 버튼 클릭됨'),
    disabled: false,
    variant: 'unselected',
  },
};
