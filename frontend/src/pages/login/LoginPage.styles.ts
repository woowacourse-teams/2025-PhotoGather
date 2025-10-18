import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: ${({ theme }) => `calc(100dvh - ${parseInt(theme.layout.padding.topBottom, 10) * 2}px - ${theme.layout.footerHeight} - ${theme.layout.headerHeight})`};
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: 10%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const LoginDividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray02};
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const DividerLineContainer = styled.div`
  width: 80%;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

export const DividerLineText = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.gray03};
  text-align: center;
`;
