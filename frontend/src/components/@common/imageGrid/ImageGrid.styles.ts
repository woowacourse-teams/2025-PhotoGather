import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div<{ $rowImageAmount: number }>`
  width: 100%;
  height: 100%;
  display: inline-grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  width: fit-content; 
  max-height: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  gap: 1px;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.3)};
`;

export const BorderSection = styled.div`
  background-color: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.3)};
  width: 100%;
  padding: 1px;
  border-radius: 13px;
`;
