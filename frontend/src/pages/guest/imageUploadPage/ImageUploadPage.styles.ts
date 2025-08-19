import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';

export const Wrapper = styled.div<{ $hasImages: boolean }>`
  ${({ theme }) => theme.typography.header03}
  width: 100%;
  height: 100%;
  min-height: ${({ theme }) =>
    `calc(100dvh - ${parseInt(theme.layout.padding.topBottom) * 2}px)`};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

export const ScrollTopAnchor = styled.div`
  position: absolute;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.header01}
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}

  color: ${({ theme }) => theme.colors.gray01};
  white-space: pre-line;
`;

export const UploadContainer = styled.div<{ $hasImages: boolean }>`
  flex: ${({ $hasImages }) => ($hasImages ? 0 : 1)};
  height: 100%;
  display: flex;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
`;

export const IntersectionArea = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.layout.padding.topBottom};
`;

export const TopButtonContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 21px;
  left: 50%;
  transform: translateX(calc(-50% + 150px));
  z-index: ${({ theme }) => theme.zIndex.floatingActionButton};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;

  @media screen and (max-width: ${theme.breakpoints.mobile}) {
    transform: translateX(calc(-50% + 140px));
  }
`;

export const LoadingSpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndex.loadingSpinner};
`;
