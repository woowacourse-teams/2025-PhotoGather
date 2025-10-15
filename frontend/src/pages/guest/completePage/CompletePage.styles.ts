import styled from '@emotion/styled';
import { fadeUp } from '../../../animations/animations';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  width: 100%;
  height: calc(100dvh - 2 * ${({ theme }) => theme.layout.padding.topBottom} - ${({ theme }) => theme.layout.headerHeight});
  align-items: center;
`;

export const Message = styled.h1`
  ${({ theme }) => ({ ...theme.typography.header02 })}
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
  width: 100%;
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  white-space: pre-line;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15vh;
  animation: ${fadeUp} 0.6s ease-out forwards;
`;

export const NameHighlightContainer = styled.div`
  display: flex;
`;

export const NameHighlight = styled.span`
  color: ${({ theme }) => theme.colors.gray05};
`;
