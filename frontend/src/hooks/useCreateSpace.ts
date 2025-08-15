import { useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import type { SpaceCreateInfo } from '../types/space.type';
import useError from './@common/useError';

const useCreateSpace = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { tryTask } = useError();

  const requestSpaceCode = async (spaceCreateInfo: SpaceCreateInfo) => {
    setIsCreating(true);
    const response = await spaceService.create(spaceCreateInfo);
    if (!response || !response.data) return '';
    return response.data.spaceCode;
  };

  const fetchCreateSpace = async (spaceCreateInfo: SpaceCreateInfo) => {
    const taskResult = await tryTask<string | undefined>({
      task: async () => requestSpaceCode(spaceCreateInfo),
      errorActions: ['afterAction'],
      context: {
        afterAction: () => {
          throw new Error();
        },
      },
      onFinally: () => setIsCreating(false),
      sentryLog: {
        body: {
          spaceCreateInfo,
        },
      },
    });

    return taskResult.data;
  };

  return { isCreating, fetchCreateSpace };
};

export default useCreateSpace;
