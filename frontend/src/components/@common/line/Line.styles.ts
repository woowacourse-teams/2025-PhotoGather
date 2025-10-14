import styled from '@emotion/styled';

export const LineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Line = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray02};
`;

export const ButtonContainer = styled.div`
  max-width: 64px;
`;
