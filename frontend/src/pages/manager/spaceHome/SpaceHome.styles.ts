import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  z-index: ${({ theme }) => theme.zIndex.text};
`;

export const DownloadButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
`;

export const ImageGridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ScrollableArea = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ theme }) => theme.layout.width};
  height: 40px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => hexToRgba(theme.colors.white, 0)} 0%,
    ${({ theme }) => hexToRgba(theme.colors.gradient.start, 0.2)} 30%,
    ${({ theme }) => hexToRgba(theme.colors.gradient.end, 0.6)} 100%
  );
  z-index: ${({ theme }) => theme.zIndex.scrollableArea};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const IntersectionArea = styled.div`
  width: 0;
  height: 0;
  overflow: hidden;
`;

export const TopButtonContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(calc(-50% + 114px));
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`;
