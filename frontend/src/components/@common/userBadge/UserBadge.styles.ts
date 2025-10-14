import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.button`
  display: inline-flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.7)};
  backdrop-filter: blur(2px);
  border-radius: 50px;
  padding: 4px 8px;
  gap: 8px;
  &:active {
    scale: 0.99;
  }
`;

export const NickName = styled.p`
  ${({ theme }) => theme.typography.captionSmall};
  color: ${({ theme }) => theme.colors.white};
`;
