import styled from '@emotion/styled';

export const SubDescription = styled.p`
  ${({ theme }) => ({ ...theme.typography.captionSmall })}
  color: ${({ theme }) => theme.colors.gray04};
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
