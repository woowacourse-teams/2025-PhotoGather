import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: ${({ theme }) => theme.layout.headerHeight};
`;

export const SettingButton = styled.button`
  width: 24px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImageButton = styled.button`
  width: 32px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
