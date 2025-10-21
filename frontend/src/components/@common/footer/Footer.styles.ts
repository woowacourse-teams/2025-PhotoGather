import styled from '@emotion/styled';
import type { FooterMode } from '../../../types/uiMode.type';

export const Footer = styled.footer<{ $mode: FooterMode }>`
  max-width: ${({ theme }) => theme.layout.width};
  margin: auto auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.layout.footerHeight};
  width: 100%;
  gap: 16px;

  background-color: ${({ theme, $mode }) =>
    $mode === 'dark' ? theme.colors.black : theme.colors.background};
`;
