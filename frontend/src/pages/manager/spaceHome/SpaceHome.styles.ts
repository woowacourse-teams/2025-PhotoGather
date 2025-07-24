import styled from '@emotion/styled';
import { ReactComponent as GiftIcon } from '../../../@assets/icons/gift.svg';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) => `calc(100vh - ${parseInt(theme.layout.padding.topBottom)}*2px)`};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  z-index: ${({ theme }) => theme.zIndex.text};
`;

export const DownloadButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
`;

export const ImageGridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const IntersectionArea = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.layout.padding.topBottom};
`;

export const TopButtonContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(calc(-50% + 114px));
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`;

export const NoImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
  border-radius: 12px;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.3)};
`;

export const NoImageText = styled.p`
  ${({ theme }) => ({ ...theme.typography.header03 })};
  color: ${({ theme }) => theme.colors.white};
`;

export const Icon = styled(GiftIcon)`
  width: 120px;
  aspect-ratio: 1/1;
`;
