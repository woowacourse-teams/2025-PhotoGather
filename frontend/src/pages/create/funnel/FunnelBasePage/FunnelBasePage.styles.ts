import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 54px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Info = styled.p`
  color: ${({ theme }) => theme.colors.gray03};
`;
