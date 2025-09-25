import type { Meta, StoryObj } from '@storybook/react';
import SpaceCard from '../components/specific/spaceCard/SpaceCard';
import type { MySpace } from '../types/space.type';

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
    space: {
      name: '강릉 여행',
      openedAt: new Date().toISOString(),
      guestCount: 12,
      photoCount: 67,
    } as MySpace,
    variant: 'default',
  },
};

export const Expired: Story = {
  args: {
    space: {
      name: '부산 출장',
      openedAt: getPastDate(3),
      expiredAt: getPastDate(1),
      guestCount: 15,
      photoCount: 89,
    } as MySpace,
    variant: 'expired',
  },
};

export const Early: Story = {
  args: {
    space: {
      name: '속초 여행',
      openedAt: getFutureDate(2),
      guestCount: 10,
      photoCount: 0,
    } as MySpace,
    variant: 'early',
  },
};

export const EarlyWithLongWait: Story = {
  args: {
    space: {
      name: '유럽 배낭여행',
      openedAt: getFutureDate(48),
      guestCount: 6,
      photoCount: 0,
    } as MySpace,
    variant: 'early',
  },
};

export const EmptySpace: Story = {
  args: {
    space: {
      name: '새로운 스페이스',
      openedAt: new Date().toISOString(),
    } as MySpace,
    variant: 'default',
  },
};
