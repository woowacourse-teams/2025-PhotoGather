import { useMutation, useQueryClient } from '@tanstack/react-query';
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

interface PatchMutationVariables {
  data: Partial<SpaceInfoFormData>;
  image?: File;
}

const usePatchSpaceInfo = ({
  spaceCode,
  dirtyFields,
  afterPatch,
  isImageExisted,
}: UsePatchSpaceInfoProps) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const patchMutation = useMutation({
    mutationFn: async (patchMutationVariable: PatchMutationVariables) => {
      const { data, image } = patchMutationVariable;
      const formData = createFormData(data, image);
      await spaceService.patchSpaceInfo(spaceCode, formData);
    },
    onSuccess: () => {
      showToast({
        text: '스페이스 정보가 수정되었습니다.',
        type: 'info',
      });
      afterPatch?.();
      queryClient.invalidateQueries({ queryKey: ['spaceInfo', spaceCode] });
      navigate(createSpaceInfoRoute(spaceCode));
      return;
    },
    onError: () => {
      showToast({
        text: '스페이스 정보 수정에 실패했습니다.',
        type: 'error',
      });
    },
  });

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
    patchMutation.mutate({ data, image });
  };

  return { patchSpaceInfo, isPatching: patchMutation.isPending };
};

export default usePatchSpaceInfo;
