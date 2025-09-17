import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { IconLabelButtonVariant } from '../../../../types/button.type';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const IconLabelButtonStyles = {
  default: (theme: Theme) => css`
    color: ${theme.colors.white};
    padding: 0;
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
  danger: (theme: Theme) => css`
    background: ${hexToRgba(theme.colors.white, 0.7)};
    color: ${theme.colors.error};
  `,
  dark: (theme: Theme) => css`
    background: ${hexToRgba(theme.colors.gray06, 0.7)};
    color: ${theme.colors.white};
  `,
};

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const IconContainer = styled.button<{
  $variant: IconLabelButtonVariant;
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

  ${({ $variant, theme }) => $variant && IconLabelButtonStyles[$variant](theme)}
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray04};
  ${({ theme }) => ({ ...theme.typography.captionSmall })}
`;
