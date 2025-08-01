import { ReactComponent as SaveIcon } from '@assets/icons/download.svg';
import { ReactComponent as TrashCanIcon } from '@assets/icons/trash-can.svg';
import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

export const Wrapper = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(2px);
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.7)};
  border-radius: 500px;
  max-width: ${({ theme }) => theme.layout.width};
  width: 100%;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeleteIcon = styled(TrashCanIcon)`
  width: 16px;
  color: ${({ theme }) => theme.colors.white};
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
