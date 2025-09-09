import styled from '@emotion/styled';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const StyledBorderButton = styled.button<{ $color: string }>`
  width: 100%;
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  border-radius: 12px;

  &:disabled {
    color: ${({ theme }) => hexToRgba(theme.colors.gray01, 0.5)};
    border-color: ${({ theme }) => hexToRgba(theme.colors.gray01, 0.5)};
  }
`;
