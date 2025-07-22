import image1 from '../../../@assets/images/example_image.png';
import image2 from '../../../@assets/images/test.jpg';
import image3 from '../../../@assets/images/test2.jpg';
import image4 from '../../../@assets/images/test3.jpeg';

export const mockSpaceData = {
  name: '8월 버스킹',
  startDate: '2025-08-01',
  participantsCount: 80,
  photosCount: 6,
};

const images = [image1, image2, image3, image4];
export const mockImageList = Array.from(
  { length: 23 },
  (_, i) => images[i % 4],
);
