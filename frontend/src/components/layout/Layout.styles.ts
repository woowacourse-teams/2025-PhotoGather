import styled from '@emotion/styled';

export const Container = styled.div<{ $isHighlightPage: boolean }>`
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
    padding: 0 16px;
    padding-top: 32px;
    padding-bottom: ${({ $isHighlightPage }) =>
      $isHighlightPage ? '0px' : '16px'};
    border: 1px solid #000;
    height: 100dvh;
    overflow: hidden;
    box-sizing: border-box;
    background-color: ${({ theme, $isHighlightPage }) =>
      $isHighlightPage ? theme.colors.primary : theme.colors.white};
`;
