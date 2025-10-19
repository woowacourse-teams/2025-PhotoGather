import { Navigate, Outlet } from 'react-router-dom';
import { AUTH_COOKIES } from '../../../constants/cookie';
import { ROUTES } from '../../../constants/routes';
import { UserProvider } from '../../../contexts/UserContext';
import { CookieUtils } from '../../../utils/cookie';

export const PrivateRoute = () => {
  const accessToken = CookieUtils.get(AUTH_COOKIES.ACCESS);
  const refreshToken = CookieUtils.get(AUTH_COOKIES.REFRESH);

  if (!accessToken && !refreshToken) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};
