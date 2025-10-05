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
