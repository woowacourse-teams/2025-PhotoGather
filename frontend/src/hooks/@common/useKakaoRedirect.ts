import { useEffect } from 'react';
import { ROUTES } from '../../constants/routes';

const useKakaoRedirect = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isKakaoBrowser = userAgent.includes('kakaotalk');

    if (isKakaoBrowser) {
      window.location.href = ROUTES.OPEN_BROWSER;
    }
  }, []);
};

export default useKakaoRedirect;
