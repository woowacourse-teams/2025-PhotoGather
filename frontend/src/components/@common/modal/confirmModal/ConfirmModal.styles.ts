import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 40px;
  min-width: 320px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

export const IconContainer = styled.div`
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

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.header03 })}
  color: ${({ theme }) => theme.colors.gray04};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  margin: 14px 0 0 0;
  justify-content: center;
`;
