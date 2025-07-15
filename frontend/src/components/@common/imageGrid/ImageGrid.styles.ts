import styled from '@emotion/styled';

export const Wrapper = styled.div<{ rowImageAmount: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ rowImageAmount }) => rowImageAmount}, 1fr);
  gap: 4px;
  width: fit-content;
`;
