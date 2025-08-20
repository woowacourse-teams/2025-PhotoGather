import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const CreateSpaceButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  width: 132px;
  height: 28px;
  padding: 2px 12px;
  border-radius: 50px;
  background: rgba(43, 43, 43, 0.7);
  backdrop-filter: blur(2px);
`;

export const SpaceList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
  padding: 0 16px;
  width: 100%;
  height: 747px;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;
