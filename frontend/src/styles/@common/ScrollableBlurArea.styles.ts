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
  height: 100px;
  pointer-events: none;
  ${({ $position, theme }) =>
    $position === 'top'
      ? `
  background: linear-gradient(
    to top,
    ${hexToRgba(theme.colors.white, 0)} 0%,
    ${hexToRgba(theme.colors.scrollableBlur.start, 0.5)} 50%,
    ${hexToRgba(theme.colors.scrollableBlur.end, 0.8)} 100%
  );
  `
      : `
     background: linear-gradient(
    to bottom,
    ${hexToRgba(theme.colors.white, 0)} 0%,
    ${hexToRgba(theme.colors.scrollableBlur.start, 0.5)} 50%,
    ${hexToRgba(theme.colors.scrollableBlur.end, 0.8)} 100%
  ); 
  `}

  z-index: ${({ theme }) => theme.zIndex.scrollableArea};
  opacity: ${({ $isHide }) => ($isHide ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;
