import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div<{ $rowImageAmount: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  max-height: 100%;
  overflow: hidden;
  gap: 1px;
  box-shadow: 0 0 10px 0 ${({ theme }) => hexToRgba(theme.colors.gray06, 0.4)};
`;
