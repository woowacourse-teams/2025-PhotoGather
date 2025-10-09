import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { spaceService } from '../../../apis/services/space/space.service';
import { ROUTES } from '../../../constants/routes';
import type { SpaceInfoFormData } from '../../../types/domain/space.type';
import type { CreateFunnelForm } from '../../../types/funnel.type';
import { useToast } from '../../@common/useToast';

export const useSpaceCreate = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // TODO: usePatchSpaceInfo에 있는 것과 통합 필요한지? 차이점은 updatedData 처리 유무임
  const createFormData = (data: Partial<SpaceInfoFormData>, image?: File) => {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
    );

    if (image) {
      formData.append('file', image);
    }
    return formData;
  };

  const requestSpaceCode = async (spaceCreateInfoForm: FormData) => {
    const response = await spaceService.create(spaceCreateInfoForm);
    if (!response.success) {
      throw new Error('스페이스 생성 API 호출 실패');
    }
    return response.data.spaceCode;
  };

  const {
    mutateAsync: fetchCreateSpace,
    isPending: isCreating,
    data: spaceCode,
  } = useMutation({
    mutationFn: requestSpaceCode,
  });

  const createSpace = async (createFunnelForm: CreateFunnelForm) => {
    const { profileImage, ...createFunnelRequest } = createFunnelForm;

    const formData = createFormData(
      createFunnelRequest,
      profileImage[0]?.originFile,
    );

    try {
      const spaceCode = await fetchCreateSpace(formData);
      if (!spaceCode) return;
      navigate(ROUTES.HOST.SHARE, { state: { spaceCode } });
    } catch (error) {
      showToast({
        text: '스페이스 생성에 실패했습니다',
        type: 'error',
      });
      console.error('스페이스 생성 실패:', error);
    }
  };

  return {
    isCreating,
    spaceCode,
    createSpace,
  };
};
