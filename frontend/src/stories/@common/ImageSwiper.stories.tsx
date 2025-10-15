import type { Meta, StoryObj } from '@storybook/react';
import image1 from '../../@assets/workDetail_mock_1.png';
import image2 from '../../@assets/workDetail_mock_2.png';
import image3 from '../../@assets/workDetail_mock_3.png';
import ImageSwiper from '../../components/@common/imageSwiper/ImageSwiper';

const meta: Meta<typeof ImageSwiper> = {
  title: 'Components/Swiper/ImageSwiper',
  component: ImageSwiper,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialIndex: 0,
    imageInfo: [
      { id: 1, src: image1, alt: 'image1' },
      { id: 2, src: image2, alt: 'image2' },
      { id: 3, src: image3, alt: 'image3' },
      { id: 4, src: image1, alt: 'image4' },
      { id: 5, src: image2, alt: 'image5' },
      { id: 6, src: image3, alt: 'image6' },
      { id: 7, src: image1, alt: 'image7' },
      { id: 8, src: image2, alt: 'image8' },
    ],
    updateCurrentIndex: () => {},
  },
};

export const NoImage: Story = {
  args: {
    imageInfo: [],
    updateCurrentIndex: (index: number) => {
      console.log('Current index:', index);
    },
  },
};
