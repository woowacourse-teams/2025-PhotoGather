import styled from '@emotion/styled';
import { glow } from '../../../../animations/glow';

export const Wrapper = styled.div<{ $ratio: number; $width: string }>`
  aspect-ratio: ${({ $ratio }) => $ratio};
  width: ${({ $width }) => $width};
  background-size: cover;
  overflow: hidden;
  background: none;
  cursor: pointer;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
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
  overflow: hidden;
  &:active {
    opacity: 0.9;
  }
`;
