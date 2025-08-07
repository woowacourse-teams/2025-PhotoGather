import { useState } from 'react';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import type { SpaceCreateInfo } from '../types/space.type';

const useCreateSpace = () => {
  const [isCreating, setIsCreating] = useState(false);

  const fetchCreateSpace = async (spaceCreateInfo: SpaceCreateInfo) => {
    setIsCreating(true);
    try {
      // TODO: 모킹 API 삭제
      // const response = await spaceService.create(spaceCreateInfo);
      const response = await new Promise<{ data: { spaceCode: string } }>(
        (resolve) => resolve({ data: { spaceCode: 'mock-space-code-1234' } }),
      );
      const data = response.data;

      if (!data?.spaceCode) {
        throw new Error(DEBUG_MESSAGES.NO_RESPONSE);
      }

      return data.spaceCode;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
    } finally {
      setIsCreating(false);
    }
  };

  return { isCreating, fetchCreateSpace };
};

export default useCreateSpace;
