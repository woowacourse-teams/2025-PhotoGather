import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const InfoSection = styled.section`
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

export const TextSection = styled.section`
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

export const PhotoSection = styled.div``;

export const ButtonContainer = styled.div`
  max-width: 64px;
`;

export const ButtonElementContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const LineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Line = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray02};
`;
