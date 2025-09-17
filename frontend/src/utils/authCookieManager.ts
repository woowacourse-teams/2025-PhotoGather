import { ROUTES } from '../constants/routes';
import { CookieUtils } from './CookieUtils';

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  CookieUtils.set('access', accessToken, { path: ROUTES.MAIN });
  CookieUtils.set('refresh', refreshToken, { path: ROUTES.MAIN });
};

export const clearAuthTokens = () => {
  CookieUtils.delete('access', { path: ROUTES.MAIN });
  CookieUtils.delete('refresh', { path: ROUTES.MAIN });
};
