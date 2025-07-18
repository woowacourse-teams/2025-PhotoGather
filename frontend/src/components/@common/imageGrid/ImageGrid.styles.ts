import styled from '@emotion/styled';

export const Wrapper = styled.div<{ $rowImageAmount: number }>`
  width: 100%;
  height: 100%;
  display: inline-grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  width: fit-content;
  max-height: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  gap: 2px;
  background-color: ${({ theme }) => theme.colors.gray06};
  padding: 1px;
  border-radius: 12px;
`;
