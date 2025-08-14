import styled from '@emotion/styled';

export const FakeImage = styled.div<{ $color: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ $color }) => $color};
`;
