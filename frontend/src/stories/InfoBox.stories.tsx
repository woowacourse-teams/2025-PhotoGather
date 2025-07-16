import type { Meta, StoryObj } from '@storybook/react';
import InfoBox from '../components/infoBox/InfoBox';
import { INFO } from '../constants/messages';

const meta: Meta<typeof InfoBox> = {
  component: InfoBox,
  title: 'components/InfoBox',
};

export default meta;

type Story = StoryObj<typeof InfoBox>;

export const Default: Story = {
  args: {
    description: INFO.LINK_WARNING.description,
    highlightText: INFO.LINK_WARNING.highlightText,
  },
};

export const WithNewlines: Story = {
  args: {
    description: `${INFO.LINK_WARNING.description}\n하이라이트`,
    highlightText: '하이라이트',
  },
};

export const NoHighlight: Story = {
  args: {
    description: INFO.LINK_WARNING.description,
    highlightText: '',
  },
};

export const HighlightNotFound: Story = {
  args: {
    description: INFO.LINK_WARNING.description,
    highlightText: '존재하지않음',
  },
};
