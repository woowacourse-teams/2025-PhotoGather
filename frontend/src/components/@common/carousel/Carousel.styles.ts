import styled from '@emotion/styled';

export const Wrapper = styled.div`
  overflow-x: auto;
  width: calc(
    ${({ theme }) => theme.layout.width} - ${({ theme }) => theme.layout.padding.leftRight}
  );
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SlidesContainer = styled.div<{
  $currentIndex: number;
  $isTransitioning: boolean;
}>`
  display: flex;
  width: 100%;
  transform: translateX(${({ $currentIndex }) => `-${$currentIndex * 100}%`});
  transition: ${({ $isTransitioning }) =>
    $isTransitioning ? 'transform 0.4s ease-in-out' : 'none'};
`;

export const Slide = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const DotContainer = styled.div<{ $isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.gray03 : theme.colors.primary20};
  cursor: pointer;
`;
