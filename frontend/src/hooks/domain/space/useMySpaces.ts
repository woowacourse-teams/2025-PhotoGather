import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { spaceService } from '../../../apis/services/space/space.service';
import { useToast } from '../../@common/useToast';

const useMySpaces = () => {
  const { showToast } = useToast();

  const {
    data: mySpaces = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mySpaces'],
    queryFn: async () => {
      const res = await spaceService.getMySpaces();
      if (res.success && res.data) {
        return res.data.spaces;
      }
      throw new Error('스페이스 목록 조회에 실패했습니다');
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: isError 변경 시에만 토스트 띄우기
  useEffect(() => {
    if (isError) {
      showToast({
        text: '스페이스 목록 조회에 실패했습니다',
        type: 'error',
      });
    }
  }, [isError]);

  return { mySpaces, isLoading, isError };
};

export default useMySpaces;
