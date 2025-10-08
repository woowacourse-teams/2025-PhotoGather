import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  width: 100%;
  ${({ theme }) => ({
    ...theme.typography.header02,
  })}
`;

export const InfoRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const DeleteButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;
