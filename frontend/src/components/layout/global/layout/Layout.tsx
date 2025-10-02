import { Outlet, useMatches } from 'react-router-dom';
import OverlayProvider from '../../../../contexts/OverlayProvider';
import type { AppRouteObject } from '../../../../types/route.type';
import * as S from './Layout.styles';

const Layout = () => {
  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isHighlightPage = current?.handle?.highlight;

  return (
    <OverlayProvider>
      <S.Container $isHighlightPage={isHighlightPage}>
        <Outlet />
      </S.Container>
    </OverlayProvider>
  );
};

export default Layout;
