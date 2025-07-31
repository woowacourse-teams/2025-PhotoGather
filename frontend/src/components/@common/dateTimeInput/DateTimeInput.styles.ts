import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputField = styled.input<{ $isError: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid
    ${({ $isError, theme }) => ($isError ? theme.colors.error : theme.colors.gray02)};
  border-radius: 12px;
  &:focus {
    border: 1px solid
      ${({ $isError, theme }) => ($isError ? theme.colors.error : theme.colors.primary)};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
`;
