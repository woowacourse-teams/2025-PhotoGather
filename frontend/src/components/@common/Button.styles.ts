import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ButtonVariant } from './variant';

const buttonStyles = {
  primary: {
    enabled: (theme: Theme) => `
      border-radius: 12px;
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      border: none;

      &:active {
        border-radius: 12px;
        background: ${theme.colors.primary};
        box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.60) inset;
      }
    `,
    disabled: (theme: Theme) => `
      border-radius: 12px;
      background: ${theme.colors.gray01};
      color: ${theme.colors.gray04};
      border: none;
    `,
  },
  secondary: {
    enabled: (theme: Theme) => `
      border-radius: 12px;
      color: ${theme.colors.primary};
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.primary};

      &:active {
        border-radius: 12px;
        background: ${theme.colors.primary10}; 
        border: 1px solid ${theme.colors.primary};
      }
    `,
    disabled: (theme: Theme) => `
      border-radius: 12px;
      color: ${theme.colors.gray04};
      background: ${theme.colors.gray01};
      border: 1px solid ${theme.colors.gray03};
    `,
  },
  tertiary: {
    enabled: (theme: Theme) => `
      background: transparent;
      border: none;
      color: ${theme.colors.gray03};
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;

      &:active {
        color: ${theme.colors.primary};
      }
    `,
    disabled: (theme: Theme) => `
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      background: transparent;
      color: ${theme.colors.gray01};
      border: none;
    `,
  },
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $disabled: boolean;
}>`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}

  ${({ $variant, theme, $disabled }) => {
    const variantStyles = buttonStyles[$variant];
    const state = $disabled ? 'disabled' : 'enabled';

    return variantStyles[state](theme);
  }}
`;
