import styled from '@emotion/styled';

export const Container = styled.div<{ $isHighlightPage: boolean }>`
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
  padding: 0 16px;
  padding-top: 32px;
  padding-bottom: ${({ $isHighlightPage }) => ($isHighlightPage ? '0px' : '16px')};
  border: 1px solid #000;
  height: 100dvh;
  overflow: hidden;
  background: ${({ theme, $isHighlightPage }) =>
    $isHighlightPage
      ? `linear-gradient(180deg, ${theme.colors.gradient.start} 0%, ${theme.colors.gradient.end} 100%)`
      : theme.colors.white};
`;
