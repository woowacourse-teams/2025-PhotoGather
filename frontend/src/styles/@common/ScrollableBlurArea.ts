import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

export const ScrollableBlurArea = styled.div<{
  $isHide: boolean;
  $position: 'top' | 'bottom';
}>`
  position: fixed;
  ${({ $position }) => $position === 'top' && 'top: 0;'}
  ${({ $position }) => $position === 'bottom' && 'bottom: 0;'}
  left: 50%;
  transform: translateX(-50%);
  width: ${({ theme }) => theme.layout.width};
  height: 40px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => hexToRgba(theme.colors.white, 0)} 0%,
    ${({ theme }) => hexToRgba(theme.colors.gradient.start, 0.2)} 30%,
    ${({ theme }) => hexToRgba(theme.colors.gradient.end, 0.6)} 100%
  );
  z-index: ${({ theme }) => theme.zIndex.scrollableArea};
  opacity: ${({ $isHide }) => ($isHide ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;
