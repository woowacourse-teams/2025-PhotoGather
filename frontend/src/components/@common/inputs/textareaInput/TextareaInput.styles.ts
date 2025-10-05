import styled from '@emotion/styled';

export const TextareaField = styled.textarea<{ $isError: boolean }>`
  width: 100%;
  min-height: 150px;
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
  border-radius: 4px;
`;
