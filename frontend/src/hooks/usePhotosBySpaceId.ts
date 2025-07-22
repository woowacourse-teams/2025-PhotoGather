import { useRef, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import type { Photo } from '../types/photo.type';
import { buildThumbnailUrl } from '../utils/buildImageUrl';
import { parsedImagePath } from '../utils/parsedThumbnailPath';

interface UsePhotosBySpaceIdProps {
  reObserve: () => void;
}

const usePhotosBySpaceId = ({ reObserve }: UsePhotosBySpaceIdProps) => {
  const PAGE_SIZE = 21;
  const MOCK_SPACE_ID = 1234567890;
  const PRESET = 'x800';

  const [isLoading, setIsLoading] = useState(false);
  const [photosList, setPhotosList] = useState<Photo[] | null>(null);
  const currentPage = useRef(1);
  const totalPages = useRef(1);

  const thumbnailList = photosList?.map((photo) => {
    return buildThumbnailUrl(
      MOCK_SPACE_ID,
      parsedImagePath(photo.path),
      PRESET,
    );
  });

  const isEndPage = currentPage.current > totalPages.current;

  const updatePhotosList = (photos: Photo[], updatedTotalPages: number) => {
    setPhotosList((prev) => {
      if (!prev) {
        currentPage.current = 1;
        totalPages.current = updatedTotalPages;
        return photos;
      }
      currentPage.current += 1;
      return [...prev, ...photos];
    });
  };

  const fetchPhotosList = () => {
    setIsLoading(true);

    photoService
      .getBySpaceId(MOCK_SPACE_ID, {
        page: currentPage.current,
        size: PAGE_SIZE,
      })
      .then((res) => {
        const data = res.data;
        if (!data) {
          console.warn(DEBUG_MESSAGES.NO_RESPONSE);
          return;
        }
        const { photos } = data;
        updatePhotosList(photos, data.totalPages);
        setIsLoading(false);
        requestAnimationFrame(() => {
          reObserve();
        });
      });
  };

  return {
    isEndPage,
    fetchPhotosList,
    thumbnailList,
    isLoading,
  };
};

export default usePhotosBySpaceId;
