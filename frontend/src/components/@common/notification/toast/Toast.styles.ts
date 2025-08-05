import { ReactComponent as InfoIcon } from '@assets/icons/info.svg';
import styled from '@emotion/styled';
import type { ToastPositionType } from '../../../../types/toast.type';

export const Wrapper = styled.div<{
  position: ToastPositionType;
  visible: boolean;
}>`
  pointer-events: auto;
  z-index: ${({ theme }) => theme.zIndex.toast};
  ${({ position }) => (position === 'top' ? 'top: 20px;' : 'bottom: 20px;')}
  display: flex;
  max-width: ${({ theme }) =>
    `${parseInt(theme.layout.width) - parseInt(theme.layout.padding.leftRight)}px`};
  max-height: 100px;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.gray06};
  padding: 8px 12px;
  border-radius: 50px;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export const TimerContainer = styled.div<{ type: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  width: 18px;
`;

export const TextContainer = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.captionSmall};
`;

export const Icon = styled(InfoIcon)<{ type: string }>`
  width: 100%;
  height: 100%;
  & circle {
    fill: ${({ theme, type }) => (type === 'error' ? theme.colors.lightError : theme.colors.darkAccent)};
  }

  & path {
    fill: ${({ theme }) => theme.colors.gray06};
  }
`;
