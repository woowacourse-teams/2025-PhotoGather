import { DEBUG_MESSAGES } from '../constants/debugMessages';
import type { ApiResponse } from '../types/api.type';

export const validateDataExist = <T>(response: ApiResponse<T>) => {
  if (!response.data) {
    throw new Error(DEBUG_MESSAGES.NO_RESPONSE);
  }
};
