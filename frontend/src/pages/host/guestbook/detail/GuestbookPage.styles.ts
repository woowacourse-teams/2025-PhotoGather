import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InfoTitle = styled.h1`
  ${({ theme }) => theme.typography.header03};
`;

export const InfoDescription = styled.p`
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.gray03};
`;

export const IconInfoContainer = styled.div`
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.gray03};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px;
  gap: 40px;
`;

export const Text = styled.p`
  ${({ theme }) => theme.typography.bodyWideLineHeight}
  white-space: pre-wrap;
`;

export const SenderText = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}
  text-align: end;
`;
