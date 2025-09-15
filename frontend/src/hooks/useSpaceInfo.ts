import { useEffect, useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import type { Space } from '../types/space.type';
import useTaskHandler from './@common/useTaskHandler';

const useSpaceInfo = (spaceCode: string) => {
  const [spaceInfo, setSpaceInfo] = useState<Space>();
  const { loadingState, tryFetch } = useTaskHandler();

  const requestSpaceInfo = async () => {
    const response = await spaceService.getInfoByCode(spaceCode);
    if (!response) return;
    setSpaceInfo(response.data);
  };

  const fetchSpaceInfo = async () => {
    await tryFetch({
      task: requestSpaceInfo,
      errorActions: ['toast'],
      context: {
        toast: {
          text: '스페이스 정보를 불러오는데 실패했습니다.',
        },
      },
      loadingStateKey: 'spaceInfo',
    });
  };

  //biome-ignore lint/correctness/useExhaustiveDependencies: 무한 렌더링 방지
  useEffect(() => {
    fetchSpaceInfo();
  }, [spaceCode]);

  return {
    isLoading: loadingState.spaceInfo === 'loading',
    spaceInfo,
    refetchSpaceInfo: fetchSpaceInfo,
  };
};

export default useSpaceInfo;
