import type {
  AuthTokenResponse,
  KakaoClientId,
  KakaoTokenResponse,
  UserInfo,
} from '../../../types/domain/auth.type';
import { http } from '../../http';

export const authService = {
  getKakaoClientId: () => http.get<KakaoClientId>('/auth/login/kakao'),

  getAuth: (requestBody: KakaoTokenResponse) =>
    http.post<AuthTokenResponse>('/auth/login/kakao/confirm', {
      body: requestBody,
    }),

  getUserInfo: (token: string | undefined) =>
    http.get<UserInfo>('/auth/me', { token }),
};
