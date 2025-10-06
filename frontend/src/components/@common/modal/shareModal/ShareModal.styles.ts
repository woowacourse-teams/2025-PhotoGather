import styled from '@emotion/styled';

export const ShareModalCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShareModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const ShareModalTitle = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}
  color: ${({ theme }) => theme.colors.gray06};
  text-align: center;
`;

export const ShareModalDescription = styled.p`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
  white-space: pre-wrap;
`;
