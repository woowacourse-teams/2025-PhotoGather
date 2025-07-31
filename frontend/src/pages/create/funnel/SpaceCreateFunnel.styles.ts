import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom) * 2}px)`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
`;
