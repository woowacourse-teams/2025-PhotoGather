import { useRef, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import type { Photo } from '../types/photo.type';
import { buildThumbnailUrl } from '../utils/buildImageUrl';
import { parsedImagePath } from '../utils/parsedImagePath';

interface UsePhotosBySpaceIdProps {
  reObserve: () => void;
  spaceCode: number;
}

const usePhotosBySpaceId = ({
  reObserve,
  spaceCode,
}: UsePhotosBySpaceIdProps) => {
  const PAGE_SIZE = 21;
  const PRESET = 'x800';

  const [isLoading, setIsLoading] = useState(false);
  const [photosList, setPhotosList] = useState<Photo[] | null>(null);
  const currentPage = useRef(1);
  const totalPages = useRef(1);

  const thumbnailList = photosList?.map((photo) => {
    return buildThumbnailUrl(spaceCode, parsedImagePath(photo.path), PRESET);
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
      .getBySpaceId(spaceCode, {
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
        requestAnimationFrame(() => {
          reObserve();
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
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
