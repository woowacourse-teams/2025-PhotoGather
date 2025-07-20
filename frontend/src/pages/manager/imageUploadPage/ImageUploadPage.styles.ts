import styled from '@emotion/styled';

export const Wrapper = styled.div<{ $hasImages: boolean }>`
  ${({ theme }) => theme.typography.header03}
  width: 100%;
  height: 100%;
  //TODO: height 고정 값 때문에 의도적으로 top,bottom padding을 빼준 값 사용
  min-height: calc(100dvh - 64px);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
