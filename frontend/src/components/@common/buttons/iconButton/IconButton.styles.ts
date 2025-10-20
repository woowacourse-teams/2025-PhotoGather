import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { IconButtonSize, IconButtonVariant } from '../../../../types/button.type';

export const IconButtonSizes = {
  small: 20,
  medium: 28,
  large: 36,
};

export const IconButtonStyles = {
  default: (theme: Theme) => css`
    color: ${theme.colors.gray06};
    padding: 0;
    border-radius: 0;
    &:active {
      scale: 0.95;
    }
    &:disabled {
      pointer-events: none;
      color: ${theme.colors.gray03};
    }
  `,
  outline: (theme: Theme) => css`
    border: 1px solid ${theme.colors.gray02};
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray06};
  `,
  dark: (theme: Theme) => css`
    border-radius: 50%;
    background-color: ${theme.colors.gray06};
    color: ${theme.colors.white};
    svg {
      &:active {
        scale: 0.95;
      }
    }
  `,
  light: (theme: Theme) => css`
    border-radius: 50%;
    background-color: ${theme.colors.gray02};
    color: ${theme.colors.gray04};
    svg {
      &:active {
        scale: 0.95;
      }
    }
  `,

  kakao: () => css`
  border-radius: 50%;
  background-color: #fee500;
  color: #000000;

  &:hover {
    filter: brightness(0.97);
  }

  &:active {
    filter: brightness(0.93);
    scale: 0.95;
  }

  &:disabled {
    pointer-events: none;
    background-color: #f6f6f6;
    color: rgba(0, 0, 0, 0.4);
  }
`,
};

export const IconContainer = styled.button<{
  $variant: IconButtonVariant;
  $size: IconButtonSize;
}>`
  max-width: 44px;
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  padding: 10px;
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;

  svg {
    width: ${({ $size }) => IconButtonSizes[$size]}px;
    height: ${({ $size }) => IconButtonSizes[$size]}px;
  }

  ${({ $variant, theme }) => $variant && IconButtonStyles[$variant](theme)}
`;
