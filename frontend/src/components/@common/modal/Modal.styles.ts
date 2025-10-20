import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';
import { hexToRgba } from '../../../utils/hexToRgba';

export const ModalSize = {
  mobile: 240,
  small: 320,
  medium: 480,
  large: 600,
};

export const ModalContent = styled.div<{
  $size: keyof typeof ModalSize;
}>`
  min-height: 216px;
  width: 100%;
  max-width: min(${({ $size }) => ModalSize[$size]}px, 90vw);
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px 32px;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray06};
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => hexToRgba(theme.colors.black, 0.8)};
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
`;

export const CloseButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 50%;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray03};
  }
`;
