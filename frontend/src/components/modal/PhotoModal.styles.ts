import { ReactComponent as SaveIcon } from '@assets/icons/download.svg';
import { ReactComponent as TrashCanIcon } from '@assets/icons/trash-can.svg';
import styled from '@emotion/styled';
import { glow } from '../../animations/glow';
import { theme } from '../../styles/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: min(
    calc(100vw - 32px), 
    calc(${({ theme }) => theme.layout.width} - 32px)
  );
  max-height: 80vh;
  overflow: hidden;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
`;

export const Photo = styled.img`
  width: auto;
  height: auto;
  max-width: min(100%, 320px);
  max-height: min(100%, 480px);
  aspect-ratio: 1;
  object-fit: contain;
  background: linear-gradient(
    150deg,
    ${({ theme }) => theme.colors.gray06} 40%,
    ${({ theme }) => theme.colors.gray05} 50%,
    ${({ theme }) => theme.colors.gray06} 60%
  );
  background-size: 300%;
  animation: ${glow} 3s infinite linear;
  -webkit-user-drag: none;
  touch-action: pinch-zoom;
  -webkit-touch-callout: none;
  &:active {
    opacity: 0.9;
  }
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
