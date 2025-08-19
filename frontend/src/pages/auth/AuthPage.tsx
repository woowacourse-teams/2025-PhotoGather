import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { setCookie } from '../../utils/setCookie';

const AuthPage = () => {
  const [tokenReady, setTokenReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken) {
      setCookie('access_token', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
    }
    if (refreshToken) {
      setCookie('refresh_token', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
    }

    if (accessToken || refreshToken) {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    setTokenReady(true);
  }, []);

  useEffect(() => {
    if (tokenReady) {
      navigate(ROUTES.MAIN);
    }
  }, [navigate, tokenReady]);

  return null;
};

export default AuthPage;
