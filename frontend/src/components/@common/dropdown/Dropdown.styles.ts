import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 100px;
  padding: 6px 12px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray05};
  border-radius: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  font: ${({ theme }) => theme.typography.captionSmall};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.gray03};
  }
`;

export const ArrowIcon = styled.span<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.gray04};
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 10;
  min-width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  border-radius: 8px;
  overflow: hidden;
`;

export const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 10px 16px;
  ${({ theme }) => theme.typography.captionSmall};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.gray06};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray06 : theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray03};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray01};
  }
`;
