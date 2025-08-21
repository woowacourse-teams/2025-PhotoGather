import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  min-width: 136px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px 9px 12px 9px;
  text-align: center;
  gap: 12px;
  background-color: ${theme.colors.grayBackground};
  border-radius: 12px;
  font: ${theme.typography.bodyLarge};
`;

export const Title = styled.h2`
  color: ${theme.colors.gray06};
`;

export const Description = styled.h2`
  color: ${({ theme }) => theme.colors.primary60};
`;
