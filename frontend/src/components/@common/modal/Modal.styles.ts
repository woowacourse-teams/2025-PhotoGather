import styled from '@emotion/styled';

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
