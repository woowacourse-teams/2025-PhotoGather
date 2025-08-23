import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: ${({ theme }) =>
    `${parseInt(theme.layout.width) - parseInt(theme.layout.padding.leftRight) * 8}px`};
  height: 8px;
  background-color: #f5f5f5;
  border-radius: 50px;
  position: relative;
  overflow: visible;
`;

export const ProgressElement = styled.div<{ $percentage: number }>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 80%;
  width: ${({ $percentage }) => Math.min(Math.max($percentage, 0), 100)}%;
  background-color: ${({ theme }) => theme.colors.primary60};
  border-radius: 50px;
  transition: width 0.3s ease;
  z-index: 1;
`;

type GlowVariant = 'start' | 'end' | 'progress';

export const GlowElement = styled.div<{
  $variant: GlowVariant;
  $percentage?: number;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${16}px;
  height: ${16}px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary10};
  box-shadow:
    0 0 7.56px 0 #f0ebfc,
    0 0 2.16px 0 #f0ebfc,
    0 0 1.08px 0 #f0ebfc;
  pointer-events: none;
  z-index: 2;
  transition: left 0.3s ease;

  left: ${({ $variant, $percentage }) => {
    if ($variant === 'start') return '0';
    if ($variant === 'end') return `calc(100% - ${16}px)`;
    const p = Math.min(Math.max($percentage ?? 0, 0), 100);
    return `clamp(0px, calc(${p}% - ${16 / 2}px), calc(100% - ${16}px))`;
  }};
`;
