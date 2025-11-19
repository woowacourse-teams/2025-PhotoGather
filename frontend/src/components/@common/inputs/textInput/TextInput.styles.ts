import styled from '@emotion/styled';

export const InputField = styled.input<{ $isError: boolean }>`
  width: 100%;
  height: 3rem;
  padding: 8px 12px;
  border: 1px solid
    ${({ $isError, theme }) => ($isError ? theme.colors.error : theme.colors.gray02)};
  border-radius: 4px;
  &:focus {
    border: 1px solid
      ${({ $isError, theme }) => ($isError ? theme.colors.error : theme.colors.gray06)};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray03};
  }
  font-size: ${({ theme }) => theme.typography.bodyRegular};
`;

export const SubLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.captionSmall};
  color: ${({ theme }) => theme.colors.gray04};
`;
