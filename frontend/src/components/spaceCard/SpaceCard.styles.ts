import styled from '@emotion/styled';
import { hexToRgba } from '../../utils/hexToRgba';

export const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 106px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray01};
  background-color: ${({ theme }) => theme.colors.white};
  text-align: left;
  cursor: pointer;
  overflow: hidden;
`;

export const ImageContainer = styled.div<{
  $isBlurred?: boolean;
  $isEarly?: boolean;
}>`
  position: relative;
  width: ${({ $isEarly }) => ($isEarly ? '100%' : '98px')};
  height: 106px;
  border-radius: ${({ $isEarly }) => ($isEarly ? '10px' : '10px 0 0 10px')};
  overflow: hidden;
  ${({ $isEarly, theme }) =>
    $isEarly &&
    `
    background-color: ${theme.colors.white};
    `}

  ${({ $isBlurred, theme }) =>
    $isBlurred &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${hexToRgba(theme.colors.gray06, 0.6)};
      backdrop-filter: blur(2px);
    }
    `}
  
  ${({ $isEarly, theme }) =>
    $isEarly &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${hexToRgba(theme.colors.gray06, 0.6)};
      backdrop-filter: blur(3px);
    }
  `}
`;

export const CardImage = styled.img<{
  $isBlurred?: boolean;
  $isEarly?: boolean;
}>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $isEarly }) => ($isEarly ? 'contain' : 'cover')};
  ${({ $isBlurred }) =>
    $isBlurred &&
    `
    filter: blur(2px);
  `}
`;

export const ImageOverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.accent};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
  white-space: pre-line;
  text-align: center;
  z-index: ${({ theme }) => theme.zIndex.overlayIcon};
`;

export const EarlyOverlayContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  z-index: 1;
  border-radius: 10px;
`;

export const EarlyOverlayTitle = styled.div`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => ({ ...theme.typography.header03 })};
`;

export const EarlyOverlayDate = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  ${({ theme }) => ({ ...theme.typography.bodyLarge })};
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 15px 12px 15px 12px;
`;

export const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gray06};
  font: ${({ theme }) => theme.typography.header03};
`;

export const CardDuration = styled.p`
  color: ${({ theme }) => theme.colors.gray03};
  font: ${({ theme }) => theme.typography.bodyRegular};
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray04};
  font: ${({ theme }) => theme.typography.captionSmall};
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const InfoText = styled.span`
  font: ${({ theme }) => theme.typography.captionSmall};
`;
