import { Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import * as S from './Layout.styles';

const Layout = () => {
  const highlightPage = [ROUTES.GUEST.SPACE_HOME];
  const isHighlightPage = highlightPage.includes(location.pathname);
  return (
    <S.Container $isHighlightPage={isHighlightPage}>
      <Outlet />
    </S.Container>
  );
};

export default Layout;
