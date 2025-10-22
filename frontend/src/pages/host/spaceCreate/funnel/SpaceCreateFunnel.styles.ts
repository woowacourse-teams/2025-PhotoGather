import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) =>
    `calc(100dvh - ${parseInt(theme.layout.padding.topBottom, 10) * 2 + parseInt(theme.layout.headerHeight, 10)}px)`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

export const TopContainer = styled.div`
  display: flex;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
