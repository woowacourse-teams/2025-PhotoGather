import type { Meta, StoryObj } from '@storybook/react';
import DashboardBox from '../components/dashboardBox/DashboardBox';

const meta: Meta<typeof DashboardBox> = {
  component: DashboardBox,
  title: 'components/DashboardBox',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px',
          background: `linear-gradient(120deg, #0f0c29 0%, rgb(84, 26, 176) 45%, #24243e 80%)`,
          minHeight: '100px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DashboardBox>;

export const Default: Story = {
  args: {
    title: '참여한 게스트',
    description: '8명',
    isClosed: false,
  },
};

export const WithLargeNumber: Story = {
  args: {
    title: '업로드된 사진',
    description: '1,234장',
    isClosed: false,
  },
};

export const Closed: Story = {
  args: {
    title: 'Coming Soon',
    description: '',
    isClosed: true,
  },
};

export const ClosedWithDescription: Story = {
  args: {
    title: '종료된 이벤트',
    description: '2024.12.25',
    isClosed: true,
  },
};

export const MultipleBoxes: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <DashboardBox
          title="참여한 게스트"
          description="8명"
          isClosed={false}
        />
        <DashboardBox
          title="업로드된 사진"
          description="45장"
          isClosed={false}
        />
      </div>
      <DashboardBox title="Coming Soon" isClosed={true} />
    </div>
  ),
};
