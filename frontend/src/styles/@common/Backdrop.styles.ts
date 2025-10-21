import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => hexToRgba(theme.colors.black, 0.8)};
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
`;
