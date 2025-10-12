import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const glow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

export const WorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleRowContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const TitleContainer = styled.h1`
  ${({ theme }) => theme.typography.header01}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const CategoryContainer = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
`;

export const DesignerContainer = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}
`;

export const DescriptionContainer = styled.p`
  ${({ theme }) => theme.typography.captionSmall}
  white-space: pre-line;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: auto;
  min-height: 200px;
  display: block;
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

  &::before {
    content: '';
    display: block;
  }

  &::after {
    content: '';
    display: block;
  }

  &:active {
    opacity: 0.9;
  }
`;
