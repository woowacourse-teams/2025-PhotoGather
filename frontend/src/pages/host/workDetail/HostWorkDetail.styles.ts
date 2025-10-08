import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight})`};
`;

export const EditButton = styled.button`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray02};
  align-self: flex-end;
  display: block;
  margin-left: auto;
  margin-bottom: 3px;
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

export const BottomSectionContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
`;
