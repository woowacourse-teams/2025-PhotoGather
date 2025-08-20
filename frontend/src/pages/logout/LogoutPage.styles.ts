import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const LogoutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 90px;
  height: 30px;
  color: ${({ theme }) => theme.colors.error};

  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.lightError};
  }
`;
