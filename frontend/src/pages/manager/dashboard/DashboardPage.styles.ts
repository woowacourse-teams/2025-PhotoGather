import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) =>
    `calc(100vh - ${parseInt(theme.layout.padding.topBottom) * 2}px - ${theme.layout.headerHeight})`};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: ${({ theme }) => theme.zIndex.imageGrid};
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.header02 })}
  color: ${({ theme }) => theme.colors.white};
`;

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  justify-content: center;
  align-items: stretch;
`;

export const DashboardInfoContainer = styled.div`
  max-width: 136px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`;

export const ModifyButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
  color: ${({ theme }) => theme.colors.white};
`;

export const ModifyButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  width: 140px;
  height: 30px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.gray01};
  }
`;
