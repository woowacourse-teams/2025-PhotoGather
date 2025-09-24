import { useNavigate } from 'react-router-dom';
import { DOMAIN } from '../../../apis/config';
import { authService } from '../../../apis/services/auth.service';
import { ROUTES } from '../../../constants/routes';
import { setAuthTokens } from '../../../utils/authCookieManager';
import useTaskHandler from '../../@common/useTaskHandler';

const useKakaoAuth = () => {
  const navigate = useNavigate();
  const { tryTask, tryFetch } = useTaskHandler();
  const REQUEST_URI = `${DOMAIN}${ROUTES.AUTH.KAKAO}`;

  const createGetKakaoCodeUrl = (clientId: string, redirectUri: string) =>
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  const createGetKakaoAuthUrl = (
    clientId: string,
    redirectUri: string,
    code: string,
  ) =>
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirectUri}&code=${code}`;

  const requestKakaoClientId = async () => {
    const response = await authService.getKakaoClientId();
    if (!response || !response.data) return '';
    return response.data.clientId;
  };

  const handleKakaoLogin = async () => {
    const clientIdTaskResult = await tryFetch({
      task: async () => await requestKakaoClientId(),
      errorActions: ['toast'],
    });

    if (!clientIdTaskResult || !clientIdTaskResult.data) return;

    tryTask({
      task: () => {
        location.href = createGetKakaoCodeUrl(
          clientIdTaskResult.data,
          REQUEST_URI,
        );
      },
      errorActions: ['toast'],
    });
  };

  const getAuth = async (code: string) => {
    const clientIdTaskResult = await tryFetch({
      task: async () => await requestKakaoClientId(),
      errorActions: ['toast'],
    });

    if (!clientIdTaskResult || !clientIdTaskResult.data) return;
    const clientId = clientIdTaskResult.data;

    await tryFetch({
      task: async () => {
        const response = await fetch(
          createGetKakaoAuthUrl(clientId, REQUEST_URI, code),
        );
        const kakaoToken = await response.json();
        const authResponse = await authService.getAuth(kakaoToken);

        if (!authResponse || !authResponse.data) return;

        setAuthTokens(
          authResponse.data.accessToken,
          authResponse.data.refreshToken,
        );

        navigate(ROUTES.MAIN);
        setTimeout(() => {
          location.reload();
        }, 0);
      },
      errorActions: ['toast', 'redirect'],
      context: {
        redirect: {
          path: ROUTES.LOGIN,
        },
      },
    });
  };

  return { handleKakaoLogin, getAuth };
};

export default useKakaoAuth;
