import { ReactComponent as CloseIcon } from '@assets/icons/close.svg';
import styled from '@emotion/styled';
import { hexToRgba } from '../../../../../utils/hexToRgba';
import * as C from '../ImageElement.common.styles';

export const Wrapper = styled(C.Wrapper)`
  position: relative;
  /**삭제 예정 */
  max-width: 94px;
`;

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
  &:active{
    opacity: 0.7;
  }
`;

export const Icon = styled(CloseIcon)`
  color: ${({ theme }) => theme.colors.white};
  width: 60%;
`;
