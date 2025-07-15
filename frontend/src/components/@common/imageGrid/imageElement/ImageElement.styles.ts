import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const glow = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 300%;
  }
`;

export const Wrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-size: cover;
  overflow: hidden;
`;

export const Image = styled.img<{ width: number; height: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(150deg, ${({ theme }) => theme.colors.grayBg} 40%, ${({ theme }) => theme.colors.white} 50%, ${({ theme }) => theme.colors.grayBg} 60%);
  background-size: 300%;
  animation: ${glow} 3s infinite linear;
`;
