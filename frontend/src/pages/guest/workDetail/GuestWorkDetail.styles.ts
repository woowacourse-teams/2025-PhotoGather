import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight} - ${theme.layout.footerHeight})`};
  align-items: center;
`;

export const TextContainer = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const EmptyMessage = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ theme }) => theme.colors.gray04};
`;
