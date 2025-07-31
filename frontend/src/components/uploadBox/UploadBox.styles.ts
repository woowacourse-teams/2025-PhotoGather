import styled from '@emotion/styled';

export const Wrapper = styled.label<{ $isActive: boolean }>`
  width: 100%;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
  position: relative;
`;

export const Container = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary20};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.uploadBox.active : theme.colors.uploadBox.default};
  ${({ theme }) => ({ ...theme.typography.header03 })}
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
  white-space: pre-line;
  text-align: center;
`;

export const LimitTextContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary20};
  ${({ theme }) => ({ ...theme.typography.captionSmall })}
  text-align: center;
  position: absolute;
  bottom: 16px;
`;
