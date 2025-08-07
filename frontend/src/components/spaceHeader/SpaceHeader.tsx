import { ReactComponent as ClockIcon } from '@assets/icons/clock.svg';
import { theme } from '../../styles/theme';
import type { Timer } from '../../types/timer.type';
import { checkIsTimerExpired } from '../../utils/checkIsTimerExpired';
import { formatTimer } from '../../utils/formatTimer';
import * as S from './SpaceHeader.styles';

interface SpaceHeaderProps {
  /** 헤더의 제목 */
  title: string;
  /** 헤더의 타이머 */
  timer: Timer;
  /** 헤더 우상단 아이콘 */
  icon?: React.ReactNode;
}

const SpaceHeader = ({ title, timer, icon }: SpaceHeaderProps) => {
  const isExpired = checkIsTimerExpired(timer);
  const isWithinOneHour = timer.days === 0 && timer.hours === 0 && !isExpired;

  return (
    <S.Wrapper>
      <S.TitleIconContainer>
        <S.Title>{title}</S.Title>
        <S.Icon>{icon}</S.Icon>
      </S.TitleIconContainer>
      <S.TimerContainer>
        <ClockIcon
          fill={isWithinOneHour ? theme.colors.error : theme.colors.white}
          width="24px"
          height="24px"
        />
        <S.TextContainer $isWithinOneHour={isWithinOneHour}>
          {`${formatTimer(timer)} 남았어요`}
        </S.TextContainer>
      </S.TimerContainer>
    </S.Wrapper>
  );
};

export default SpaceHeader;
