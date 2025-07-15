import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import type { CopyButtonVariant } from './variant';

const color = {
  filled: css`
    background-color: ${theme.colors.gray06};
    color: ${theme.colors.white};
    &:active {
      background-color: ${theme.colors.gray05};
    }
  `,
  outlined: css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray06};
    color: ${theme.colors.gray06};
    &:active {
      background-color: ${theme.colors.gray01};
      //TODO: 버튼 색상 변경 필요 (gray-bg)
    }
  `,
};

export const Wrapper = styled.button<{ $variant: CopyButtonVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  width: 100%;
  cursor: pointer;

  ${({ $variant }) => color[$variant]}
  ${({ theme }) => ({ ...theme.typography.buttonPrimary })}
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
