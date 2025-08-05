import styled from '@emotion/styled';

export const ToastList = styled.div`
  position: fixed;
  bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: ${({ theme }) => theme.zIndex.toast};
  pointer-events: none;
`;
