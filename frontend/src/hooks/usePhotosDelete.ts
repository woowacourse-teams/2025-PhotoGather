import React, { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import ConfirmModal from '../components/@common/modal/confirmModal/ConfirmModal';
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
  photosList?: Photo[] | null;
}

const usePhotosDelete = ({
  spaceCode,
  toggleSelectMode,
  updatePhotos,
  fetchPhotosList,
  extractUnselectedPhotos,
  photosList,
}: UsePhotosDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();
  const overlay = useOverlay();

  const showDeleteConfirmModal = async (message: string) => {
    try {
      return await overlay(
        React.createElement(ConfirmModal, {
          description: message,
          confirmText: '삭제',
          cancelText: '취소',
        }),
        {
          clickOverlayClose: true,
        },
      );
    } catch (error) {
      console.error('모달 오류:', error);
      return false;
    }
  };

  const handleDeleteError = (error: unknown) => {
    showToast({
      text: '다시 시도해 주세요.',
      type: 'error',
    });
    console.error(error);
  };

  const deleteSelectedPhotos = async (photoIds: number[]) => {
    if (photoIds.length === 0) {
      showToast({
        text: ERROR.DELETE.NO_SELECTED_PHOTO,
        type: 'error',
      });
      return false;
    }

    const result = await showDeleteConfirmModal(
      `${photoIds.length}개의 사진을 삭제하시겠습니까?`,
    );

    if (!result) return false;

    try {
      setIsDeleting(true);
      await photoService.deletePhotos(spaceCode, { photoIds });

      showToast({
        text: `${photoIds.length}개의 사진을 삭제했습니다.`,
        type: 'info',
      });

      updatePhotos(extractUnselectedPhotos());
      await fetchPhotosList();
      return true;
    } catch (error) {
      handleDeleteError(error);
      return false;
    } finally {
      toggleSelectMode();
      setIsDeleting(false);
    }
  };

  const deleteSinglePhoto = async (photoId: number) => {
    const result = await showDeleteConfirmModal('정말 삭제하시겠어요?');

    if (!result) return false;

    try {
      setIsDeleting(true);
      await photoService.deletePhoto(spaceCode, photoId);

      showToast({
        text: `사진을 삭제했습니다.`,
        type: 'info',
      });

      if (photosList) {
        const updatedPhotos = photosList.filter(
          (photo) => photo.id !== photoId,
        );
        updatePhotos(updatedPhotos);
      }

      return true;
    } catch (error) {
      handleDeleteError(error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteSelectedPhotos,
    deleteSinglePhoto,
    isDeleting,
  };
};

export default usePhotosDelete;
