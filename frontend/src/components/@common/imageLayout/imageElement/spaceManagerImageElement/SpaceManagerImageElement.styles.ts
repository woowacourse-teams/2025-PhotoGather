import { ReactComponent as RoundCheckIcon } from '@assets/icons/round-check.svg';
import styled from '@emotion/styled';
import { hexToRgba } from '../../../../../utils/hexToRgba';

export const Overlay = styled.div<{ $isSelected: boolean }>`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? hexToRgba(theme.colors.gray06, 0.5) : 'none'};
`;

export const SelectedMark = styled(RoundCheckIcon)`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 17%;
  color: ${({ theme }) => theme.colors.accent};
  z-index: ${({ theme }) => theme.zIndex.overlayIcon};
`;
