import styled from '@emotion/styled';

export const Wrapper = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray06};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray05};
  }
`;

export const LeftContainer = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RightContainer = styled.div``;

export const Text = styled.p`
  ${({ theme }) => theme.typography.header03}
  max-width: 230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Circle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.newGuestbook};
  border-radius: 50%;
`;
