import styled from '@emotion/styled';

export const ToastList = styled.div<{ $position: 'top' | 'bottom' }>`
  position: fixed;

  ${({ $position }) => ($position === 'top' ? 'top: 40px;' : 'bottom: 40px;')}

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: ${({ theme }) => theme.zIndex.toast};
  pointer-events: none;
`;
