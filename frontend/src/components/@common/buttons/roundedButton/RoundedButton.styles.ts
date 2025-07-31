import styled from '@emotion/styled';
import { hexToRgba } from '../../../../utils/hexToRgba';

export const Wrapper = styled.button`
  border-radius: 500px;
  padding: 2px 12px;
  background: ${({ theme }) => hexToRgba(theme.colors.gray03, 0.5)};
  backdrop-filter: blur(5px);
  color: ${({ theme }) => theme.colors.white};
  &:active {
    background: ${({ theme }) => hexToRgba(theme.colors.gray03, 0.3)};
  }
  &:disabled {
    background: ${({ theme }) => hexToRgba(theme.colors.gray01, 0.5)};
  }
`;

export const Text = styled.span`
${({ theme }) => ({ ...theme.typography.captionSmall })}
`;
