import { Navigate, Outlet } from 'react-router-dom';
import { AUTH_COOKIES } from '../../../constants/cookie';
import { ROUTES } from '../../../constants/routes';
import { CookieUtils } from '../../../utils/cookie';

export const PrivateRoute = () => {
  const token = CookieUtils.get(AUTH_COOKIES.ACCESS);

  if (!token) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
};
