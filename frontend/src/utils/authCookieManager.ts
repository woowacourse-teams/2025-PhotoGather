import { BASE_URL } from '../apis/config';
import { ROUTES } from '../constants/routes';
import type { AuthTokenResponse } from '../types/auth.type';
import { CookieUtils } from './CookieUtils';

let refreshPromise: Promise<AuthTokenResponse> | null = null;

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  CookieUtils.set('access', accessToken, { path: ROUTES.MAIN });
  CookieUtils.set('refresh', refreshToken, { path: ROUTES.MAIN });
};

export const clearAuthTokens = () => {
  CookieUtils.delete('access', { path: ROUTES.MAIN });
  CookieUtils.delete('refresh', { path: ROUTES.MAIN });
};

export const refreshAccessToken = async (): Promise<AuthTokenResponse> => {
  if (refreshPromise) return refreshPromise;

  const accessToken = CookieUtils.get('access');
  const refreshToken = CookieUtils.get('refresh');
  if (!accessToken || !refreshToken) {
    clearAuthTokens();
    throw new Error('로그인 후 이용해주세요.');
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) throw new Error('로그인 세션이 만료되었습니다.');

      const data = await response.json();

      setAuthTokens(data.accessToken, data.refreshToken);

      return { accessToken: data.accessToken, refreshToken: data.refreshToken };
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
