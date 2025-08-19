import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 200px;
  padding: 120px 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 24px;
align-items: center;
`;

export const TextContainer = styled.p`
  text-align: center;
  white-space: pre-line;
  ${({ theme }) => theme.typography.header03}
  color:  ${({ theme }) => theme.colors.white};
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

export const ImageContainer = styled.img``;
