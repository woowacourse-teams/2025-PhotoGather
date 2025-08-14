import { useEffect, useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import type { Space } from '../types/space.type';
import useError from './@common/useError';

const useSpaceInfo = (spaceCode: string) => {
  const [spaceInfo, setSpaceInfo] = useState<Space>();
  const [isLoading, setIsLoading] = useState(false);
  const { tryTask } = useError();

  const requestSpaceInfo = async () => {
    setIsLoading(true);
    const response = await spaceService.getInfoByCode(spaceCode);
    if (!response) return;
    setSpaceInfo(response.data);
  };

  //biome-ignore lint/correctness/useExhaustiveDependencies: 무한 렌더링 방지
  useEffect(() => {
    const fetchSpaceInfo = async () => {
      await tryTask({
        task: requestSpaceInfo,
        errorActions: ['toast'],
        context: {
          toast: {
            text: '스페이스 정보를 불러오는데 실패했습니다.',
          },
        },
        onFinally: () => setIsLoading(false),
        shouldLogToSentry: true,
      });
    };

    fetchSpaceInfo();
  }, [spaceCode]);

  return { isLoading, spaceInfo };
};

export default useSpaceInfo;
