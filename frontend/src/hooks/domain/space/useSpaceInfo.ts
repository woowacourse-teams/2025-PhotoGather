import { useQuery } from '@tanstack/react-query';
import { spaceService } from '../../../apis/services/space/space.service';
import type { SpaceInfo } from '../../../types/domain/space.type';

interface UseSpaceInfoProps {
  spaceCode: string;
}

const useSpaceInfo = ({ spaceCode }: UseSpaceInfoProps) => {
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

  return { spaceInfo, isLoading, isError };
};

export default useSpaceInfo;
