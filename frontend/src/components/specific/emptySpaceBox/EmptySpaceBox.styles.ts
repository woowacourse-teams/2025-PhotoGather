import styled from '@emotion/styled';
import { ImageGridBackDrop } from '../../../styles/@common/BackDrop.styles';
import { hexToRgba } from '../../../utils/hexToRgba';

export const NoImageContainer = styled(ImageGridBackDrop)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
  background: ${({ theme }) => hexToRgba(theme.colors.gray06, 0.3)};
`;

export const NoImageText = styled.p`
  ${({ theme }) => ({ ...theme.typography.header03 })};
  color: ${({ theme }) => theme.colors.white};
`;

export const GiftIconImage = styled.img`
  width: 120px;
`;
