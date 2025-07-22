import { useEffect, useRef, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import type { Photo } from '../types/photo.type';
import { buildThumbnailUrl } from '../utils/buildImageUrl';
import { parsedImagePath } from '../utils/parsedThumbnailPath';

interface UsePhotosBySpaceIdProps {
  isFetchSectionVisible: boolean;
  reObserve: () => void;
}

const usePhotosBySpaceId = ({
  isFetchSectionVisible,
  reObserve,
}: UsePhotosBySpaceIdProps) => {
  const PAGE_SIZE = 21;
  const MOCK_SPACE_ID = 1234567890;
  const PRESET = 'x800';

  const [isLoading, setIsLoading] = useState(false);
  const [photosList, setPhotosList] = useState<Photo[]>([]);
  const currentPage = useRef(1);
  const totalPages = useRef(1);

  const thumbnailList = photosList.map((photo) => {
    return buildThumbnailUrl(
      MOCK_SPACE_ID,
      parsedImagePath(photo.path),
      PRESET,
    );
  });

  const isEndPage = currentPage.current > totalPages.current;

  //biome-ignore lint/correctness/useExhaustiveDependencies: isFetchSectionVisible 변경 시 호출
  useEffect(() => {
    if (!isFetchSectionVisible || isEndPage || isLoading) return;

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
        setPhotosList((prev) => {
          if (prev.length === 0) {
            console.log('초기 fetch');
            currentPage.current = 1;
            totalPages.current = data.totalPages;
            return photos;
          }
          console.log('재fetch');
          currentPage.current += 1;
          return [...prev, ...photos];
        });
        requestAnimationFrame(() => {
          reObserve();
        });
        setIsLoading(false);
      });
  }, [isFetchSectionVisible]);

  return {
    thumbnailList,
    isLoading,
  };
};

export default usePhotosBySpaceId;
