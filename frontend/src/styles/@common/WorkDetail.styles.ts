import styled from '@emotion/styled';

export const WorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleRowContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const TitleContainer = styled.h1`
  ${({ theme }) => theme.typography.header01}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const CategoryContainer = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
`;

export const DesignerContainer = styled.p`
  ${({ theme }) => theme.typography.bodyLarge}
`;

export const DescriptionContainer = styled.p`
  ${({ theme }) => theme.typography.captionSmall}
  white-space: pre-line;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: auto;
`;
