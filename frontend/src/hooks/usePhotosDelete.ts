// import { photoService } from '../apis/services/photo.service';
import React, { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import ConfirmModal from '../components/modal/ConfirmModal';
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
}

const usePhotosDelete = ({
  spaceCode,
  toggleSelectMode,
  updatePhotos,
  tryFetchPhotosList,
  extractUnselectedPhotos,
}: UsePhotosDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const overlay = useOverlay();
  const { tryTask } = useError();
  const { showToast } = useToast();

  const fetchDeletePhotos = async (photoIds: number[]) => {
    await photoService.deletePhotos(spaceCode, {
      photoIds: photoIds,
    });
  };

  const handleDeletePhotos = async (photoIds: number[]) => {
    setIsDeleting(true);
    await fetchDeletePhotos(photoIds);
    updatePhotos(extractUnselectedPhotos());
    await tryFetchPhotosList();
    showToast({
      text: `${photoIds.length}개의 사진을 삭제했습니다.`,
      type: 'info',
    });
  };

  const receiveConfirm = async (photoIds: number[]) => {
    return await overlay(
      React.createElement(ConfirmModal, {
        description: `${photoIds.length}개의 사진을 삭제하시겠습니까?`,
        confirmText: '삭제',
        cancelText: '취소',
      }),
      {
        clickOverlayClose: true,
      },
    );
  };

  const submitDeletePhotos = async (photoIds: number[]) => {
    const taskResult = await tryTask({
      task: () => checkSelectedPhotoExist(photoIds),
      errorActions: ['toast'],
    });
    if (!taskResult.success) return;

    const isConfirm = await receiveConfirm(photoIds);
    if (!isConfirm) return;

    tryTask({
      task: async () => {
        await handleDeletePhotos(photoIds);
      },
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '사진이 삭제되지 않았습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      onFinally: () => {
        toggleSelectMode();
        setIsDeleting(false);
      },
    });
  };

  return { submitDeletePhotos, isDeleting };
};

export default usePhotosDelete;
