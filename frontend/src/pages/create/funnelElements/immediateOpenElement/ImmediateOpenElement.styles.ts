import styled from '@emotion/styled';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;

  & > button {
    font-size: ${({ theme }) => theme.typography.bodyLarge.fontSize};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
