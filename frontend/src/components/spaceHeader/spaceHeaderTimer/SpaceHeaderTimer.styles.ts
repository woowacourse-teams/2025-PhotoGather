import { ReactComponent as ClockIcon } from '@assets/icons/clock.svg';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    gap: 7px;
`;

export const TextContainer = styled.p<{ isWithinOneHour: boolean }>`
  ${({ theme }) => theme.typography.bodyRegular};
  color: ${({ theme, isWithinOneHour }) =>
    isWithinOneHour ? theme.colors.error : theme.colors.white};
`;

export const Icon = styled(ClockIcon)<{ isWithinOneHour: boolean }>`
  color: ${({ theme, isWithinOneHour }) =>
    isWithinOneHour ? theme.colors.error : theme.colors.white};
`;
