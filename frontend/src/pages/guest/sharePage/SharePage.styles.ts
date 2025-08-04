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
  /* justify-content: center; */
  gap: 32px;
  flex-grow: 1;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ShareLabel = styled.p`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })}
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

export const IconLabelButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
