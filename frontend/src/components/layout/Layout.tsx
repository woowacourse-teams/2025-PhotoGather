import { Outlet, useLocation } from 'react-router-dom';
import { HIGHLIGHT_PAGES, STAR_FIELD_PAGES } from '../../constants/routes';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import * as S from './Layout.styles';
import { StarField } from './starField/StarField';

const Layout = () => {
  const { pathname } = useLocation();
  useGoogleAnalytics();

  const isHighlightPage = HIGHLIGHT_PAGES.some((page) => {
    if (page === '/') return pathname === '/';
    return pathname.startsWith(page);
  });
  const isStarFieldPage = STAR_FIELD_PAGES.includes(pathname);

  return (
    <S.Container $isHighlightPage={isHighlightPage}>
      {isStarFieldPage && <StarField />}
      <Outlet />
    </S.Container>
  );
};

export default Layout;
