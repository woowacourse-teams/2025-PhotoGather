import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight})`};
`;

export const WorkContainer = styled.div`
    display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EditButton = styled.button`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.gray02};
  align-self: flex-end;
  display: block;
  margin-left: auto;
  margin-bottom: 3px;
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
