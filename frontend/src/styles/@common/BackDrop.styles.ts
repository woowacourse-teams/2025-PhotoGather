import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

export const BackDrop = styled.div`
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
  z-index: ${({ theme }) => theme.zIndex.backdrop};
`;

export const ImageGridBackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: ${({ theme }) => hexToRgba(theme.colors.overlay, 0.7)};
  backdrop-filter: blur(1.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.backdrop};
`;

export const BackDropContainer = styled.div`
  width: auto;
  z-index: ${({ theme }) => theme.zIndex.backdropContainer};
`;
