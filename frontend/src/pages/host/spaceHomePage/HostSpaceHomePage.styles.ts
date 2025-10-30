import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const ActionButtonContainer = styled.div`
  display: flex;
  width: fit-content;
  gap: 16px;
  padding: 8px 12px;
  justify-content: flex-end;
  background: ${({ theme }) => hexToRgba(theme.colors.gray03, 0.2)};
  border-radius: 40px;
  margin-left: auto;
`;
