import { ReactComponent as SaveIcon } from '@assets/icons/download.svg';
import { ReactComponent as TrashCanIcon } from '@assets/icons/trash-can.svg';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid green;
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

export const Photo = styled.div`
  width: 100%;
  min-width: 240px;
  min-height: 330px;
  aspect-ratio: 1;
  background: url(<path-to-image>) lightgray 50% / contain no-repeat;
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
