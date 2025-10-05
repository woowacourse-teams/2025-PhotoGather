import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const TextareaField = styled.textarea<{ $isError: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, $isError }) => ($isError ? theme.colors.error : theme.colors.gray02)};
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ theme }) => theme.colors.gray06};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray03};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $isError }) => ($isError ? theme.colors.error : theme.colors.gray06)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray01};
    color: ${({ theme }) => theme.colors.gray03};
    cursor: not-allowed;
  }
`;

export const InputFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.error};
  min-height: 20px;
`;

export const InputCount = styled.span`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray03};
`;
