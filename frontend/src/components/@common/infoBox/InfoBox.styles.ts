import { ReactComponent as InfoIcon } from '@assets/icons/info.svg';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary10};
`;

export const Icon = styled(InfoIcon)`
  width: 20px;
  aspect-ratio: 1;
  & circle {
    fill: transparent;
  }

  & path {
    fill: ${({ theme }) => theme.colors.primary60};
  }
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.bodyLarge })}
  color: ${({ theme }) => theme.colors.gray06};
`;
