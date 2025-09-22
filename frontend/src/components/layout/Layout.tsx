import { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { DefaultProfileImg as defaultProfile } from '../../@assets/images';
import { authService } from '../../apis/services/auth.service';
import OverlayProvider from '../../contexts/OverlayProvider';
import useInAppRedirect from '../../hooks/@common/useInAppRedirect';
import useTaskHandler from '../../hooks/@common/useTaskHandler';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import type { MyInfo } from '../../types/api.type';
import type { AppRouteObject } from '../../types/route.type';
import Header from './global/header/Header';
import * as S from './Layout.styles';
import { StarField } from './starField/StarField';

const Layout = () => {
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const { loadingState, tryFetch } = useTaskHandler();
  const location = useLocation().pathname;
  const { redirectToExternalBrowser } = useInAppRedirect();

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
    redirectToExternalBrowser(targetUrl);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: tryFetch를 dependency에 추가하면 무한 루프 발생
  useEffect(() => {
    const fetchAuthStatus = async () => {
      const result = await tryFetch({
        task: async () => {
          const response = await authService.status();
          return response.data;
        },
        errorActions: [],
        loadingStateKey: 'auth',
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
            isLoading={loadingState.auth === 'loading'}
          />
        )}
        {isStarFieldPage && <StarField />}
        <Outlet />
      </S.Container>
    </OverlayProvider>
  );
};

export default Layout;
