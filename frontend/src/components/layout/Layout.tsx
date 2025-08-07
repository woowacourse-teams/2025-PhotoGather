import { Outlet, useLocation } from 'react-router-dom';
import { HIGHLIGHT_PAGES } from '../../constants/routes';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import * as S from './Layout.styles';

const Layout = () => {
  const { pathname } = useLocation();
  useGoogleAnalytics();

  const isHighlightPage = HIGHLIGHT_PAGES.includes(pathname);

  return (
    <S.Container $isHighlightPage={isHighlightPage}>
      <Outlet />
    </S.Container>
  );
};

export default Layout;
