import styled from '@emotion/styled';

export const DeleteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const DeleteModalMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DeleteConfirmComment = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const DeleteConfirmDescription = styled.p`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.error};
  white-space: pre-wrap;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;
