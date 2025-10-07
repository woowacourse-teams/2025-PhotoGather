import styled from '@emotion/styled';

export const ToastList = styled.div`
  position: fixed;
  top: 50px;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: ${({ theme }) => theme.zIndex.toast};
  pointer-events: none;
`;
