// import { photoService } from '../apis/services/photo.service';

import { photoService } from '../apis/services/photo.service';
import { mockSpaceData } from '../pages/manager/spaceHome/mockSpaceData';
import type { Photo } from '../types/photo.type';
import type { ToastBase } from '../types/toast.type';

interface UsePhotosDeleteProps {
  showToast: (options: ToastBase) => void;
  toggleSelectMode: () => void;
  updatePhotos: (photos: Photo[]) => void;
  fetchPhotosList: () => Promise<void>;
  extractUnselectedPhotos: () => Photo[];
}

const usePhotosDelete = ({
  showToast,
  toggleSelectMode,
  updatePhotos,
  fetchPhotosList,
  extractUnselectedPhotos,
}: UsePhotosDeleteProps) => {
  const fetchDeletePhotos = async (photoIds: number[]) => {
    try {
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
    }
  };

  const submitDeletePhotos = async (photoIds: number[]) => {
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

  return { submitDeletePhotos };
};

export default usePhotosDelete;
