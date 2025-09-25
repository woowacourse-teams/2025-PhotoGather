import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
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
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Name = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => ({ ...theme.typography.header03 })};
`;
