import { Outlet, useLocation } from 'react-router-dom';
import { HIGHLIGHT_PAGES } from '../../constants/routes';
import OverlayProvider from '../../contexts/OverlayProvider';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import * as S from './Layout.styles';
import { StarField } from './starField/StarField';

const Layout = () => {
  const { pathname } = useLocation();
  useGoogleAnalytics();

  const isHighlightPage = HIGHLIGHT_PAGES.includes(pathname);

  return (
    <OverlayProvider>
      <S.Container $isHighlightPage={isHighlightPage}>
        {isHighlightPage && <StarField />}
        <Outlet />
      </S.Container>
    </OverlayProvider>
  );
};

export default Layout;
