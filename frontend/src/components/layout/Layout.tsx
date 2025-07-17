import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import * as S from './Layout.styles';

const Layout = () => {
  const { pathname } = useLocation();

  const highlightPages: string[] = [ROUTES.GUEST.SPACE_HOME];
  const isHighlightPage = highlightPages.includes(pathname);

  return (
    <S.Container $isHighlightPage={isHighlightPage}>
      <Outlet />
    </S.Container>
  );
};

export default Layout;
