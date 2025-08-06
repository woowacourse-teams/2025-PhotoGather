import FilledStar from '@assets/icons/star-filled.svg';
import OutlinedStar from '@assets/icons/star-outlined.svg';
import styled from '@emotion/styled';

export const StarContainer = styled.div<{
  top: number;
  left: number;
  size: number;
  delay?: number;
  star?: 'outlined' | 'filled';
}>`
  position: fixed;
  top: ${({ top }) => `${top}%`};
  left: ${({ left }) => `${left}%`};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background: ${({ star }) => `
  url(${star === 'filled' ? FilledStar : OutlinedStar}) no-repeat center / contain
`};
  animation: spinAndScale 3s linear infinite;
  animation-delay: ${({ delay }) => `${delay || 0}s`};
  pointer-events: none;
  opacity: 0.8;

  @keyframes spinAndScale {
    0% {
      transform: rotate(0deg) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: rotate(40deg) scale(1.5);
      opacity: 1;
    }
    100% {
      transform: rotate(0deg) scale(1);
      opacity: 0.6;
    }
  }
`;
