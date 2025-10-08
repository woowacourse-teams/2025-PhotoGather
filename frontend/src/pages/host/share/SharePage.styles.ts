import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom, 10) * 2}px)`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
