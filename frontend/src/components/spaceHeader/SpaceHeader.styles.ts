import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const TitleIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.header01 })};
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })};
  color: ${({ theme }) => theme.colors.gray02};
`;

export const Icon = styled.button`
  width: 24px;
  height: 24px;
`;
