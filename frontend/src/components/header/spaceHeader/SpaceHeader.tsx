import type { SpacePublicType } from '../../../types/space.type';
import type { Timer } from '../../../types/timer.type';
import { checkIsTimerExpired } from '../../../utils/checkIsTimerExpired';
import { formatTimer } from '../../../utils/formatTimer';
import PublicTypeIcon from '../../publicTypeIcon/PublicTypeIcon';
import * as S from './SpaceHeader.styles';

interface IconProps {
  /** 아이콘 요소 */
  element: React.ReactNode;
  /** 아이콘 클릭 이벤트 */
  onClick: () => void;
  /** 아이콘 이름 */
  label: string;
}

interface SpaceHeaderProps {
  /** 헤더의 제목 */
  title: string;
  /** 헤더의 공개범위 */
  publicType?: SpacePublicType;
  /** 헤더의 타이머 */
  timer: Timer;
  /** 헤더 우상단 아이콘 */
  icons?: IconProps[];
}

const SpaceHeader = ({
  title,
  publicType = 'PUBLIC',
  timer,
  icons,
}: SpaceHeaderProps) => {
  const isExpired = checkIsTimerExpired(timer);
  const isWithinOneHour = timer.days === 0 && timer.hours === 0 && !isExpired;

  return (
    <S.Wrapper>
      <S.TitleIconContainer>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>
          <PublicTypeIcon publicType={publicType} color="white" />
        </S.TitleContainer>
        {icons && (
          <S.IconContainer>
            {icons.map((icon) => (
              <S.Icon key={icon.label} onClick={icon.onClick}>
                {icon.element}
              </S.Icon>
            ))}
          </S.IconContainer>
        )}
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
