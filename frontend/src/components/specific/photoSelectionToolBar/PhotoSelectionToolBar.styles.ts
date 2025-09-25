import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Wrapper = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(2px);
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.7)};
  border-radius: 500px;
  max-width: ${({ theme }) => theme.layout.width};
  width: 100%;
  pointer-events: auto;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    transform: scale(0.9);
  }
`;
