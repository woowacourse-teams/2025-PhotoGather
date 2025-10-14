import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ProgressContainer = styled.div<{ $progressWidth: number }>`
  width: ${({ $progressWidth }) => `${$progressWidth}px`};
  height: 8px;
  background-color: #f5f5f5;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
`;

export const ProgressElement = styled.div<{ $progressBarScale: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary60};
  border-radius: 50px;
  transition: transform 0.3s ease;
  transform-origin: left;
  transform: scaleX(${({ $progressBarScale }) => $progressBarScale});
  z-index: 1;

  will-change: transform;
`;

type GlowVariant = 'start' | 'end' | 'progress';

export const GlowElement = styled.div<{
  $variant: GlowVariant;
  $glowElementPosition: number;
}>`
  position: absolute;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary10};
  filter: drop-shadow(0 0 7.56px #f0ebfc) drop-shadow(0 0 2.16px #f0ebfc)
    drop-shadow(0 0 1.08px #f0ebfc);
  pointer-events: none;
  z-index: 2;
  transition: transform 0.3s ease;
  transform-origin: left;
  transform: translateX(${({ $glowElementPosition }) => $glowElementPosition}px);

  will-change: transform;
`;
