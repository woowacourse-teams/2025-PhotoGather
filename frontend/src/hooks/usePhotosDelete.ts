// import { photoService } from '../apis/services/photo.service';

import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { ERROR } from '../constants/messages';
import { mockSpaceData } from '../pages/manager/spaceHome/mockSpaceData';
import type { Photo } from '../types/photo.type';
import { useToast } from './@common/useToast';

interface UsePhotosDeleteProps {
  toggleSelectMode: () => void;
  updatePhotos: (photos: Photo[]) => void;
  fetchPhotosList: () => Promise<void>;
  extractUnselectedPhotos: () => Photo[];
}

const usePhotosDelete = ({
  toggleSelectMode,
  updatePhotos,
  fetchPhotosList,
  extractUnselectedPhotos,
}: UsePhotosDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const fetchDeletePhotos = async (photoIds: number[]) => {
    try {
      setIsDeleting(true);
      await photoService.deletePhotos(mockSpaceData.code, {
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
    // TODO : 모달  로직으로 변경
    const answer = confirm(`${photoIds.length}개의 사진을 삭제하시겠습니까?`);
    if (!answer) return;
    await fetchDeletePhotos(photoIds);
    showToast({
      text: `${photoIds.length}개의 사진을 삭제했습니다.`,
      type: 'info',
    });
    updatePhotos(extractUnselectedPhotos());
    await fetchPhotosList();
  };

  return { submitDeletePhotos, isDeleting };
};

export default usePhotosDelete;
