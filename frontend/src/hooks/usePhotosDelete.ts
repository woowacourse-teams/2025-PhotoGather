// import { photoService } from '../apis/services/photo.service';

import { photoService } from '../apis/services/photo.service';
import { mockSpaceData } from '../pages/manager/spaceHome/mockSpaceData';

interface UsePhotosDeleteProps {
  selectedPhotoIds: number[];
  submitDeletePhotos: () => Promise<void>;
}

const usePhotosDelete = ({
  selectedPhotoIds,
  submitDeletePhotos,
}: UsePhotosDeleteProps) => {
  const fetchDeletePhotos = async () => {
    try {
      await photoService.deletePhotos(mockSpaceData.code, {
        photoIds: selectedPhotoIds,
      });
      console.log(selectedPhotoIds);
    } catch (error) {
      //TODO : 에러 토스트 로직으로 변경
      console.error(error);
    } finally {
      await submitDeletePhotos();
    }
  };
  return { fetchDeletePhotos };
};

export default usePhotosDelete;
