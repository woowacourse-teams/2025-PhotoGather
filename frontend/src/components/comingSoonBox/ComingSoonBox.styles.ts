import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  min-width: 136px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 9px 12px 9px;
  text-align: center;
  background-color: ${hexToRgba(theme.colors.white, 0.1)};
  border-radius: 12px;
  font: ${theme.typography.bodyLarge};
`;

export const Title = styled.h2`
  color: ${hexToRgba(theme.colors.white, 0.2)};
`;
