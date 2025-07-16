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

export const Wrapper = styled.div<{ $ratio: number }>`
  aspect-ratio: ${({ $ratio }) => $ratio};
  background-size: cover;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(
    150deg,
    ${({ theme }) => theme.colors.grayBackground} 40%,
    ${({ theme }) => theme.colors.white} 50%,
    ${({ theme }) => theme.colors.grayBackground} 60%
  );
  background-size: 300%;
  animation: ${glow} 3s infinite linear;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;
