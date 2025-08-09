import styled from '@emotion/styled';
import type { ToastListPosition } from '../../../../types/toast.type';

export const ToastList = styled.div<{ $position: ToastListPosition }>`
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
