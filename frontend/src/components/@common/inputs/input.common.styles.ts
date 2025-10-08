import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Label = styled.label`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })};
  color: ${({ theme }) => theme.colors.gray06};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
`;

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
