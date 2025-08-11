import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom) * 2}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.header02 })}
`;

export const Icon = styled.img`
  width: 84px;
  height: 84px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const InfoTitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.header03 })}
`;

export const InfoDescription = styled.p`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })}
  color: ${({ theme }) => theme.colors.primary};
`;
