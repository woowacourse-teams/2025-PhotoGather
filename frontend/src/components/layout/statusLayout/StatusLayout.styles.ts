import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
  border-radius: 12px;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.7)};
`;

export const Icon = styled.img`
  width: 120px;
  height: 120px;
`;
