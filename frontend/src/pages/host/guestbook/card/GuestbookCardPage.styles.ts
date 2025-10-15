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
  min-height: 24px;
`;

export const MessageSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px;
  gap: 40px;
`;

export const Message = styled.p`
  ${({ theme }) => theme.typography.bodyWideLineHeight};
  white-space: pre-wrap;
`;

export const PhotoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: center;
`;

export const PhotoContainer = styled.div``;

export const ButtonElementContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 50%;
  transition: background-color 0.1s;
  &:active {
    background-color: ${({ theme }) => theme.colors.gray02};
  }
`;
