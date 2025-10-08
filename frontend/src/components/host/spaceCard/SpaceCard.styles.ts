import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => hexToRgba(theme.colors.white, 0.1)};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.gray02, 0.2)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => hexToRgba(theme.colors.white, 0.15)};
    border: 1px solid ${({ theme }) => hexToRgba(theme.colors.gray02, 0.4)};
  }
`;

export const SpaceThumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

export const SpaceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  flex: 1;
`;

export const SpaceHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SpaceTitle = styled.h3`
  ${({ theme }) => theme.typography.bodyLarge};
  color: ${({ theme }) => theme.colors.white};
`;

export const PublicIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const SpaceGuestCountContainer = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme }) => theme.colors.gray03};
`;
