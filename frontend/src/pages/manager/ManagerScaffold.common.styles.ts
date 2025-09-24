import styled from '@emotion/styled';
import { ImageGridBackDrop } from '../../styles/@common/BackDrop.styles';
import { theme } from '../../styles/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) =>
    `calc(100vh - ${parseInt(theme.layout.padding.topBottom) * 2}px - ${theme.layout.headerHeight})`};
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: ${({ theme }) => theme.zIndex.imageGrid};
`;

export const BodyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
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

export const ImageManagementContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TopActionBar = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 16px;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.topActionButton};
`;

export const IntersectionArea = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.layout.padding.topBottom};
`;

export const BottomNavigatorContainer = styled.div`
  max-width: 100%;
  position: fixed;
  padding: 0 24px;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.layout.width};
  justify-content: right;
  align-items: end;
  gap: 12px;
  pointer-events: none;
`;

export const TopButtonContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
  pointer-events: auto;

  @media screen and (max-width: ${theme.breakpoints.mobile}) {
    transform: translateX(calc(-50% + 140px));
  }
`;

export const NoImageContainer = styled(ImageGridBackDrop)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.3)};
`;

export const NoImageText = styled.p`
  ${({ theme }) => ({ ...theme.typography.header03 })};
  color: ${({ theme }) => theme.colors.white};
`;

export const LoadingSpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndex.loadingSpinner};
`;

export const ModalContentContainer = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const GiftIconImage = styled.img`
  width: 120px;
`;
