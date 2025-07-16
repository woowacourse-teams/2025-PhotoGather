import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div<{ $fontStyle: keyof Theme['typography'] }>`
  ${({ theme, $fontStyle }) => ({ ...theme.typography[$fontStyle] })}
  white-space: pre-line;
  text-align: center;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.gray06};
`;

export const HighLight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;
