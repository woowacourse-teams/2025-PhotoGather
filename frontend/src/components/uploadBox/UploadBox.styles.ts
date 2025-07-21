import { ReactComponent as CameraIcon } from '@assets/icons/camera.svg';
import styled from '@emotion/styled';

export const Wrapper = styled.label<{ $isActive: boolean }>`
  width: 100%;
  cursor: pointer;
`;

export const Container = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary20};
  background-color: ${({ $isActive }) => ($isActive ? '#F0EBFCB3' : '#F0EBFC66')};
  ${({ theme }) => ({ ...theme.typography.header03 })}
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
`;

export const Icon = styled(CameraIcon)<{ $iconSize: number }>`
  width: ${({ $iconSize }) => `${$iconSize}px`};
  color: ${({ theme }) => theme.colors.primary20};
  height: auto;
`;
