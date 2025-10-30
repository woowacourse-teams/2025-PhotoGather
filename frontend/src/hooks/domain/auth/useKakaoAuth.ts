import { DOMAIN } from '../../../apis/config';
import { authService } from '../../../apis/services/auth/auth.service';
import {
  createGetKakaoCodeUrl,
  createGetKakaoTokenRequestUrl,
  ROUTES,
} from '../../../constants/routes';
import type { KakaoTokenResponse } from '../../../types/domain/auth.type';
import { setAuthTokens } from '../../../utils/authCookieManager';
import { useToast } from '../../@common/useToast';

const useKakaoAuth = () => {
  const { showToast } = useToast();
  const REQUEST_URI = `${DOMAIN}${ROUTES.AUTH.KAKAO}`;

  const requestKakaoClientId = async () => {
    const response = await authService.getKakaoClientId();
    if (!response.success || !response.data) {
      throw new Error('카카오 클라이언트 ID 요청 실패');
    }
    return response.data.clientId;
  };

  const requestKakaoToken = async (clientId: string, code: string) => {
    const response = await fetch(
      createGetKakaoTokenRequestUrl(clientId, REQUEST_URI, code),
    );
    if (!response.ok) {
      throw new Error('카카오 인증 서버 응답 오류');
    }
    const kakaoToken = await response.json();
    return kakaoToken;
  };

  const requestServerToken = async (kakaoToken: KakaoTokenResponse) => {
    const authResponse = await authService.getAuth(kakaoToken);
    if (!authResponse.success || !authResponse.data) {
      throw new Error('내부 서버 인증 토큰 발급 실패');
    }
    return authResponse.data;
  };

  const handleKakaoLogin = async () => {
    try {
      const clientId = await requestKakaoClientId();
      location.href = createGetKakaoCodeUrl(clientId, REQUEST_URI);
    } catch (error) {
      console.error(error);
      showToast({
        text: '로그인에 실패했습니다. 다시 시도해 주세요.',
        type: 'error',
      });
    }
  };

  const getServerToken = async (code: string) => {
    try {
      const clientId = await requestKakaoClientId();
      const kakaoToken = await requestKakaoToken(clientId, code);
      const serverToken = await requestServerToken(kakaoToken);
      setAuthTokens(serverToken.accessToken, serverToken.refreshToken);
    } catch (error) {
      console.error(error);
      showToast({
        text: '로그인에 실패했습니다. 다시 시도해 주세요.',
        type: 'error',
      });
    }
  };

  return { handleKakaoLogin, getServerToken };
};

export default useKakaoAuth;
