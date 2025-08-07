import type { Timer } from '../../types/timer.type';
import { formatTimer } from '../../utils/formatTimer';
import { isTimerExpired } from '../../utils/isTimerExpired';
import * as S from './SpaceHeader.styles';

interface SpaceHeaderProps {
  /** 헤더의 제목 */
  title: string;
  /** 헤더의 설명 */
  timer: Timer;
  /** 헤더 우상단 아이콘 */
  icon?: React.ReactNode;
}

const SpaceHeader = ({ title, timer, icon }: SpaceHeaderProps) => {
  const isExpired = isTimerExpired(timer);
  const isWithinOneHour = timer.days === 0 && timer.hours === 0 && !isExpired;

  return (
    <S.Wrapper>
      <S.TitleIconContainer>
        <S.Title>{title}</S.Title>
        <S.Icon>{icon}</S.Icon>
      </S.TitleIconContainer>
      <S.TimerContainer>
        <S.ClockIconContainer isWithinOneHour={isWithinOneHour} />
        <S.TextContainer isWithinOneHour={isWithinOneHour}>
          {`${formatTimer(timer)} 남았어요`}
        </S.TextContainer>
      </S.TimerContainer>
    </S.Wrapper>
  );
};

export default SpaceHeader;
