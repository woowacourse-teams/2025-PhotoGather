import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom) * 2}px)`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`;

export const TopContainer = styled.div`
  display: flex;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

export const UnderBar = styled.div`
  width: 18px;
  height: 3px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.gray01};
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
`;
