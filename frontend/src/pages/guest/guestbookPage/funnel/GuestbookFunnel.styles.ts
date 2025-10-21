import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: ${({ theme }) =>
    `calc(100dvh - ${parseInt(theme.layout.padding.topBottom, 10) * 2 + parseInt(theme.layout.headerHeight, 10)}px)`};
`;

export const DisplayInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const DisplayName = styled.p`
  color: ${({ theme }) => theme.colors.gray06};
  ${({ theme }) => ({
    ...theme.typography.header03,
  })}
`;
