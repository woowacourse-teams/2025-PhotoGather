import styled from '@emotion/styled';
import type { ToggleSwitchSize } from './ToggleSwitch';

const sizeInfo = {
  small: {
    width: 32,
    height: 16,
    padding: 2,
  },
  medium: {
    width: 40,
    height: 20,
    padding: 2,
  },
  large: {
    width: 48,
    height: 24,
    padding: 3,
  },
};

export const Wrapper = styled.button<{
  $size: ToggleSwitchSize;
  $isToggle: boolean;
}>`
  display: flex;
  align-items: center;
  width: ${({ $size }) => sizeInfo[$size].width}px;
  height: ${({ $size }) => sizeInfo[$size].height}px;
  border-radius: 50px;
  background-color: ${({ $isToggle, theme }) =>
    $isToggle ? theme.colors.primary : theme.colors.gray01};
  padding: ${({ $size }) => sizeInfo[$size].padding}px;
  /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25); */
  transition: background-color 0.3s;
`;

export const Thumb = styled.div<{
  $size: ToggleSwitchSize;
  $isToggle: boolean;
}>`
  width: ${({ $size }) => sizeInfo[$size].height - sizeInfo[$size].padding * 2}px;
  height: ${({ $size }) => sizeInfo[$size].height - sizeInfo[$size].padding * 2}px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  transform: translateX(
    ${({ $size, $isToggle }) => ($isToggle ? sizeInfo[$size].width - sizeInfo[$size].height : 0)}px
  );
  /* box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.25); */
  transition: transform 0.3s;
  padding: 2px;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
