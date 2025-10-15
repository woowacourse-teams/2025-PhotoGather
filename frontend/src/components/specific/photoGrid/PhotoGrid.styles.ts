import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const glow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  max-height: 100%;
  overflow: hidden;
  gap: 4px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  object-fit: cover;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray01} 0%,
    ${({ theme }) => theme.colors.gray02} 50%,
    ${({ theme }) => theme.colors.gray01} 100%
  );
  background-size: 200% 100%;
  animation: ${glow} 1.5s ease-in-out infinite;
  color: transparent;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  overflow: hidden;

  &:active {
    opacity: 0.9;
  }
`;
