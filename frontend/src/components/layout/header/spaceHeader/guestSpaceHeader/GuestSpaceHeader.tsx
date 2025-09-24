import type { SpaceAccessType } from '../../../../types/space.type';
import type { Timer } from '../../../../types/timer.type';
import SpaceHeader from '../SpaceHeader';

interface GuestSpaceHeaderProps {
  /** 헤더의 제목 */
  title: string;
  /** 헤더의 공개범위 */
  accessType?: SpaceAccessType;
  /** 헤더의 타이머 */
  timer: Timer;
}

const GuestSpaceHeader = ({
  title,
  accessType = 'PRIVATE',
  timer,
}: GuestSpaceHeaderProps) => {
  return (
    <SpaceHeader>
      <SpaceHeader.TitleContainer>
        <SpaceHeader.Title>{title}</SpaceHeader.Title>
        <SpaceHeader.AccessType accessType={accessType} />
      </SpaceHeader.TitleContainer>

      <SpaceHeader.Timer timer={timer} />
    </SpaceHeader>
  );
};

export default GuestSpaceHeader;
