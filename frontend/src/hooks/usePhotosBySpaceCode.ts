import { useMemo, useRef, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
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
  const PAGE_SIZE = 20;
  const PRESET = 'x800';

  const [isLoading, setIsLoading] = useState(false);
  const [photosList, setPhotosList] = useState<Photo[] | null>(null);
  const currentPage = useRef(1);
  const totalPages = useRef(1);
  const { safeApiCall } = useApiCall();

  const thumbnailPhotoMap = useMemo(() => {
    // TODO : thumbnail 이미지 참조 실패시 원본 이미지 참조하도록 설정
    if (!photosList) return new Map();
    return new Map(
      photosList.map((photo) => [
        photo.id,
        buildThumbnailUrl(spaceCode, parsedImagePath(photo.path), PRESET),
      ]),
    );
  }, [photosList, spaceCode]);

  const isEndPage = currentPage.current > totalPages.current;

  const appendPhotosList = (photos: Photo[], updatedTotalPages: number) => {
    setPhotosList((prev) => {
      if (!prev) {
        totalPages.current = updatedTotalPages;
        return photos;
      }
      return [...prev, ...photos];
    });
  };

  const updatePhotos = (updatePhotos: Photo[]) => {
    setPhotosList((prev) => {
      if (!prev) return null;
      return updatePhotos;
    });
  };

  const fetchPhotosList = async () => {
    setIsLoading(true);

    try {
      const pageToFetch = currentPage.current;
      const response = await safeApiCall(() =>
        photoService.getBySpaceCode(spaceCode, {
          page: pageToFetch,
          size: PAGE_SIZE,
        }),
      );

      if (response.success && response.data) {
        const data = response.data;
        currentPage.current += 1;
        if (!data) {
          console.warn(DEBUG_MESSAGES.NO_RESPONSE);
          return;
        }
        const { photos } = data;
        appendPhotosList(photos, data.totalPages);
        requestAnimationFrame(() => {
          reObserve();
        });
      } else {
        if (
          !response.error?.toLowerCase().includes(NETWORK.DEFAULT.toLowerCase())
        ) {
          console.error('사진 목록을 불러오는데 실패했습니다.');
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
    thumbnailPhotoMap,
    photosList,
    isLoading,
    updatePhotos,
  };
};

export default usePhotosBySpaceCode;
