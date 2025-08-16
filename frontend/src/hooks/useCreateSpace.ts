import { useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import type { SpaceCreateInfo } from '../types/space.type';
import useError from './@common/useError';

const useCreateSpace = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { tryFetch } = useError();

  const requestSpaceCode = async (spaceCreateInfo: SpaceCreateInfo) => {
    setIsCreating(true);
    const response = await spaceService.create(spaceCreateInfo);
    if (!response || !response.data) return '';
    return response.data.spaceCode;
  };

  const fetchCreateSpace = async (spaceCreateInfo: SpaceCreateInfo) => {
    const taskResult = await tryFetch<string | undefined>({
      task: async () => requestSpaceCode(spaceCreateInfo),
      errorActions: ['toast'],
      context: {
        toast: {
          text: '스페이스 생성에 실패했습니다. 다시 시도해 주세요.',
        },
      },
      onFinally: () => setIsCreating(false),
    });

    return taskResult.data;
  };

  return { isCreating, fetchCreateSpace };
};

export default useCreateSpace;
