import styled from '@emotion/styled';
import type { HeaderMode } from '../../../types/header.type';

export const HeaderContainer = styled.header<{ $mode: HeaderMode }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ theme }) => theme.layout.width};
  width: 100%;
  height: 60px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.padding.leftRight};
  background-color: ${({ theme, $mode }) =>
    $mode === 'dark' ? theme.colors.black : theme.colors.background};
`;

export const Logo = styled.div<{ $mode: HeaderMode }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    path {
      fill: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.white : theme.colors.black)};
    }
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const IconButton = styled.button<{ $mode: HeaderMode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.white : theme.colors.black)};
  transition: opacity 0.2s;

  svg {
    width: 24px;
    height: 24px;
  }

  &:active {
    scale: 0.95;
  }
`;
