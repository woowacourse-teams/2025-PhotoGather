import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
    padding: 32px 16px;
    padding-bottom: 16px;
    border: 1px solid #000;
    height: 100dvh;
    box-sizing: border-box;
`;

export default Layout;
