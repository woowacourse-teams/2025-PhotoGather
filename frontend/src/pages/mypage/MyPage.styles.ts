import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) =>
    `calc(100vh - ${parseInt(theme.layout.padding.topBottom) * 2}px - ${theme.layout.headerHeight})`};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: ${({ theme }) => theme.zIndex.imageGrid};
`;
