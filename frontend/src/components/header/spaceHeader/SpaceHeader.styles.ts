import { ReactComponent as ClockIcon } from '@assets/icons/clock.svg';
import styled from '@emotion/styled';
import { isPropValid } from 'storybook/internal/theming';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TitleIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.header01 })};
  color: ${({ theme }) => theme.colors.white};
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Icon = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:active {
    scale: 0.9;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  gap: 7px;
`;

export const TextContainer = styled.p<{ $isWithinOneHour: boolean }>`
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme, $isWithinOneHour }) =>
    $isWithinOneHour ? theme.colors.error : theme.colors.white};
`;

export const ClockIconContainer = styled(ClockIcon, {
  shouldForwardProp: (prop) => isPropValid(prop) || prop === 'isWithinOneHour',
})<{
  $isWithinOneHour: boolean;
}>`
  color: ${({ theme, $isWithinOneHour }) =>
    $isWithinOneHour ? theme.colors.error : theme.colors.white};
`;
