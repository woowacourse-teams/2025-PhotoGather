import styled from '@emotion/styled';

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: -12px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  aspect-ratio: 1/1;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.header03 })}
  color: ${({ theme }) => theme.colors.gray06};
`;

export const Description = styled.span<{ $isError: boolean }>`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })}
  color: ${({ theme, $isError }) => ($isError ? theme.colors.error : theme.colors.gray04)};
  margin-top: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  margin: 14px 0 0 0;
  justify-content: center;
`;
