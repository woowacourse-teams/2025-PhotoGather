import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight})`};
  align-items: center;
`;

export const TextContainer = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
`;
