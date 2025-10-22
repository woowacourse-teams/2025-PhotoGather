import styled from '@emotion/styled';
import { fadeUp } from '../../../animations/animations';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  width: 100%;
  height: calc(
    100dvh - 2 * ${({ theme }) => theme.layout.padding.topBottom} -
      ${({ theme }) => theme.layout.headerHeight}
  );
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const IconContainer = styled.div`
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Message = styled.h1<{ $isAnimationRequired: boolean }>`
  ${({ theme }) => ({ ...theme.typography.header02 })}
  color: ${({ theme }) => theme.colors.gray05};
  text-align: center;
  width: 100%;
  flex-grow: 1;
  height: 100%;
  line-height: 170%;
  white-space: pre-line;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15vh;
  animation: ${({ $isAnimationRequired }) =>
    $isAnimationRequired ? fadeUp : 'none'} 0.6s ease-out forwards;
`;

export const NameHighlight = styled.span`
  color: ${({ theme }) => theme.colors.gray05};
`;
