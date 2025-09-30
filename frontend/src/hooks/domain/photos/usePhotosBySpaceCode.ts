import { useMemo, useRef, useState } from 'react';
import type { ApiResponse, PhotoListResponse } from '../../../types/api.type';
import type { Photo } from '../../../types/photo.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { extractImageFileName } from '../../../utils/parsedImagePath';
import useTaskHandler from '../../@common/useTaskHandler';

interface UsePhotosBySpaceIdProps {
  fetchFunc: (
    spaceCode: string,
    params: { page: number; size: number },
  ) => Promise<ApiResponse<PhotoListResponse>>;
  reObserve: () => void;
  spaceCode: string;
}

const usePhotosBySpaceCode = ({
  fetchFunc,
  reObserve,
  spaceCode,
}: UsePhotosBySpaceIdProps) => {
  const PAGE_SIZE = 20;
  const PRESET = 'x800';

  const [photosList, setPhotosList] = useState<Photo[]>([]);
  const currentPage = useRef(1);
  const totalPages = useRef(1);
  const { tryFetch, loadingState } = useTaskHandler();

  const infiniteScrollAnnouncerRef = useRef<HTMLDivElement>(null);

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
    if (!infiniteScrollAnnouncerRef.current) return;

    const pageToFetch = currentPage.current;
    const response = await fetchFunc(spaceCode, {
      page: pageToFetch,
      size: PAGE_SIZE,
    });
    console.log('Fetch');

    if (!response || !response.data) return;

    const { photos, totalPages: updatedTotalPages } = response.data;
    appendPhotosList(photos, updatedTotalPages);
    if (currentPage.current > 1) {
      announcedPhotoLoad(photos.length);
    }

    currentPage.current += 1;

    if (currentPage.current < updatedTotalPages) {
      requestAnimationFrame(() => {
        reObserve();
      });
    }
  };

  const announcedPhotoLoad = (newCount: number) => {
    if (!infiniteScrollAnnouncerRef.current) return;

    infiniteScrollAnnouncerRef.current.textContent = `${newCount}장의 사진이 추가되었습니다.`;
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
    infiniteScrollAnnouncerRef,
  };
};

export default usePhotosBySpaceCode;
