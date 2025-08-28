import defaultProfile from '@assets/images/default_profile.png';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { authService } from '../../apis/services/auth.service';
import { ROUTES } from '../../constants/routes';
import OverlayProvider from '../../contexts/OverlayProvider';
import useError from '../../hooks/@common/useError';
import useInAppRedirect from '../../hooks/@common/useInAppRedirect';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import type { MyInfo } from '../../types/api.type';
import type { AppRouteObject } from '../../types/route.type';
import Header from './global/header/Header';
import * as S from './Layout.styles';
import { StarField } from './starField/StarField';

const Layout = () => {
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { tryFetch } = useError();
  const location = useLocation().pathname;
  const { redirectToExternalBrowser } = useInAppRedirect();
  const navigate = useNavigate();

  useGoogleAnalytics();

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isHighlightPage = current?.handle?.highlight;
  const isStarFieldPage = current?.handle?.starField;
  const isHeaderExistPage = current?.handle?.header;
  const isInAppBrowserAllowPage = current?.handle?.isInAppBrowserAllow;

  const targetUrl = `${process.env.DOMAIN}${location}`;

  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    if (isInAppBrowserAllowPage) return;
    navigate(ROUTES.IN_APP_BROWSER, { state: { targetUrl } });
    redirectToExternalBrowser(targetUrl);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: tryFetch를 dependency에 추가하면 무한 루프 발생
  useEffect(() => {
    const fetchAuthStatus = async () => {
      setIsLoading(true);
      const result = await tryFetch({
        task: async () => {
          const response = await authService.status();
          return response.data;
        },
        errorActions: [],
        onFinally: () => setIsLoading(false),
        useCommonCodeErrorHandler: false,
      });
      setMyInfo(result.data ? result.data : null);
    };
    fetchAuthStatus();
  }, []);

  return (
    <OverlayProvider>
      <S.Container $isHighlightPage={isHighlightPage}>
        {isHeaderExistPage && (
          <Header
            profileImageSrc={myInfo?.pictureUrl || defaultProfile}
            isLoggedIn={!!myInfo}
            isLoading={isLoading}
          />
        )}
        {isStarFieldPage && <StarField />}
        <Outlet />
      </S.Container>
    </OverlayProvider>
  );
};

export default Layout;
