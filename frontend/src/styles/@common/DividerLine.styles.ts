import styled from '@emotion/styled';

export const DividerLine = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray02};
`;
