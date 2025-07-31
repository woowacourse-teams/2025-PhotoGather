import { useMemo, useRef, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import type { Photo } from '../types/photo.type';
import { buildThumbnailUrl } from '../utils/buildImageUrl';
import { parsedImagePath } from '../utils/parsedImagePath';

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

  //biome-ignore lint/correctness/useExhaustiveDependencies: photosList 변경 시 호출
  const thumbnailPhotoMap = useMemo(() => {
    return new Map(
      photosList?.map((photo) => [
        photo.id,
        buildThumbnailUrl(spaceCode, parsedImagePath(photo.path), PRESET),
      ]),
    );
  }, [photosList]);

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

  const fetchPhotosList = () => {
    setIsLoading(true);
    const pageToFetch = currentPage.current;

    photoService
      .getBySpaceCode(spaceCode, {
        page: pageToFetch,
        size: PAGE_SIZE,
      })
      .then((res) => {
        console.log('fetch 발생');
        const data = res.data;
        currentPage.current += 1;
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
    thumbnailPhotoMap,
    photosList,
    isLoading,
  };
};

export default usePhotosBySpaceCode;
