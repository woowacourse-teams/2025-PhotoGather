import styled from '@emotion/styled';

export const TopActionBar = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: right;
  position: sticky;
  top: 16px;
  z-index: ${({ theme }) => theme.zIndex.topActionButton};
`;
