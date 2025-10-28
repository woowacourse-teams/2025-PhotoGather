import styled from '@emotion/styled';

export const DividerLine = styled.div<{ width: string; color?: string }>`
  width: ${({ width }) => width};
  height: 1px;
  background-color: ${({ theme, color }) => color ?? theme.colors.gray02};
`;
