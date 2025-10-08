import styled from '@emotion/styled';
import { hexToRgba } from '../../../utils/hexToRgba';

export const Thumbnail = styled.img`
  max-width: 60px;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 1px 3px ${({ theme }) => hexToRgba(theme.colors.gray06, 0.2)};
`;
