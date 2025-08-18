import { authService } from '../../apis/services/auth.service';
import useError from '../@common/useError';

const useKakaoAuth = () => {
  const { tryFetch } = useError();

  const requestKakaoURL = async () => {
    const response = await authService.getKakaoURL();
    if (!response || !response.data) return '';
    return response.data.loginUrl;
  };

  const handleKakaoLogin = async () => {
    const taskResult = await tryFetch({
      task: async () => requestKakaoURL(),
      errorActions: ['toast'],
    });

    if (taskResult.success && taskResult.data)
      window.location.href = taskResult.data;
  };

  const handleKakaoLogout = async () => {
    await tryFetch({
      task: async () => await authService.logout(),
      errorActions: ['toast'],
    });
  };

  return { handleKakaoLogin, handleKakaoLogout };
};

export default useKakaoAuth;
