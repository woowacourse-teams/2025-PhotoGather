import type { KakaoLoginURL } from '../../types/auth.type';
import { http } from '../http';

export const authService = {
  getKakaoURL: () => http.get<KakaoLoginURL>('/auth/login/kakao'),
  refresh: () => http.post('/auth/refresh'),
};
