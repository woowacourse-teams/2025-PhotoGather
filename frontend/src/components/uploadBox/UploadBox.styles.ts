import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary60};
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => ({ ...theme.typography.header03 })}
  opacity: 0.7;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
`;
