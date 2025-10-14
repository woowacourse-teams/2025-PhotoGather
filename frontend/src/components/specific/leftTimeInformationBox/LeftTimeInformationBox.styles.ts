import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';

export const Wrapper = styled.div`
  display: inline-flex;
  padding: 24px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 12px;
  background-color: ${theme.colors.primary10};
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.header02 })};
`;

export const TopDescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
`;

export const TopDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray05};
  ${({ theme }) => ({ ...theme.typography.header03 })}
`;

export const TopLeftTime = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => ({ ...theme.typography.header03 })}
  font-family: 'Roboto'
`;

export const Icon = styled.img`
  width: 64px;
  height: 64px;
  margin: 12px 0;
`;
