import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 40px;
  min-width: 320px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;
