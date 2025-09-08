import styled from '@emotion/styled';

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => ({ ...theme.typography.header02 })}
`;

export const Caption = styled.p`
  color: ${({ theme }) => theme.colors.gray01};
  ${({ theme }) => ({ ...theme.typography.captionSmall })}
`;
