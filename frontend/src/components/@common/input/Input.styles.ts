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
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray04};
  }
`;

export const InputFooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
`;

export const InputCount = styled.p`
  color: ${({ theme }) => theme.colors.gray03};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
`;
