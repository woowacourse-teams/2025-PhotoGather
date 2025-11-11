import { useQuery } from '@tanstack/react-query';
import { spaceService } from '../../../apis/services/space/space.service';

export const useSpaceStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['spaceStats'],
    queryFn: async () => {
      const res = await spaceService.getSpaceStats();
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error('스페이스 통계 조회에 실패했습니다');
    },
    staleTime: 30 * 60 * 1000,
  });

  return { stats: data, isLoading, isError };
};
