import styled from '@emotion/styled';

export const Container = styled.div<{ $isHighlightPage: boolean }>`
  position: relative;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width};
  width: 100%;
  padding: ${({ theme }) => `${theme.layout.padding.topBottom} ${theme.layout.padding.leftRight}`};
  //border: 1px solid #000; // TODO: 개발 시 border 살리기
  min-height: 100dvh;
  background: ${({ theme, $isHighlightPage }) =>
    $isHighlightPage
      ? `linear-gradient(120deg, #0f0c29 0%, rgb(84, 26, 176) 45%, #24243e 80%);`
      : theme.colors.white};
`;
