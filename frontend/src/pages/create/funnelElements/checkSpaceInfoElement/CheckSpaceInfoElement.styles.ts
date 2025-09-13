import styled from '@emotion/styled';

export const TitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.header02 })};
`;
