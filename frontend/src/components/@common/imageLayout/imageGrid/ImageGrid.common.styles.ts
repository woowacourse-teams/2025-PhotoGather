import styled from '@emotion/styled';

export const Wrapper = styled.div<{ $rowImageAmount: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  max-height: 100%;
  overflow: hidden;
  gap: 1px;
`;
