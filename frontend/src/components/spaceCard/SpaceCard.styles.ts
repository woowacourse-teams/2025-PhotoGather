import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 106px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray01};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ImageContainer = styled.div`
  width: 96px;
  height: 106px;
  border-radius: 10px 0 0 10px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 15px 12px 15px 12px;
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gray06};
  font: ${({ theme }) => theme.typography.header03};
`;

export const CardDuration = styled.p`
  color: ${({ theme }) => theme.colors.gray04};
  font: ${({ theme }) => theme.typography.captionSmall};
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray04};
  font: ${({ theme }) => theme.typography.captionSmall};
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const InfoText = styled.span`
  font: ${({ theme }) => theme.typography.captionSmall};
`;
