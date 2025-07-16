import styled from '@emotion/styled';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';

// TODO : z-index 변수 처리
// TODO : max-width 상수 처리
export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
`;

export const TitleSectionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 60px;
`;

export const InfoHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const Title = styled.p`
    ${({ theme }) => ({ ...theme.typography.header01 })};
    color: ${({ theme }) => theme.colors.white};
`;

export const StartDate = styled.p`
    ${({ theme }) => ({ ...theme.typography.bodyLarge })};
    color: ${({ theme }) => theme.colors.gray01};
`;

export const SettingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SettingIcon = styled(SettingSvg)`
    position: relative;
    z-index: 2;
`;

export const CirclePattern = styled.div<{
  $size: number;
  $position?: { top?: number; left?: number; bottom?: number; right?: number };
}>`
    width: ${({ $size }) => $size}px;
    aspect-ratio: 1/1;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.lightAccent};
    z-index: 0;

    position: absolute;
    top: ${({ $position }) => $position?.top}px;
    left: ${({ $position }) => $position?.left}px;
    bottom: ${({ $position }) => $position?.bottom}px;
    right: ${({ $position }) => $position?.right}px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px 12px 0 0;
  min-height: 340px;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

export const ScrollableArea = styled.div`
  max-width: 400px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  background: linear-gradient(to bottom, transparent, white);
`;
