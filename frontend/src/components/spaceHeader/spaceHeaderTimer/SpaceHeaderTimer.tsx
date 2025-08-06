import type { Timer } from '../../../types/timer.type';
import { formatTimer } from '../../../utils/formatTimer';
import { isTimerExpired } from '../../../utils/isTimeExpired';
import * as S from './SpaceHeaderTimer.styles';

interface SpaceHeaderTimerProps {
  timer: Timer;
}

const SpaceHeaderTimer = ({ timer }: SpaceHeaderTimerProps) => {
  const isExpired = isTimerExpired(timer);
  const isWithinOneHour = timer.days === 0 && timer.hours === 0 && !isExpired;

  return (
    <S.Wrapper>
      <S.Icon isWithinOneHour={isWithinOneHour} />
      <S.TextContainer isWithinOneHour={isWithinOneHour}>
        {`${formatTimer(timer)} 남았어요`}
      </S.TextContainer>
    </S.Wrapper>
  );
};

export default SpaceHeaderTimer;
