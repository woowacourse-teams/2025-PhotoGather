import styled from '@emotion/styled';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const Wrapper = styled.div<{
  $visible: boolean;
  $type: string;
}>`
  pointer-events: auto;
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  max-width: ${({ theme }) =>
    `${parseInt(theme.layout.width, 10) - parseInt(theme.layout.padding.leftRight, 10)}px`};
  max-height: 100px;
  gap: 12px;
  background-color: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.8)};
  padding: 8px 12px;
  border-radius: 50px;
  align-items: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(20px)')};
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
`;

export const TimerContainer = styled.div<{ $type: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TextContainer = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.bodyRegular};
  white-space: pre-line;
`;
