import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { FloatingActionButtonType } from './variant';

const color = (theme: Theme) => ({
  default: css`
    background-color: ${theme.colors.accent};
    color: ${theme.colors.gray06};
  `,
  disabled: css`
    background-color: ${theme.colors.grayBackground};
    color: ${theme.colors.gray04};
  `,
});

const active = (theme: Theme) => css`
  background-color: ${theme.colors.darkAccent};
  color: ${theme.colors.gray06};
  box-shadow:
    0px 2px 3px 0px rgba(0, 0, 0, 0.25) inset,
    1px 1px 3px 0px #fff inset,
    5px 5px 5px 0px rgba(0, 0, 0, 0.25);
`;

export const Wrapper = styled.button<{ $variant: FloatingActionButtonType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 50px;

  box-shadow:
    1px 1px 3px 0px #fff inset,
    5px 5px 5px 0px rgba(0, 0, 0, 0.25);

  ${({ theme, $variant }) => color(theme)[$variant]}
  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}
  ${({ theme, $variant }) =>
    $variant !== 'disabled' &&
    css`
      &:active {
        ${active(theme)}
      }
    `}
`;
