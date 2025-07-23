import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom) * 2}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.header01 })};
`;

export const Icon = styled.img`
  width: 120px;
  height: 120px;
`;
