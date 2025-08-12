import { useEffect, useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import type { Space } from '../types/space.type';
import { validateDataExist } from '../validators/data.validator';
import useApiCall from './@common/useApiCall';
import useError from './@common/useError';

const useSpaceInfo = (spaceCode: string) => {
  const [spaceInfo, setSpaceInfo] = useState<Space>();
  const [isLoading, setIsLoading] = useState(false);
  const { safeApiCall } = useApiCall();
  const { tryTask } = useError();

  const requestSpaceInfo = async () => {
    setIsLoading(true);
    const response = await safeApiCall(() =>
      spaceService.getInfoByCode(spaceCode),
    );
    validateDataExist(response);
    setSpaceInfo(response.data);
  };

  //biome-ignore lint/correctness/useExhaustiveDependencies: 무한 렌더링 방지
  useEffect(() => {
    tryTask({
      task: requestSpaceInfo,
      errorActions: ['toast'],
      context: {
        toast: {
          text: '스페이스 정보를 불러오는데 실패했습니다.',
        },
      },
      onFinally: () => setIsLoading(false),
    });
  }, [spaceCode]);

  return { isLoading, spaceInfo };
};

export default useSpaceInfo;
