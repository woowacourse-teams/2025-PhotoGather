import type {
  AuthTokenResponse,
  KakaoClientId,
  KakaoTokenResponse,
} from '../../types/auth.type';
import { authHttp, http } from '../http';

export const authService = {
  getKakaoClientId: () => http.get<KakaoClientId>('/auth/login/kakao'),
  getAuth: (requestBody: KakaoTokenResponse) =>
    http.post<AuthTokenResponse>('/auth/login/kakao/confirm', requestBody),
  refresh: () => http.post('/auth/refresh'),
  status: () => authHttp.get('/auth/me'),
  callback: (code: string) => http.post<AuthTokenResponse>('', { code }),
};
