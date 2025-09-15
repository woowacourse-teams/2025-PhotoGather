import styled from '@emotion/styled';
import { CloseIcon } from '../../../../../@assets/icons';
import { hexToRgba } from '../../../../../utils/hexToRgba';

export const CloseButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.3)};
  border-radius: 50%;
  width: 17%;
  max-width: 20px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.6)};
  }
`;

export const Icon = styled(CloseIcon)`
  color: ${({ theme }) => theme.colors.white};
  width: 60%;
`;
