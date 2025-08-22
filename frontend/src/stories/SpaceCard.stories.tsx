import type { Meta, StoryObj } from '@storybook/react';
import SpaceCard from '../components/spaceCard/SpaceCard';

const meta: Meta<typeof SpaceCard> = {
  title: 'Components/SpaceCard',
  component: SpaceCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const getFutureDate = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

const getPastDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const Default: Story = {
  args: {
    name: '강릉 여행',
    openedAt: new Date().toISOString(),
    guestCount: 12,
    photoCount: 67,
    variant: 'default',
  },
};

export const Expired: Story = {
  args: {
    name: '부산 출장',
    openedAt: getPastDate(3),
    expiredAt: getPastDate(1),
    guestCount: 15,
    photoCount: 89,
    variant: 'expired',
  },
};

export const Early: Story = {
  args: {
    name: '속초 여행',
    openedAt: getFutureDate(2),
    guestCount: 10,
    photoCount: 0,
    variant: 'early',
  },
};

export const EarlyWithLongWait: Story = {
  args: {
    name: '유럽 배낭여행',
    openedAt: getFutureDate(48),
    guestCount: 6,
    photoCount: 0,
    variant: 'early',
  },
};

export const EmptySpace: Story = {
  args: {
    name: '새로운 스페이스',
    openedAt: new Date().toISOString(),
    variant: 'default',
  },
};
