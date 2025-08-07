import styled from '@emotion/styled';

export const InputFooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputCount = styled.p`
  color: ${({ theme }) => theme.colors.gray03};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
`;
