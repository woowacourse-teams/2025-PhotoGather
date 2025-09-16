import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { CookieUtils } from '../../utils/CookieUtils';

const useAuth = () => {
  const navigate = useNavigate();

  const setAuthTokens = (accessToken: string, refreshToken: string) => {
    CookieUtils.set('access', accessToken, {
      path: ROUTES.MAIN,
    });
    CookieUtils.set('refresh', refreshToken, {
      path: ROUTES.MAIN,
    });
  };

  const clearAuthTokens = () => {
    CookieUtils.delete('access', { path: ROUTES.MAIN });
    CookieUtils.delete('refresh', { path: ROUTES.MAIN });
  };

  const handleLogout = async () => {
    clearAuthTokens();
    navigate(ROUTES.MAIN);
    setTimeout(() => {
      location.reload();
    }, 0);
  };

  return { setAuthTokens, handleLogout };
};

export default useAuth;
