import { useNavigate } from 'react-router-dom';
import { NETWORK } from '../../constants/errors';
import { ROUTES } from '../../constants/routes';
import type { ApiResponse } from '../../types/api.type';

const useApiCall = () => {
  const navigate = useNavigate();

  const safeApiCall = async <T>(apiCall: () => Promise<ApiResponse<T>>) => {
    try {
      const response = await apiCall();

      if (
        !response.success &&
        response.error?.toLowerCase().includes(NETWORK.DEFAULT.toLowerCase())
      ) {
        navigate(ROUTES.ERROR.NETWORK);
      }

      return response;
    } catch (error) {
      navigate(ROUTES.ERROR.NETWORK);
      throw error;
    }
  };

  return { safeApiCall };
};

export default useApiCall;
