import { authService } from '../../apis/services/auth.service';
import { CookieUtils } from '../../utils/CookieUtils';
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

  const handleLogout = async () => {
    await CookieUtils.delete('access_token');
    await CookieUtils.delete('refresh_token');
    location.reload();
  };

  return { handleKakaoLogin, handleLogout };
};

export default useKakaoAuth;
