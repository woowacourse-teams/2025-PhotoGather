import { ROUTES } from '../../constants/routes';
import type { ApiResponse } from '../../types/api.type';
import {
  validateNetworkError,
  validateResponseExist,
} from '../../validators/fetch.validator';
import useError from './useError';

// TODO : 훅 명칭 변경
const useApiCall = () => {
  const { tryTask } = useError();

  const fetchAndValidate = async <T>(
    apiCall: () => Promise<ApiResponse<T>>,
  ): Promise<ApiResponse<T>> => {
    const response = await apiCall();
    validateNetworkError(response);
    validateResponseExist(response);
    return response;
  };

  const safeApiCall = async <T>(
    apiCall: () => Promise<ApiResponse<T>>,
  ): Promise<ApiResponse<T> | null> => {
    const taskResult = await tryTask<ApiResponse<T>>({
      task: async () => {
        return await fetchAndValidate(apiCall);
      },
      errorActions: ['redirect'],
      context: {
        redirect: ROUTES.ERROR.NETWORK,
      },
    });

    return taskResult.data;
  };

  return { safeApiCall };
};

export default useApiCall;
