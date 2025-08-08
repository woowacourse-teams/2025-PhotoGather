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
  max-width: 380px;
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 240px;
  min-height: 330px;
  aspect-ratio: 1;
  object-fit: contain;
`;

export const Photo = styled.img`
  display: block;
  min-width: 100px;
  min-height: 100px;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
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
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  overflow: hidden;
  &:active {
    opacity: 0.9;
  }
`;

export const ButtonContainer = styled.div<{ $isManagerMode: boolean }>`
  display: flex;
  flex-direction: row;
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
