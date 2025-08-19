import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) =>
    `calc(100vh - ${parseInt(theme.layout.padding.topBottom) * 2}px - ${theme.layout.headerHeight})`};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: ${({ theme }) => theme.zIndex.imageGrid};
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

export const ProfileImageContainer = styled.div`
  width: 52px;
  height: 52px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => ({ ...theme.typography.header03 })};
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
