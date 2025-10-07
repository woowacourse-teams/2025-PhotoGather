import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { IconButtonVariant } from '../../../../types/button.type';

export const IconButtonStyles = {
  default: (theme: Theme) => css`
    color: ${theme.colors.gray06};
    padding: 0;
    border-radius: 0;
    &:active {
      scale: 0.95;
    }
    &:disabled {
      color: ${theme.colors.gray04};
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
      &:active{
        scale: 0.95
      }
    }
  `,
};

export const IconContainer = styled.button<{
  $variant: IconButtonVariant;
}>`
  max-width: 44px;
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
    width: 28px;
    height: 28px;
  }

  ${({ $variant, theme }) => $variant && IconButtonStyles[$variant](theme)}
`;
