import { useNavigate } from 'react-router-dom';
import { spaceService } from '../../../apis/services/space/space.service';
import { createSpaceInfoRoute } from '../../../constants/routes';
import type { SpaceInfoFormData } from '../../../types/domain/space.type';
import { useToast } from '../../@common/useToast';

interface UsePatchSpaceInfoProps {
  spaceCode: string;
  dirtyFields: Partial<Record<keyof SpaceInfoFormData, boolean>>;
  afterPatch?: () => void;
  isImageExisted: boolean;
}

const usePatchSpaceInfo = ({
  spaceCode,
  dirtyFields,
  afterPatch,
  isImageExisted,
}: UsePatchSpaceInfoProps) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const findUpdatedData = (
    data: Partial<SpaceInfoFormData>,
    patchImage?: File,
  ) => {
    const updatedFormData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, _]) => dirtyFields[key as keyof SpaceInfoFormData],
      ),
    );

    if (!patchImage && isImageExisted && dirtyFields.isDeletePhoto) {
      updatedFormData.isDeletePhoto = true;
    }
    if (patchImage && isImageExisted) {
      updatedFormData.isDeletePhoto = true;
    }

    return updatedFormData;
  };

  const createFormData = (
    data: Partial<SpaceInfoFormData>,
    patchImage?: File,
  ) => {
    const updatedData = findUpdatedData(data, patchImage);

    const formData = new FormData();
    formData.append('request', JSON.stringify(updatedData));
    if (patchImage) {
      formData.append('file', patchImage);
    }

    return formData;
  };

  const patchSpaceInfo = async (
    data: Partial<SpaceInfoFormData>,
    image?: File,
  ) => {
    const formData = createFormData(data, image);
    const res = await spaceService.patchSpaceInfo(spaceCode, formData);
    if (res.success) {
      showToast({
        text: '스페이스 정보가 수정되었습니다.',
        type: 'info',
      });
      afterPatch?.();
      navigate(createSpaceInfoRoute(spaceCode));
      return;
    }
    showToast({
      text: '스페이스 정보 수정에 실패했습니다.',
      type: 'error',
    });
  };

  return { patchSpaceInfo };
};

export default usePatchSpaceInfo;
