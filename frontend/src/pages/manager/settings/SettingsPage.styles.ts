import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ theme }) =>
    `calc(100vh - ${parseInt(theme.layout.padding.topBottom) * 2}px - ${theme.layout.headerHeight})`};
  position: relative;
  // TODO: grid로 전환
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: ${({ theme }) => theme.zIndex.imageGrid};
`;

export const InfoBoxContainer = styled.div`
  white-space: pre-line;
  text-align: center;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.header02 })}
  color: ${({ theme }) => theme.colors.white};
`;

export const InfoContainer = styled.div`
  width: auto;
  display: flex;
  padding: 20px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputLabel = styled.label`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })};
  color: ${({ theme }) => theme.colors.gray06};
`;

export const AccessTypeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SpaceDeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  ${({ theme }) => ({ ...theme.typography.captionSmall })};
  margin-bottom: 16px;
`;

export const SpaceDeleteButton = styled.button`
  display: flex;
  justify-content: flex-end;
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
