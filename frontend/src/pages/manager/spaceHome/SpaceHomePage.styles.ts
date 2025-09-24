import styled from '@emotion/styled';

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

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  z-index: ${({ theme }) => theme.zIndex.text};
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

export const LoadingSpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndex.loadingSpinner};
`;
