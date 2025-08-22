import { useEffect } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import type { AppRouteObject } from '../../types/route.type';

const useKakaoRedirect = () => {
  const navigate = useNavigate();
  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isKakaoBrowserAllowPage = current?.handle?.kakaoBrowserAllow;

  const location = useLocation().pathname;

  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isKakaoBrowser = userAgent.includes('kakaotalk');

    if (isKakaoBrowser && !isKakaoBrowserAllowPage) {
      navigate(ROUTES.OPEN_BROWSER, {
        state: {
          redirectPath: location,
        },
      });
    }
  }, []);
};

export default useKakaoRedirect;
