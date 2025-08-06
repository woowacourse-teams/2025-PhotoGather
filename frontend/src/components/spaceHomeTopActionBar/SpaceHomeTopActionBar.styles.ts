import styled from '@emotion/styled';

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
