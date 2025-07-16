import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { CopyButtonVariant } from '../../../../types/buttonTypes';

const color = (theme: Theme) => ({
  filled: css`
    background-color: ${theme.colors.gray06};
    color: ${theme.colors.white};
  `,
  outlined: css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray06};
    color: ${theme.colors.gray06};
  `,
});

const active = (theme: Theme) => ({
  filled: css`
    background-color: ${theme.colors.gray05};
  `,
  outlined: css`
    background-color: ${theme.colors.grayBackground};
  `,
});

export const Wrapper = styled.button<{ $variant: CopyButtonVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 50px;
  width: 100%;

  ${({ theme, $variant }) => color(theme)[$variant]}
  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}
  &:active {
    ${({ theme, $variant }) => active(theme)[$variant]}
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
