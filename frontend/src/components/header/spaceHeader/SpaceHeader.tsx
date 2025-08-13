import type { Timer } from '../../../types/timer.type';
import { checkIsTimerExpired } from '../../../utils/checkIsTimerExpired';
import { formatTimer } from '../../../utils/formatTimer';
import * as S from './SpaceHeader.styles';

interface SpaceHeaderProps {
  /** 헤더의 제목 */
  title: string;
  /** 헤더의 타이머 */
  timer: Timer;
  /** 헤더 우상단 아이콘 */
  icon?: React.ReactNode;
  /** 헤더 우상단 아이콘 클릭 이벤트 */
  onIconClick?: () => void;
}

const SpaceHeader = ({ title, timer, icon, onIconClick }: SpaceHeaderProps) => {
  const isExpired = checkIsTimerExpired(timer);
  const isWithinOneHour = timer.days === 0 && timer.hours === 0 && !isExpired;

  return (
    <S.Wrapper>
      <S.TitleIconContainer>
        <S.Title>{title}</S.Title>
        <S.Icon onClick={onIconClick}>{icon}</S.Icon>
      </S.TitleIconContainer>
      <S.TimerContainer>
        <S.ClockIconContainer $isWithinOneHour={isWithinOneHour} />
        <S.TextContainer $isWithinOneHour={isWithinOneHour}>
          {`스페이스 만료까지 ${formatTimer(timer)}`}
        </S.TextContainer>
      </S.TimerContainer>
    </S.Wrapper>
  );
};

export default SpaceHeader;
