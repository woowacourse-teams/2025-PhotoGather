import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { IconButtonVariant } from '../../../../types/button.type';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const IconContainerStyles = {
  default: (theme: Theme) => css`
    border: 1px solid ${theme.colors.gray02};
    background-color: ${theme.colors.white};
    `,
  danger: (theme: Theme) => css`
    background: ${hexToRgba(theme.colors.white, 0.7)};
  `,
  dark: (theme: Theme) => css`
    background: ${hexToRgba(theme.colors.grayBackground, 0.7)};
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

  ${({ $variant, theme }) => IconContainerStyles[$variant](theme)}
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
