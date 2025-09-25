import styled from '@emotion/styled';

export const Wrapper = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: rotate(-90deg);
  }

  .donut-bg {
    stroke: ${({ theme }) => theme.colors.gray01};
  }

  .donut-progress {
    stroke: ${({ theme }) => theme.colors.primary60};
    transition: stroke-dashoffset 0.5s ease;
  }
`;

export const Label = styled.div`
  position: absolute;
  font-size: 1rem;
  ${({ theme }) => theme.typography.bodyRegular};
`;
