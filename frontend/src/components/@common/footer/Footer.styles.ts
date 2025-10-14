import styled from '@emotion/styled';
import type { FooterMode } from '../../../types/uiMode.type';

export const Footer = styled.footer<{ $mode: FooterMode }>`
  max-width: ${({ theme }) => theme.layout.width};
  margin: auto auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.layout.footerHeight};
  width: 100%;

  background-color: ${({ theme, $mode }) =>
    $mode === 'dark' ? theme.colors.black : theme.colors.background};
`;
