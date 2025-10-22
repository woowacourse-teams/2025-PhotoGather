import styled from '@emotion/styled';
import { Z_INDEX } from '../../../constants/constants';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Overlay = styled.div<{ $isPhotoExist: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme, $isPhotoExist }) =>
    $isPhotoExist ? 'none' : hexToRgba(theme.colors.gray06, 0.3)};
  width: 100%;
  max-width: 60px;
  max-height: 60px;
  height: 100%;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
    color: ${({ theme, $isPhotoExist }) =>
      $isPhotoExist ? hexToRgba(theme.colors.white, 0.5) : theme.colors.white};
    opacity: 0.8;

    &:active {
      scale: 0.95;
    }
  }
`;

export const OverlayButton = styled.div<{ $position: 'top' | 'bottom' }>`
  cursor: pointer;
  position: absolute;
  ${({ $position }) => ($position === 'top' ? 'top: 0;' : 'bottom: 0;')};
  right: -4px;
  width: 16px;
  height: 16px;
  background: ${({ theme }) => hexToRgba(theme.colors.white, 0.8)};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  z-index: ${Z_INDEX.PHOTO_PREVIEW.CLOSE_BUTTON};

  svg {
    width: 100%;
  }
`;
