import { ROUTES } from '../../constants/routes';
import type { ApiResponse } from '../../types/api.type';
import useError from './useError';

// TODO : 훅 명칭 변경
const useApiCall = () => {
  const { tryTask } = useError();

  const safeApiCall = async <T>(
    apiCall: () => Promise<ApiResponse<T>>,
  ): Promise<ApiResponse<T> | null> => {
    const taskResult = await tryTask<ApiResponse<T>>({
      task: async () => {
        return await apiCall();
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
