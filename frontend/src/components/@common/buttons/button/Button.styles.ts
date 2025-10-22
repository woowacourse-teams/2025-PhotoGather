import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ButtonVariant } from '../../../../types/button.type';

export const buttonStyles = {
  primary: (theme: Theme) => css`
    background-color: ${theme.colors.gray06};
    color: ${theme.colors.white};
    border-radius: 4px;

    &:active {
      background-color: ${theme.colors.gray06};
      box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.6) inset;
      color: ${theme.colors.gray02};
    }

    &:disabled {
      pointer-events: none;
      background-color: ${theme.colors.gray02};
      color: ${theme.colors.white};
    }
  `,

  secondary: (theme: Theme) => css`
    color: ${theme.colors.gray04};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray04};
    border-radius: 4px;

    &:disabled {
      pointer-events: none;
      color: ${theme.colors.gray03};
      background-color: ${theme.colors.gray01};
      border: 1px solid ${theme.colors.gray02};
      color: ${theme.colors.gray03};
    }

    &:active {
      background-color: ${theme.colors.gray01};
    }
  `,

  tertiary: (theme: Theme) => css`
    color: ${theme.colors.gray04};
    ${theme.typography.captionSmall};
  `,

  outline: (theme: Theme) => css`
    color: ${theme.colors.gray04};
    ${theme.typography.button};
    border-radius: 4px;
    border: solid 1px ${theme.colors.gray02};
  `,

  danger: (theme: Theme) => css`
    background-color: ${theme.colors.error};
    color: ${theme.colors.white};
    border-radius: 4px;
  `,

  error: (theme: Theme) => css`
    ${theme.typography.captionSmall}
    color: ${theme.colors.error};
    padding: 0;
    width: fit-content;

    &:disabled {
      pointer-events: none;
      color: ${theme.colors.gray03};
    }
  `,

  fit: (theme: Theme) => css`
    ${theme.typography.captionSmall}
    color: ${theme.colors.gray06};
    padding: 0;
    width: fit-content;

    &:disabled {
      pointer-events: none;
      color: ${theme.colors.gray03};
    }
  `,

  elevated: (theme: Theme) => css`
    border-radius: 4px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray06};
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.08);

    &:disabled {
      pointer-events: none;
      color: ${theme.colors.gray03};
      background-color: ${theme.colors.gray01};
      color: ${theme.colors.gray03};
    }

    &:active {
      background-color: ${theme.colors.gray01};
    }
  `,

  fixed: (theme: Theme) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: ${theme.layout.width};
    margin: 0 auto;
    background-color: ${theme.colors.gray06};
    color: ${theme.colors.white};

    &:active {
      background-color: ${theme.colors.gray06};
      box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.6) inset;
      color: ${theme.colors.gray02};
    }

    &:disabled {
      pointer-events: none;
      background-color: ${theme.colors.gray02};
      color: ${theme.colors.white};
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
  gap: 4px;
  white-space: nowrap;
  z-index: ${({ theme }) => theme.zIndex.fixedButton};

  ${({ theme }) => ({ ...theme.typography.button })}
  ${({ $variant, theme }) => buttonStyles[$variant](theme)}
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
