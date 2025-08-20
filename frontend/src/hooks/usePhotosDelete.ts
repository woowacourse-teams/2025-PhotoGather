import React, { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import ConfirmModal from '../components/@common/modal/confirmModal/ConfirmModal';
import { useOverlay } from '../contexts/OverlayProvider';
import type { Photo } from '../types/photo.type';
import { checkSelectedPhotoExist } from '../validators/photo.validator';
import useError from './@common/useError';
import { useToast } from './@common/useToast';

interface UsePhotosDeleteProps {
  spaceCode: string;
  toggleSelectMode: () => void;
  updatePhotos: (photos: Photo[]) => void;
  tryFetchPhotosList: () => Promise<void>;
  extractUnselectedPhotos: () => Photo[];
  photosList: Photo[] | null;
}

const usePhotosDelete = ({
  spaceCode,
  toggleSelectMode,
  updatePhotos,
  tryFetchPhotosList,
  extractUnselectedPhotos,
  photosList,
}: UsePhotosDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const overlay = useOverlay();
  const { tryTask, tryFetch } = useError();
  const { showToast } = useToast();

  const showDeleteConfirmModal = async (message: string) => {
    const result = await overlay(
      React.createElement(ConfirmModal, {
        description: message,
        confirmText: '삭제',
        cancelText: '취소',
      }),
      {
        clickOverlayClose: true,
      },
    );

    return result;
  };

  const deleteSelectedPhotos = async (photoIds: number[]) => {
    setIsDeleting(true);
    await photoService.deletePhotos(spaceCode, { photoIds });
    showToast({
      text: `${photoIds.length}개의 사진을 삭제했습니다.`,
      type: 'info',
    });
    updatePhotos(extractUnselectedPhotos());
    await tryFetchPhotosList();
    toggleSelectMode();
  };

  const tryDeleteSelectedPhotos = async (photoIds: number[]) => {
    const taskResult = tryTask({
      task: () => checkSelectedPhotoExist(photoIds),
      errorActions: ['toast'],
    });
    if (!taskResult.success) return;

    const result = await showDeleteConfirmModal(
      `${photoIds.length}개의 사진을 삭제하시겠습니까?`,
    );
    if (!result) return;

    tryFetch({
      task: async () => {
        return await deleteSelectedPhotos(photoIds);
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '사진 삭제에 실패했습니다. 다시 시도해 주세요.',
        },
      },
      onFinally: () => {
        setIsDeleting(false);
      },
    });
  };

  const deleteSinglePhoto = async (photoId: number) => {
    setIsDeleting(true);
    await photoService.deletePhoto(spaceCode, photoId);
    showToast({
      text: `사진을 삭제했습니다.`,
      type: 'info',
    });
    if (photosList) {
      const updatedPhotos = photosList.filter((photo) => photo.id !== photoId);
      updatePhotos(updatedPhotos);
    }
  };

  const tryDeleteSinglePhoto = async (photoId: number) => {
    await tryFetch({
      task: async () => {
        return await deleteSinglePhoto(photoId);
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '사진 삭제에 실패했습니다. 다시 시도해 주세요.',
        },
      },
      onFinally: () => {
        setIsDeleting(false);
      },
    });

    return true;
  };

  return {
    tryDeleteSelectedPhotos,
    tryDeleteSinglePhoto,
    isDeleting,
  };
};

export default usePhotosDelete;
