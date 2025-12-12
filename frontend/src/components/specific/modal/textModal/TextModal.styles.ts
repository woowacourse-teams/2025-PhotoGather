import styled from '@emotion/styled';

export const TextModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const TextModalMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const TextConfirmComment = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const TextConfirmDescription = styled.p`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray04};
  white-space: pre-wrap;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;
