import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${({ theme }) => theme.layout.width};
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const Icon = styled.img`
  width: 120px;
  height: 120px;
`;
