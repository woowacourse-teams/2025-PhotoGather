import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ButtonVariant } from '../../../../types/buttonTypes';

const buttonStyles = {
  primary: (theme: Theme) => `
      border-radius: 12px;
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};

      &:active {
        border-radius: 12px;
        background-color: ${theme.colors.primary};
        box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.60) inset;
      }

      &:disabled{
        pointer-events: none;
        border-radius: 12px;
        background-color: ${theme.colors.grayBackground};
        color: ${theme.colors.gray04};
      }
    `,

  secondary: (theme: Theme) => `
      border-radius: 12px;
      color: ${theme.colors.primary};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.primary};
      ${theme.typography.buttonSecondary}

      &:disabled{
        border-radius: 12px;
        pointer-events: none;
        color: ${theme.colors.gray04};
        background-color: ${theme.colors.grayBackground};
        border: 1px solid ${theme.colors.gray03};}
      
      &:active {
        border-radius: 12px;
        background-color: ${theme.colors.primary10};
        border: 1px solid ${theme.colors.primary};
      }

    `,

  tertiary: (theme: Theme) => `
      background-color: transparent;
      color: ${theme.colors.gray03};
      ${theme.typography.buttonTertiary}

      &:active {
        color: ${theme.colors.primary};
      }

      &:disabled{
        pointer-events: none;
        background-color: transparent;
        color: ${theme.colors.gray01};
      }
    `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
}>`
  width: 100%;
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}

  ${({ $variant, theme }) => buttonStyles[$variant](theme)}
`;
