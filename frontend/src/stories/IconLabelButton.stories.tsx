import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  LinkIcon,
  DownloadIcon as SaveIcon,
  TrashCanIcon,
} from '../@assets/icons';
import IconLabelButton from '../components/@common/buttons/iconLabelButton/IconLabelButton';
import { theme } from '../styles/theme';

const meta: Meta<typeof IconLabelButton> = {
  title: 'Components/IconLabelButton',
  component: IconLabelButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: false,
    },
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <LinkIcon />,
    label: '링크 복사',
  },
};

export const NoLabel: Story = {
  args: {
    icon: <LinkIcon />,
  },
};

export const Dark: Story = {
  args: {
    icon: <LinkIcon />,
    variant: 'dark',
  },
};

export const Light: Story = {
  args: {
    icon: <SaveIcon fill={theme.colors.white} />,
    variant: 'light',
  },
};

export const Danger: Story = {
  args: {
    icon: <TrashCanIcon fill={theme.colors.error} width={16} />,
    variant: 'danger',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: theme.colors.gray02,
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
