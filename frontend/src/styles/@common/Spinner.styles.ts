import { css, keyframes, type Theme } from '@emotion/react';
import styled from '@emotion/styled';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinnerStyles = {
  default: (theme: Theme) => css`
    border: 4px solid ${theme.colors.gray02};
    border-top: 4px solid ${theme.colors.white};
  `,
  dark: (theme: Theme) => css`
    border: 4px solid ${theme.colors.black};
    border-top: 4px solid ${theme.colors.white};
  `,
};

export const Spinner = styled.div<{ $variant?: keyof typeof spinnerStyles }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  ${({ $variant = 'default', theme }) => spinnerStyles[$variant](theme)}
`;
