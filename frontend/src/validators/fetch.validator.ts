import { DEBUG_MESSAGES } from '../constants/debugMessages';
import { NETWORK_ERROR } from '../constants/errors';
import type { ApiResponse } from '../types/api.type';

export const validateResponseExist = <T>(
  response: ApiResponse<T> | undefined,
): response is ApiResponse<NonNullable<T>> => {
  if (!response || !response.data) {
    throw new Error(DEBUG_MESSAGES.NO_RESPONSE);
  }
  return true;
};

export const validateNetworkError = (response: ApiResponse<unknown>) => {
  const isNetworkErrorOccur =
    !response.success &&
    response.error?.toLowerCase().includes(NETWORK_ERROR.DEFAULT.toLowerCase());

  if (isNetworkErrorOccur) {
    throw new Error(NETWORK_ERROR.DEFAULT);
  }
};

export const validateDownloadFormat = async (data: unknown) => {
  if (!(data instanceof Blob)) {
    throw new Error(DEBUG_MESSAGES.NO_BLOB_INSTANCE);
  }
};
