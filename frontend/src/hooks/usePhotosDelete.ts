// import { photoService } from '../apis/services/photo.service';

import { photoService } from '../apis/services/photo.service';
import { mockSpaceData } from '../pages/manager/spaceHome/mockSpaceData';
import type { ToastBase } from '../types/toast.type';

interface UsePhotosDeleteProps {
  selectedPhotoIds: number[];
  submitDeletePhotos: () => Promise<void>;
  showToast: (options: ToastBase) => void;
  toggleSelectMode: () => void;
}

const usePhotosDelete = ({
  selectedPhotoIds,
  submitDeletePhotos,
  showToast,
  toggleSelectMode,
}: UsePhotosDeleteProps) => {
  const fetchDeletePhotos = async () => {
    try {
      await photoService.deletePhotos(mockSpaceData.code, {
        photoIds: selectedPhotoIds,
      });
      await submitDeletePhotos();
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
  return { fetchDeletePhotos };
};

export default usePhotosDelete;
