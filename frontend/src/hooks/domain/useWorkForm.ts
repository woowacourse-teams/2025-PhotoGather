import { useEffect, useState } from 'react';
import type { UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { workService } from '../../apis/services/work/work.service';
import { createWorkDetailRoute } from '../../constants/routes';
import type {
  PhotoUpload,
  UpdateWorkRequest,
  WorkPhoto,
} from '../../types/domain/work.type';
import { uploadPhotosToS3 } from '../../utils/uploadPhotosToS3';
import { useToast } from '../@common/useToast';

export interface WorkFormData {
  title: string;
  category: string;
  designer: string;
  description: string;
}

interface UseWorkFormParams {
  spaceCode: string | undefined;
  reset: UseFormReset<WorkFormData>;
}

export const useWorkForm = ({ spaceCode, reset }: UseWorkFormParams) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState<WorkPhoto[]>([]);
  const [deletedPhotoIds, setDeletedPhotoIds] = useState<number[]>([]);
  const [initialWorkData, setInitialWorkData] = useState<WorkFormData | null>(
    null,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: showToast is stable
  useEffect(() => {
    const fetchWorkData = async () => {
      if (!spaceCode) return;

      try {
        const response = await workService.getWork(spaceCode);

        if (response.success && response.data) {
          setIsEditMode(true);
          setExistingPhotos(response.data.photos);
          const formData = {
            title: response.data.title,
            category: response.data.category,
            designer: response.data.authorName,
            description: response.data.description,
          };
          setInitialWorkData(formData);
          reset(formData);
        }
      } catch (error) {
        console.error(error);
        showToast({ text: '작품 정보를 불러오는 데 실패했습니다.' });
      }
    };

    fetchWorkData();
  }, [spaceCode, reset]);

  const handleDeleteExistingPhoto = (photoId: number) => {
    setDeletedPhotoIds((prev) => [...prev, photoId]);
    setExistingPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  const uploadNewPhotos = async (files: File[]) => {
    if (!spaceCode) return [];

    return files.length > 0
      ? await uploadPhotosToS3(spaceCode, 'PRODUCT', files)
      : [];
  };

  const buildUpdateRequest = (
    data: WorkFormData,
    newPhotos: PhotoUpload[],
  ): UpdateWorkRequest => {
    const updateData: UpdateWorkRequest = {
      deletePhotoIds: deletedPhotoIds.length > 0 ? deletedPhotoIds : [],
      newPhotos: newPhotos.length > 0 ? newPhotos : [],
    };

    if (initialWorkData && data.title !== initialWorkData.title) {
      updateData.title = data.title;
    }
    if (initialWorkData && data.category !== initialWorkData.category) {
      updateData.category = data.category;
    }
    if (initialWorkData && data.designer !== initialWorkData.designer) {
      updateData.authorName = data.designer;
    }
    if (initialWorkData && data.description !== initialWorkData.description) {
      updateData.description = data.description;
    }

    return updateData;
  };

  const handleUpdateWork = async (
    data: WorkFormData,
    newPhotos: PhotoUpload[],
  ) => {
    if (!spaceCode) return;

    const updateData = buildUpdateRequest(data, newPhotos);
    const response = await workService.updateWork(spaceCode, updateData);

    if (response.success) {
      navigate(createWorkDetailRoute(spaceCode));
    } else {
      console.error(response.error);
      showToast({ text: '작품 수정에 실패했습니다.' });
    }
  };

  const handleCreateWork = async (
    data: WorkFormData,
    newPhotos: PhotoUpload[],
  ) => {
    if (!spaceCode) return;

    const response = await workService.createWork(spaceCode, {
      title: data.title,
      category: data.category,
      authorName: data.designer,
      description: data.description,
      photos: newPhotos,
    });

    if (response.success) {
      navigate(createWorkDetailRoute(spaceCode));
    } else {
      console.error(response.error);
      showToast({ text: '작품 등록에 실패했습니다.' });
    }
  };

  const submitWork = async (data: WorkFormData, files: File[]) => {
    if (!spaceCode) {
      console.error('스페이스 코드가 없습니다. spaceCode:', spaceCode);
      return;
    }

    try {
      const newPhotos = await uploadNewPhotos(files);

      if (isEditMode) {
        await handleUpdateWork(data, newPhotos);
      } else {
        await handleCreateWork(data, newPhotos);
      }
    } catch (error) {
      console.error(error);
      showToast({ text: '작품 저장에 실패했습니다.' });
    }
  };

  return {
    isEditMode,
    existingPhotos,
    handleDeleteExistingPhoto,
    submitWork,
  };
};
