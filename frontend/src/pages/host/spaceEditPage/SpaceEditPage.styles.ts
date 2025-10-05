import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.header02};
  color: ${({ theme }) => theme.colors.gray06};
`;
