import type { Meta, StoryObj } from '@storybook/react';
import InfoBox from '../components/@common/infoBox/InfoBox';
import { INFORMATION } from '../constants/messages';

const meta: Meta<typeof InfoBox> = {
  component: InfoBox,
  title: 'components/InfoBox',
};

export default meta;

type Story = StoryObj<typeof InfoBox>;

export const Default: Story = {
  args: {
    description: INFORMATION.LINK_WARNING.DESCRIPTION,
    highlightTextArray: [INFORMATION.LINK_WARNING.HIGHLIGHT_TEXT],
  },
};

export const WithNewlines: Story = {
  args: {
    description: `${INFORMATION.LINK_WARNING.DESCRIPTION}\n하이라이트`,
    highlightTextArray: ['하이라이트'],
  },
};

export const NoHighlight: Story = {
  args: {
    description: INFORMATION.LINK_WARNING.DESCRIPTION,
    highlightTextArray: [],
  },
};

export const HighlightNotFound: Story = {
  args: {
    description: INFORMATION.LINK_WARNING.DESCRIPTION,
    highlightTextArray: ['존재하지않음'],
  },
};
