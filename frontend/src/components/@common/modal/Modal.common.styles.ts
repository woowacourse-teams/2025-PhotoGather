import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 32px;
  min-width: 320px;
  width: 100%;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.span`
  ${({ theme }) => ({ ...theme.typography.header03 })}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  margin: 14px 0 0 0;
  justify-content: center;
`;
