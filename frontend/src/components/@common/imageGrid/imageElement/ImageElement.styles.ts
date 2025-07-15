import styled from '@emotion/styled';

export const Wrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  cursor: pointer;
  background-size: cover;
  overflow: hidden;
`;

export const Image = styled.img<{ width: number; height: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
