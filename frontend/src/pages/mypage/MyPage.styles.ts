import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { hexToRgba } from '../../utils/hexToRgba';

// TODO : 마이페이지 스크롤 높이 조절 필요
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 -16px 0 -16px;
`;

export const CreateSpaceButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  width: 132px;
  height: 28px;
  padding: 2px 12px;
  border-radius: 50px;
  background-color: ${hexToRgba(theme.colors.gray06, 0.7)};
`;

export const SpaceContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  flex: 1;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
  margin-bottom: -32px;
  padding: 0 16px;
  position: relative;
`;

export const SpaceList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 26px;
`;

export const FilterBlur = styled.div`
  background: ${({ theme }) => hexToRgba(theme.colors.white, 0.7)};
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  /* backdrop-filter: blur(8px); */
  z-index: 1;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCount = styled.span`
  font: ${({ theme }) => theme.typography.captionSmall};
  color: ${({ theme }) => theme.colors.gray03};
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray01};
  border-radius: 500px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
  font: ${({ theme }) => theme.typography.captionSmall};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ isActive }) =>
    isActive
      ? `
    background-color: #7c3aed;
  `
      : `
    background-color: transparent;
    color: #6b7280;
    border: 1px solid #e5e7eb;

    &:hover {
      background-color: #f3f4f6;
    }
  `}
`;

export const EmptyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 30%;
  align-items: center;
  align-self: center;
`;

export const EmptyTitleContainer = styled.p`
  font: ${({ theme }) => theme.typography.header02};
  color: ${({ theme }) => theme.colors.gray06};
`;

export const EmptyDescriptionContainer = styled.p`
  font: ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme }) => theme.colors.gray03};
`;
