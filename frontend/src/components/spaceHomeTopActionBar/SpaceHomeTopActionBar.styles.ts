import styled from '@emotion/styled';

export const TopActionBar = styled.div`
<<<<<<< HEAD
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 16px;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.topActionButton};
=======
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 16px;
  z-index: ${({ theme }) => theme.zIndex.topActionButton};
  & > *:only-child {
    margin-left: auto;
  }
>>>>>>> develop
`;
