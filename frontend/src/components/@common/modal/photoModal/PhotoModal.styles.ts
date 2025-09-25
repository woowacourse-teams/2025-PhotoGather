import styled from '@emotion/styled';
// biome-ignore format: 의도적으로 한 줄로 유지
import { DownloadIcon as SaveIcon, TrashCanIcon } from '../../../../@assets/icons';
import { theme } from '../../../../styles/theme';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: min(calc(100vw - 32px), 400px);
  max-height: 80vh;
  overflow: hidden;
  padding: 0 16px;

  @media (max-width: 480px) {
    gap: 16px;
    padding: 0 12px;
  }
`;

export const FromContainer = styled.div`
  display: flex;
  padding: 6px 12px;
  align-items: center;
  gap: 12px;
  border-radius: 50px;
  background: ${hexToRgba(theme.colors.gray06, 0.7)};
  color: ${({ theme }) => theme.colors.accent};
  ${({ theme }) => ({ ...theme.typography.bodyLarge })}
`;

export const FromMessage = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

export const PhotoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 320px;
  background: ${hexToRgba(theme.colors.gray03, 0.3)};
  backdrop-filter: blur(4px);
  overflow: visible;
`;

export const Photo = styled.img`
  width: auto;
  height: 320px;
  max-width: min(100%, 320px);
  max-height: min(100%, 320px);
  aspect-ratio: 1;
  object-fit: contain;
  -webkit-user-drag: none;
  touch-action: pinch-zoom;
  -webkit-touch-callout: none;
  &:active {
    opacity: 0.9;
  }
`;

export const LoadingPhoto = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray01};
`;

export const ButtonContainer = styled.div<{ $isManagerMode: boolean }>`
  display: flex;
  align-items: center;
  width: 106px;
  height: auto;
  justify-content: ${({ $isManagerMode }) => ($isManagerMode ? 'space-between' : 'center')};
`;

export const DeleteIcon = styled(TrashCanIcon)`
  width: 16px;
  color: ${({ theme }) => theme.colors.error};
  &:active {
    transform: scale(0.9);
  }
`;

export const DownloadIcon = styled(SaveIcon)`
  width: 16px;
  color: ${({ theme }) => theme.colors.white};
  &:active {
    transform: scale(0.9);
  }
`;

export const NavigationContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% + 32px);
  left: -16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.topActionButton};

  & > * {
    pointer-events: auto;
  }

  @media (max-width: 480px) {
    width: calc(100% + 12px);
    left: -6px;
  }
`;

export const NavigationButton = styled.button<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${hexToRgba(theme.colors.gray06, 0.8)};
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      background: ${hexToRgba(theme.colors.gray06, 0.8)};
      transform: none;
    }
  }
`;
