import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

const glow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

interface SkeletonBoxProps {
  $width?: string;
  $height?: string;
  $radius?: string;
}

export const SkeletonBox = styled.div<SkeletonBoxProps>`
  width: ${({ $width: width = '100%' }) => width};
  height: ${({ $height: height = '1rem' }) => height};
  border-radius: ${({ $radius: radius = '1rem' }) => radius};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray02} 0%,
    ${({ theme }) => hexToRgba(theme.colors.gray02, 0.5)} 25%,
    ${({ theme }) => theme.colors.gray02} 50%,
    ${({ theme }) => hexToRgba(theme.colors.gray02, 0.5)} 75%,
    ${({ theme }) => theme.colors.gray02} 100%
  );
  background-size: 200% 100%;
  animation: ${glow} 1.5s ease-in-out infinite;
`;
