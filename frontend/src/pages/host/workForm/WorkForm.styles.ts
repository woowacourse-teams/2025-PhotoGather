import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: ${({ theme }) =>
    `calc(100dvh - 2 * ${theme.layout.padding.topBottom} - ${theme.layout.headerHeight})`};
`;

export const TitleContainer = styled.h2`
  ${({ theme }) => theme.typography.header02}
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LabelContainer = styled.label`
  ${({ theme }) => theme.typography.bodyLarge}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const FormLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  margin-top: 16px;
`;

export const ImageGridItem = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray01};
  border: 1px solid ${({ theme }) => theme.colors.gray02};
`;

export const GridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const EmptyGridItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ theme }) => theme.colors.gray03};
`;

export const ImageDeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray06};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const ButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  width: calc(100% + 2 * ${({ theme }) => theme.layout.padding.leftRight});
  margin-left: calc(-1 * ${({ theme }) => theme.layout.padding.leftRight});
  margin-bottom: calc(-1 * ${({ theme }) => theme.layout.padding.topBottom});
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 10;
`;

export const DeleteButton = styled.button`
  ${({ theme }) => theme.typography.captionSmall}
  color: ${({ theme }) => theme.colors.error};
  display: block;
  margin-left: auto;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
