import styled from '@emotion/styled';

export const Container = styled.main<{ $isDarkPage: boolean }>`
  position: relative;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width};
  width: 100%;
  padding: ${({ theme }) => `${theme.layout.padding.topBottom} ${theme.layout.padding.leftRight}`};
  min-height: ${({ theme }) =>
    `calc(100dvh - ${theme.layout.headerHeight} - ${theme.layout.footerHeight})`};
  background: ${({ theme, $isDarkPage }) =>
    $isDarkPage ? theme.colors.black : theme.colors.background};
`;
