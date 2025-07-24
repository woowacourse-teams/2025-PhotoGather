import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom) * 2}px)`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: auto 0;
`;

export const Icon = styled.img`
  width: 120px;
  height: 120px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.bodyRegular })}
  color: ${({ theme }) => theme.colors.gray03};
`;

export const BottomContainer = styled.div`
  width: 100%;
  margin-top: auto;
`;
