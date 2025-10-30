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

export const FooterContent = styled.div<{ $mode: FooterMode }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

export const Copyright = styled.p<{ $mode: FooterMode }>`
  font-size: 12px;
  color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.gray04 : theme.colors.gray04)};
  margin: 0;
`;

export const ContactLink = styled.a<{ $mode: FooterMode }>`
  font-size: 14px;
  color: ${({ theme, $mode }) => ($mode === 'dark' ? theme.colors.gray04 : theme.colors.gray04)};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
