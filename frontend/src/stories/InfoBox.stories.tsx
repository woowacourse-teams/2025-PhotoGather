import type { Meta, StoryObj } from '@storybook/react';
import InfoBox from '../components/infoBox/InfoBox';

const meta: Meta<typeof InfoBox> = {
  component: InfoBox,
  title: 'components/InfoBox',
};

export default meta;

type Story = StoryObj<typeof InfoBox>;

export const Default: Story = {
  args: {
    description: '링크를 복사해 두세요. 이 화면을 지나면 볼 수 없습니다.',
    highlightText: '복사해 두세요',
  },
};

export const WithNewlines: Story = {
  args: {
    description:
      '첫 줄입니다.\n중요한 내용을 꼭 확인하세요.\n다음 단계로 넘어가세요.',
    highlightText: '중요한',
  },
};

export const NoHighlight: Story = {
  args: {
    description: '이 메시지는 강조할 단어가 없습니다.',
    highlightText: '',
  },
};

export const HighlightNotFound: Story = {
  args: {
    description: '여기엔 하이라이트 텍스트가 포함되어 있지 않습니다.',
    highlightText: '존재하지않음',
  },
};

export const RepeatedHighlight: Story = {
  args: {
    description: '중요한 메시지를 확인하고, 중요한 행동을 하세요.',
    highlightText: '중요한',
  },
};
