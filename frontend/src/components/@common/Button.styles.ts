import styled from '@emotion/styled';
import type { ButtonVariant } from './variant';

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  disabled: boolean;
}>`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font-weight: ${({ theme }) => theme.typography.buttonPrimary.fontWeight};
  font-size: ${({ theme }) => theme.typography.buttonPrimary.fontSize};
  line-height: ${({ theme }) => theme.typography.buttonPrimary.lineHeight};

  ${({ variant, theme, disabled }) =>
    variant === 'primary' &&
    !disabled &&
    `
    border-radius: 12px;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;

    &:active {
      border-radius: 12px;
      background: ${theme.colors.primary};
      box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.60) inset;
    }
  `}

  ${({ variant, theme, disabled }) =>
    variant === 'primary' &&
    disabled &&
    `
    border-radius: 12px;
    background: ${theme.colors.gray01};
    color: ${theme.colors.gray04};
    border: none;
  `}

  ${({ variant, theme, disabled }) =>
    variant === 'secondary' &&
    !disabled &&
    `
    border-radius: 12px;
    color: ${theme.colors.primary};
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};

    &:active {
      border-radius: 12px;
      background: ${theme.colors.primary10}; 
      border: 1px solid ${theme.colors.primary};
    }
  `}

  ${({ variant, theme, disabled }) =>
    variant === 'secondary' &&
    disabled &&
    `
    border-radius: 12px;
    color: ${theme.colors.gray04};
    background: ${theme.colors.gray01};
    border: 1px solid ${theme.colors.gray03};
  `}

  ${({ variant, theme, disabled }) =>
    variant === 'tertiary' &&
    !disabled &&
    `
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
  `}

  ${({ variant, theme, disabled }) =>
    variant === 'tertiary' &&
    disabled &&
    `
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    background: transparent;
    color: ${theme.colors.gray01};
    border: none;
  `}
`;
