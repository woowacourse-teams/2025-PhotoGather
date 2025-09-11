import { useEffect, useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import type { SpaceCapacity } from '../types/space.type';
import useTaskHandler from './@common/useTaskHandler';

const useSpaceCapacity = (spaceCode: string) => {
  const [capacity, setCapacity] = useState<SpaceCapacity>();
  const [isLoading, setIsLoading] = useState(false);
  const { tryFetch } = useTaskHandler();

  const requestSpaceCapacity = async () => {
    setIsLoading(true);
    const response = await spaceService.getCapacity(spaceCode);
    if (!response) return;
    setCapacity(response.data);
  };

  const fetchSpaceCapacity = async () => {
    await tryFetch({
      task: requestSpaceCapacity,
      errorActions: ['toast'],
      context: {
        toast: {
          text: '스페이스 용량 정보를 불러오는데 실패했습니다.',
        },
      },
      loadingStateKey: 'spaceCapacity',
    });
  };

  //biome-ignore lint/correctness/useExhaustiveDependencies: 무한 렌더링 방지
  useEffect(() => {
    if (spaceCode) {
      fetchSpaceCapacity();
    }
  }, [spaceCode]);

  return { capacity, isLoading, refetchCapacity: fetchSpaceCapacity };
};

export default useSpaceCapacity;
