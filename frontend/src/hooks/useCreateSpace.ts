import { useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import type { SpaceCreateInfo } from '../types/space.type';

const useCreateSpace = () => {
  const [isCreating, setIsCreating] = useState(false);

  /**
   * 스페이스를 생성하고, 생성된 공간의 고유 코드를 반환합니다.
   * @returns 생성된 스페이스의 spaceCode
   */
  const fetchCreateSpace = async (spaceCreateInfo: SpaceCreateInfo) => {
    setIsCreating(true);
    try {
      const response = await spaceService.create(spaceCreateInfo);
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
