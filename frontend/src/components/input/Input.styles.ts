import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  // TODO : 삭제
  max-width: 320px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  border-radius: 12px;
  box-sizing: border-box;
  &:focus{
    border: 1px solid ${({ theme }) => theme.colors.primary};
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
