import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { spaceService } from '../../../apis/services/space/space.service';
import type { SpaceInfo } from '../../../types/domain/space.type';
import { useToast } from '../../@common/useToast';

interface UseSpaceInfoProps {
  spaceCode: string;
}

const useSpaceInfo = ({ spaceCode }: UseSpaceInfoProps) => {
  const { showToast } = useToast();

  const initialData: SpaceInfo = {
    id: 0,
    spaceCode: '',
    name: '',
    description: '',
    isPublic: false,
    instagramUsername: '',
    email: '',
    spacePhoto: {
      isExists: false,
      path: '',
    },
  };

  const {
    data: spaceInfo,
    isLoading,
    isError,
  } = useQuery({
    initialData,
    queryKey: ['spaceInfo', spaceCode],
    queryFn: async () => {
      const res = await spaceService.getSpaceInfo(spaceCode);
      if (res.success) {
        return res.data;
      }
      throw new Error('스페이스 정보 조회에 실패했습니다');
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: isError 변경 시에만 토스트 띄우기
  useEffect(() => {
    if (isError) {
      showToast({
        text: '스페이스 정보 조회에 실패했습니다',
        type: 'error',
      });
    }
  }, [isError]);

  return { spaceInfo, isLoading, isError };
};

export default useSpaceInfo;
