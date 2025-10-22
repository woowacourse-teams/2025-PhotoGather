import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: ${({ theme }) => theme.layout.width};
  height: 100dvh;
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HamburgerBackdrop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => hexToRgba(theme.colors.black, 0.8)};
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
`;

export const HamburgerBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-left: auto;
`;

export const ItemContainer = styled(motion.ul)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray02};
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Item = styled(motion.li)`
  ${({ theme }) => ({
    ...theme.typography.bodyLarge,
  })}
  color: ${({ theme }) => theme.colors.gray06};
`;
