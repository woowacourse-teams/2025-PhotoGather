import styled from '@emotion/styled';

export const InputFooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputCount = styled.p`
  color: ${({ theme }) => theme.colors.gray03};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

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
    color: ${({ theme }) => theme.colors.gray04};
  }
  font-size: ${({ theme }) => theme.typography.bodyRegular};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
`;
