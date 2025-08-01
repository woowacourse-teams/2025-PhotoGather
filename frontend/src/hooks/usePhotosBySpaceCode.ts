import { useRef, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { NETWORK } from '../constants/errors';
import type { Photo } from '../types/photo.type';
import { buildThumbnailUrl } from '../utils/buildImageUrl';
import { parsedImagePath } from '../utils/parsedImagePath';
import useApiCall from './@common/useApiCall';

interface UsePhotosBySpaceIdProps {
  reObserve: () => void;
  spaceCode: string;
}

const usePhotosBySpaceCode = ({
  reObserve,
  spaceCode,
}: UsePhotosBySpaceIdProps) => {
  const PAGE_SIZE = 21;
  const PRESET = 'x800';

  const [isLoading, setIsLoading] = useState(false);
  const [photosList, setPhotosList] = useState<Photo[] | null>(null);
  const currentPage = useRef(1);
  const totalPages = useRef(1);
  const { execute } = useApiCall();

  const thumbnailList = photosList?.map((photo) => {
    return buildThumbnailUrl(spaceCode, parsedImagePath(photo.path), PRESET);
  });

  const isEndPage = currentPage.current > totalPages.current;

  const updatePhotosList = (photos: Photo[], updatedTotalPages: number) => {
    setPhotosList((prev) => {
      if (!prev) {
        totalPages.current = updatedTotalPages;
        return photos;
      }
      return [...prev, ...photos];
    });
  };

  const fetchPhotosList = async () => {
    setIsLoading(true);

    try {
      const pageToFetch = currentPage.current;
      const response = await execute(() =>
        photoService.getBySpaceCode(spaceCode, {
          page: pageToFetch,
          size: PAGE_SIZE,
        }),
      );

      if (response.success && response.data) {
        const data = response.data;
        currentPage.current += 1;
        const { photos } = data;
        updatePhotosList(photos, data.totalPages);
        requestAnimationFrame(() => {
          reObserve();
        });
      } else {
        if (!response.error?.toLowerCase().includes(NETWORK.DEFAULT)) {
          alert('사진 목록을 불러오는데 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('사진 목록 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isEndPage,
    fetchPhotosList,
    thumbnailList,
    isLoading,
  };
};

export default usePhotosBySpaceCode;
