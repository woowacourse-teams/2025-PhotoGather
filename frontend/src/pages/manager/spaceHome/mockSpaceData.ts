import image1 from '../../../@assets/images/image 52.png';
import image2 from '../../../@assets/images/test.jpg';
import image3 from '../../../@assets/images/test2.jpg';
import image4 from '../../../@assets/images/test3.jpeg';
import { DEBUG_MESSAGES } from '../../../constants/debugMessages';
import type { PhotoListResponse } from '../../../types/api.type';
import type { Photo } from '../../../types/photo.type';

export const mockSpaceData = {
  name: '8월 버스킹',
  startDate: '2025-08-01',
  participantsCount: 80,
  photosCount: 6,
};

const images = [image1, image2, image3, image4];

export const mockImageList: Photo[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  path: images[i % 4],
  originalName: `IMG_${i + 1}.jpg`,
  capturedAt: null,
  createdAt: new Date().toISOString(),
}));

export const mockGetPhotos = async (
  spaceId: number,
  params?: { page?: number; pageSize?: number },
): Promise<PhotoListResponse | undefined> => {
  if (!params || !params.page || !params.pageSize) {
    console.warn(DEBUG_MESSAGES.NO_PARAMS);
    return;
  }

  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const slicedPhotos = mockImageList.slice(start, end);
  const totalPages = Math.ceil(mockImageList.length / params.pageSize);

  await new Promise((r) => setTimeout(r, 500));

  return {
    photos: slicedPhotos,
    currentPage: params.page,
    pageSize: params.pageSize,
    totalPages,
  };
};
