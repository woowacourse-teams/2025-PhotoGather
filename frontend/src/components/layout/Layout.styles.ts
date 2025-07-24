import styled from '@emotion/styled';

export const Container = styled.div<{ $isHighlightPage: boolean }>`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width};
  width: 100%;
  padding: ${({ theme }) => `${theme.layout.padding.topBottom} ${theme.layout.padding.leftRight}`};
  //border: 1px solid #000; // TODO: 개발 시 border 살리기 
  min-height: 100dvh;
  overflow: hidden;
  background: ${({ theme, $isHighlightPage }) =>
    $isHighlightPage
      ? `linear-gradient(180deg, ${theme.colors.gradient.start} 0%, ${theme.colors.gradient.end} 100%)`
      : theme.colors.white};
`;
