import { ReactComponent as CameraIcon } from '@assets/icons/camera.svg';
import styled from '@emotion/styled';

export const Wrapper = styled.label`
  width: 100%;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary60};
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => ({ ...theme.typography.header03 })}
  opacity: 0.7;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
  cursor: pointer;
`;

export const Icon = styled(CameraIcon)<{ iconSize: number }>`
  width: ${({ iconSize }) => `${iconSize}px`};
  height: auto;
`;
