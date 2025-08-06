import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const IconTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Icon = styled.img`
max-width: 100px;
width: 100%;
  aspect-ratio: 1/1;
`;

export const Text = styled.p`
  ${({ theme }) => ({ ...theme.typography.header03 })};
  color: ${({ theme }) => theme.colors.white};
`;

export const Percentage = styled.p`
  ${({ theme }) => ({ ...theme.typography.header01 })};
  color: ${({ theme }) => theme.colors.accent};
`;
