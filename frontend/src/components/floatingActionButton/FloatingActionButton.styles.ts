import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import type { FloatingActionButtonType } from './variant';

const color = {
  default: css`
    background-color: ${theme.colors.accent};
    color: ${theme.colors.gray06};

    &:active {
      background-color: ${theme.colors.darkAccent};
      color: ${theme.colors.gray06};
      box-shadow:
        0px 2px 3px 0px rgba(0, 0, 0, 0.25) inset,
        1px 1px 3px 0px #fff inset,
        5px 5px 5px 0px rgba(0, 0, 0, 0.25);
    }
  `,
  disabled: css`
    background-color: ${theme.colors.gray01};
    color: ${theme.colors.gray04};
    cursor: default;
  `,
};

export const Wrapper = styled.button<{ $variant: FloatingActionButtonType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  width: 100%;
  cursor: pointer;

  box-shadow:
    1px 1px 3px 0px #fff inset,
    5px 5px 5px 0px rgba(0, 0, 0, 0.25);

  ${({ $variant }) => color[$variant]}
  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}
`;
