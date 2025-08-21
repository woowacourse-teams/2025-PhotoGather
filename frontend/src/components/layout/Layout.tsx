import { Outlet, useMatches } from 'react-router-dom';
import OverlayProvider from '../../contexts/OverlayProvider';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import type { AppRouteObject } from '../../types/route.type';
import Header from './global/header/Header';
import * as S from './Layout.styles';
import { StarField } from './starField/StarField';

const Layout = () => {
  useGoogleAnalytics();

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isHighlightPage = current?.handle?.highlight;
  const isStarFieldPage = current?.handle?.starField;
  const isHeaderExistPage = current?.handle?.header;

  // TODO: 기능 구현 후 제거
  const MOCK_PROFILE_IMAGE_SRC =
    'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800';

  return (
    <OverlayProvider>
      <S.Container $isHighlightPage={isHighlightPage}>
        {isHeaderExistPage && (
          <Header profileImageSrc={MOCK_PROFILE_IMAGE_SRC} />
        )}
        {isStarFieldPage && <StarField />}
        <Outlet />
      </S.Container>
    </OverlayProvider>
  );
};

export default Layout;
