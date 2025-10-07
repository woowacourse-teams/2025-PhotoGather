import styled from '@emotion/styled';

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}
  color: ${({ theme }) => theme.colors.gray06};
  text-align: center;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
  white-space: pre-wrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;
