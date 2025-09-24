import styled from '@emotion/styled';
import { theme } from '../../../../styles/theme';

export const BottomNavigatorContainer = styled.div`
  max-width: 100%;
  position: fixed;
  padding: 0 24px;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.layout.width};
  justify-content: right;
  align-items: end;
  gap: 12px;
  pointer-events: none;
`;

export const TopButtonContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
  pointer-events: auto;

  @media screen and (max-width: ${theme.breakpoints.mobile}) {
    transform: translateX(calc(-50% + 140px));
  }
`;

export const DownloadButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
`;
