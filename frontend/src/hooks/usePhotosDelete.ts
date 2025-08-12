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

  const deleteSinglePhoto = async (photoId: number) => {
    try {
      const result = await overlay(
        React.createElement(ConfirmModal, {
          description: `정말 삭제하시겠어요?`,
          confirmText: '삭제',
          cancelText: '취소',
        }),
        {
          clickOverlayClose: true,
        },
      );

      if (result) {
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
          showToast({
            text: '다시 시도해 주세요.',
            type: 'error',
          });
          console.error(error);
          return false; // 네트워크 오류, 서버 오류 등
        } finally {
          setIsDeleting(false);
        }
      }
      return false; // 사용자가 취소 버튼을 눌렀을 때
    } catch (error) {
      console.error('모달 오류:', error);
      return false; // overlay 함수 호출 실패
    }
  };

  return {
    submitDeletePhotos,
    deleteSinglePhoto,
    isDeleting,
  };
};

export default usePhotosDelete;
