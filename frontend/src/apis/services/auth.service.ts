import type { MyInfo } from '../../types/api.type';
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

  refresh: (refreshToken: string) =>
    http.post<AuthTokenResponse>('/auth/refresh', { refreshToken }),

  status: () => authHttp.get<MyInfo>('/auth/me'),

  agreeTerm: () => authHttp.post('/auth/terms'),
};
