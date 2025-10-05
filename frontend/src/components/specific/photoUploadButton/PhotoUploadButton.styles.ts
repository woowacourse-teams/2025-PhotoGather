import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 60px;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.3)};
  z-index: 1000;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.8;

    &:active {
      scale: 0.95;
    }
  }
`;

export const FileInput = styled.input`
  display: none;
`;
