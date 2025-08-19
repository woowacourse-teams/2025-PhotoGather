import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { hexToRgba } from '../../utils/hexToRgba';

export const Wrapper = styled.div<{ $isClosed: boolean }>`
  display: flex;
  width: ${({ $isClosed }) => ($isClosed ? '100%' : 'auto')};
  height: ${({ $isClosed }) => ($isClosed ? '100px' : 'auto')};
  min-width: 136px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 9px 12px 9px;
  text-align: center;
  gap: ${({ $isClosed }) => ($isClosed ? 0 : 10)};
  background-color: ${({ $isClosed }) =>
    $isClosed ? hexToRgba(theme.colors.white, 0.1) : theme.colors.grayBackground};
  border-radius: 12px;
  font: ${({ theme }) => theme.typography.bodyLarge};
`;

export const Title = styled.h2<{ $isClosed: boolean }>`
  color: ${({ $isClosed }) =>
    $isClosed ? hexToRgba(theme.colors.white, 0.2) : theme.colors.gray06};
`;

export const Description = styled.h2`
  color: ${({ theme }) => theme.colors.primary60};
`;
