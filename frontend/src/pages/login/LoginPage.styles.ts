import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom) * 2}px)`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  margin: auto 0;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: auto;
`;

export const LoginImage = styled.img`
  width: 150px;
  height: 150px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const LoginLabel = styled.p`
  ${({ theme }) => theme.typography.header03};
  color: ${({ theme }) => theme.colors.gray03};
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;
