import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => hexToRgba(theme.colors.overlay, 0.8)};
  backdrop-filter: blur(1.5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
