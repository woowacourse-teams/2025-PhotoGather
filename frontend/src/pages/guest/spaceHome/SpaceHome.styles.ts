import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  z-index: ${({ theme }) => theme.zIndex.text};
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
