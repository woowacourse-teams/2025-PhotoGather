import { authService } from '../../apis/services/auth.service';
import useError from '../@common/useError';

const useKakaoLogin = () => {
  const { tryTask } = useError();

  const requestKakaoURL = async () => {
    const response = await authService.getKakaoURL();
    if (!response || !response.data) return '';
    return response.data.loginUrl;
  };

  const handleKakaoLogin = async () => {
    const taskResult = await tryTask({
      task: async () => requestKakaoURL(),
      errorActions: ['toast'],
    });

    if (taskResult.success) window.location.href = taskResult.data;
  };

  return { handleKakaoLogin };
};

export default useKakaoLogin;
