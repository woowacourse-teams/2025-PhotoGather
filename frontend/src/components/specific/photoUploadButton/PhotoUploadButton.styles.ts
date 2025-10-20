import styled from '@emotion/styled';

export const Wrapper = styled.label<{ $isActive: boolean }>`
  width: 100%;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
  position: static;
`;

export const Container = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.gray02};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.gray03 : theme.colors.white};
  ${({ theme }) => ({ ...theme.typography.header03 })}
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
  white-space: pre-line;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
`;

export const LimitTextContainer = styled.p`
  color: ${({ theme }) => theme.colors.gray02};
  ${({ theme }) => ({ ...theme.typography.captionSmall })}
  text-align: center;
  position: absolute;
  bottom: 16px;
`;
