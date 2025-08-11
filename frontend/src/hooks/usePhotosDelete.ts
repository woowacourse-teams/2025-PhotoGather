import React, { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import ConfirmModal from '../components/modal/ConfirmModal';
import { ERROR } from '../constants/messages';
import { useOverlay } from '../contexts/OverlayProvider';
import type { Photo } from '../types/photo.type';
import { useToast } from './@common/useToast';

interface UsePhotosDeleteProps {
  spaceCode: string;
  toggleSelectMode: () => void;
  updatePhotos: (photos: Photo[]) => void;
  fetchPhotosList: () => Promise<void>;
  extractUnselectedPhotos: () => Photo[];
}

const usePhotosDelete = ({
  spaceCode,
  toggleSelectMode,
  updatePhotos,
  fetchPhotosList,
  extractUnselectedPhotos,
}: UsePhotosDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();
  const overlay = useOverlay();

  const fetchDeletePhotos = async (photoIds: number[]) => {
    try {
      setIsDeleting(true);
      await photoService.deletePhotos(spaceCode, {
        photoIds: photoIds,
      });
    } catch (error) {
      showToast({
        text: '다시 시도해 주세요.',
        type: 'error',
      });
      console.error(error);
    } finally {
      toggleSelectMode();
      setIsDeleting(false);
    }
  };

  const submitDeletePhotos = async (photoIds: number[]) => {
    if (photoIds.length === 0) {
      showToast({
        text: ERROR.DELETE.NO_SELECTED_PHOTO,
        type: 'error',
      });
      return;
    }

    try {
      const result = await overlay(
        React.createElement(ConfirmModal, {
          description: `${photoIds.length}개의 사진을 삭제하시겠습니까?`,
          confirmText: '삭제',
          cancelText: '취소',
        }),
        {
          clickOverlayClose: true,
        },
      );

      if (result) {
        await fetchDeletePhotos(photoIds);
        showToast({
          text: `${photoIds.length}개의 사진을 삭제했습니다.`,
          type: 'info',
        });
        updatePhotos(extractUnselectedPhotos());
        await fetchPhotosList();
      }
    } catch (error) {
      console.error('모달 오류:', error);
    }
  };

  return { submitDeletePhotos, isDeleting };
};

export default usePhotosDelete;
