import { ReactComponent as MenuIcon } from '@assets/icons/menu.svg';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  justify-content: end;
  display: flex;
  flex-direction: row-reverse;
`;

export const MenuButton = styled(MenuIcon)`
  cursor: pointer;
  width: 24px;
  height: 24px;

  &:hover {
    opacity: 0.8;
  }
`;
