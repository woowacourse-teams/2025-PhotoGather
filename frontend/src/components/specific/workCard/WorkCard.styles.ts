import styled from '@emotion/styled';

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typography.header03};
  color: ${({ theme }) => theme.colors.black};

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Category = styled.p`
  ${({ theme }) => theme.typography.captionSmall};
  color: ${({ theme }) => theme.colors.gray06};
`;

export const AuthorName = styled.p`
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme }) => theme.colors.gray05};
`;
