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
    http.post<AuthTokenResponse>('/auth/login/kakao/confirm', requestBody),

  // TODO : 반환타입에 맞춰 제네릭 수정
  getUserInfo: (token: string) =>
    http.get<UserInfo>('/auth/me', undefined, token),
};
