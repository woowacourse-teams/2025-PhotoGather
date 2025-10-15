import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MdDeleteOutline, MdDownload } from 'react-icons/md';
import image1 from '../../@assets/workDetail_mock_1.png';
import image2 from '../../@assets/workDetail_mock_2.png';
import image3 from '../../@assets/workDetail_mock_3.png';
import ImageSwiperActions from '../../components/specific/imageSwiperActions/ImageSwiperActions';
import useSwiperActions from '../../hooks/domain/image/useSwiperActions';
import { theme } from '../../styles/theme';
import type { ImageInfoType } from '../../types/swiper.type';

const meta: Meta<typeof ImageSwiperActions> = {
  title: 'Components/ImageSwiperActions',
  component: ImageSwiperActions,
};
export default meta;
type Story = StoryObj<typeof ImageSwiperActions>;

const mockImageInfo: ImageInfoType[] = [
  { id: 1, src: image1, alt: 'image1' },
  { id: 2, src: image2, alt: 'image2' },
  { id: 3, src: image3, alt: 'image3' },
];

export const Default: Story = {
  render: () => {
    const INITIAL_INDEX = 0;
    const [imageInfo, setImageInfo] = useState(mockImageInfo);

    const { currentIndex, updateCurrentIndex } = useSwiperActions({
      initialIndex: INITIAL_INDEX,
    });
    const deleteImage = (index: number) => {
      setImageInfo((prev) => prev.filter((_, i) => i !== index));
    };

    const downloadImage = (index: number) => {
      console.log('downloadImage', index);
    };

    return (
      <ImageSwiperActions
        initialIndex={INITIAL_INDEX}
        updateCurrentIndex={updateCurrentIndex}
        actions={[
          {
            icon: <MdDeleteOutline fill={theme.colors.error} />,
            onClick: () => deleteImage(currentIndex),
          },
          {
            icon: <MdDownload />,
            onClick: () => downloadImage(currentIndex),
          },
        ]}
        imageInfo={imageInfo}
      />
    );
  },
};
