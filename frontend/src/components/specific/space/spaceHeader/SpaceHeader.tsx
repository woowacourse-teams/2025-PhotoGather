import type { SpaceAccessType } from '../../../../types/space.type';
import type { Timer } from '../../../../types/timer.type';
import { checkIsTimerExpired } from '../../../../utils/checkIsTimerExpired';
import { formatTimer } from '../../../../utils/formatTimer';
import AccessTypeIcon from '../../../@common/accessTypeIcon/AccessTypeIcon';
import * as S from './SpaceHeader.styles';

const SpaceHeader = ({ children }: { children: React.ReactNode }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

SpaceHeader.TitleSection = ({ children }: { children: React.ReactNode }) => (
  <S.TitleIconContainer>{children}</S.TitleIconContainer>
);

SpaceHeader.TitleContainer = ({ children }: { children: React.ReactNode }) => (
  <S.TitleContainer>{children}</S.TitleContainer>
);

SpaceHeader.Title = ({ children }: { children: React.ReactNode }) => (
  <S.Title>{children}</S.Title>
);

SpaceHeader.AccessType = ({ accessType }: { accessType: SpaceAccessType }) => (
  <AccessTypeIcon accessType={accessType} color="white" />
);

SpaceHeader.Icons = ({ children }: { children: React.ReactNode }) => (
  <S.IconContainer>{children}</S.IconContainer>
);

SpaceHeader.Timer = ({ timer }: { timer: Timer }) => {
  const isExpired = checkIsTimerExpired(timer);
  const isWithinOneHour = timer.days === 0 && timer.hours === 0 && !isExpired;

  return (
    <S.TimerContainer>
      <S.ClockIconContainer $isWithinOneHour={isWithinOneHour} />
      <S.TextContainer $isWithinOneHour={isWithinOneHour}>
        {`스페이스 만료까지 ${formatTimer(timer)}`}
      </S.TextContainer>
    </S.TimerContainer>
  );
};

export default SpaceHeader;
