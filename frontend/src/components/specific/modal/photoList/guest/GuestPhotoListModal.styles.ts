import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
