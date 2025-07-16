import { Outlet } from 'react-router-dom';
import * as S from './Layout.styles';

const Layout = () => {
  // TODO : 라우터 상수 분리
  const highlightPage = ['/guest/space-home'];
  const isHighlightPage = highlightPage.includes(location.pathname);
  return (
    <S.Container $isHighlightPage={isHighlightPage}>
      <Outlet />
    </S.Container>
  );
};

export default Layout;
