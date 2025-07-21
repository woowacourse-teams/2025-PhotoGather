import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// 왼쪽에서 오른쪽으로 scale 증가
const fillAnimation = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

// 오른쪽에서 왼쪽으로 scale 감소
const emptyAnimation = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressElement = styled.div<{
  $isFilled: boolean;
  $shouldAnimate: boolean;
}>`
  position: relative;
  flex: 1;
  height: 5px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.gray01};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary60};
    border-radius: 20px;
    transform: scaleX(${({ $isFilled }) => ($isFilled ? 1 : 0)});
    transform-origin: left;
    animation: ${({ $shouldAnimate, $isFilled }) =>
      $shouldAnimate
        ? css`${$isFilled ? fillAnimation : emptyAnimation} 0.5s forwards`
        : 'none'};
  }
`;
