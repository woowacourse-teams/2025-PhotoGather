import styled from '@emotion/styled';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    position: relative;
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
    z-index: ${({ theme }) => theme.zIndex.text};
`;

export const InfoHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const Title = styled.p`
    ${({ theme }) => ({ ...theme.typography.header01 })};
    color: ${({ theme }) => theme.colors.white};
    mix-blend-mode: difference;
`;

export const StartDate = styled.p`
    ${({ theme }) => ({ ...theme.typography.bodyLarge })};
    color: ${({ theme }) => theme.colors.gray01};
`;

export const SettingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  mix-blend-mode: overlay;
`;

export const SettingIcon = styled(SettingSvg)`
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.settingButton};
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
    z-index: ${({ theme }) => theme.zIndex.circlePattern};

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
  z-index: ${({ theme }) => theme.zIndex.imageGrid};
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
`;

export const ScrollableArea = styled.div`
  max-width: 366px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  background: linear-gradient(to bottom, transparent, white);
  z-index: ${({ theme }) => theme.zIndex.scrollableArea};
`;
