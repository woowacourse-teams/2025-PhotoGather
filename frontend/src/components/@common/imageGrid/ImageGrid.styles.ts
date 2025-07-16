import styled from '@emotion/styled';

export const Wrapper = styled.div<{ $rowImageAmount: number }>`
  width: 100%;
  display: inline-grid;
  align-items: start;
  grid-template-columns: repeat(${({ $rowImageAmount }) => $rowImageAmount}, 1fr);
  gap: 4px;
  width: fit-content;
  overflow-y: auto;
  max-height: 100%;
`;
