import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const IconContainer = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  background: ${({ theme }) => theme.colors.white};
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray04};
  ${({ theme }) => ({ ...theme.typography.captionSmall })}
`;
