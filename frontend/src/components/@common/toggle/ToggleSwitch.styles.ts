import styled from '@emotion/styled';
import type { ToggleSwitchSize } from './ToggleSwitch';

const sizeInfo = {
  small: {
    width: 32,
    height: 16,
  },
  medium: {
    width: 40,
    height: 20,
  },
  large: {
    width: 48,
    height: 24,
  },
};

export const Wrapper = styled.button<{ $size: ToggleSwitchSize }>`
    width: ${({ $size }) => sizeInfo[$size].width}px;
    height: ${({ $size }) => sizeInfo[$size].height}px;
    border: 1px solid black;
`;
