import { useMemo, useRef, useState } from 'react';
import { photoService } from '../../../apis/services/photo.service';
import type { Photo } from '../../../types/photo.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { extractImageFileName } from '../../../utils/parsedImagePath';
import useTaskHandler from '../../@common/useTaskHandler';

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

  const [photosList, setPhotosList] = useState<Photo[]>([]);
  const currentPage = useRef(1);
  const totalPages = useRef(1);
  const { tryFetch, loadingState } = useTaskHandler();

  const thumbnailPhotoMap = useMemo(() => {
    // TODO : thumbnail 이미지 참조 실패시 원본 이미지 참조하도록 설정
    if (!photosList) return new Map();
    return new Map(
      photosList.map((photo) => [
        photo.id,
        buildThumbnailUrl(spaceCode, extractImageFileName(photo.path), PRESET),
      ]),
    );
  }, [photosList, spaceCode]);

  const isEndPage = currentPage.current > totalPages.current;

  const appendPhotosList = (photos: Photo[], updatedTotalPages: number) => {
    setPhotosList((prev) => {
      if (prev.length === 0) {
        totalPages.current = updatedTotalPages;
        return photos;
      }
      return [...prev, ...photos];
    });
  };

  const updatePhotos = (updatePhotos: Photo[]) => {
    setPhotosList((prev) => {
      if (!prev) return [];
      return updatePhotos;
    });
  };

  const fetchPhotosList = async () => {
    const pageToFetch = currentPage.current;
    const response = await photoService.getBySpaceCode(spaceCode, {
      page: pageToFetch,
      size: PAGE_SIZE,
    });

    if (!response || !response.data) return;
    currentPage.current += 1;

    const { photos, totalPages } = response.data;
    appendPhotosList(photos, totalPages);

    if (currentPage.current < totalPages) {
      requestAnimationFrame(() => {
        reObserve();
      });
    }
  };

  const tryFetchPhotosList = async () => {
    await tryFetch({
      task: fetchPhotosList,
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '사진 목록을 불러오는데 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      loadingStateKey: 'photosList',
    });
  };

  return {
    isEndPage,
    tryFetchPhotosList,
    thumbnailPhotoMap,
    photosList,
    photosListLoadingState: loadingState.photosList,
    updatePhotos,
  };
};

export default usePhotosBySpaceCode;
