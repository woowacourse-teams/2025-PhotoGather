import type { SpaceAccessType } from '../../../../../types/space.type';
import type { Timer } from '../../../../../types/timer.type';
import IconLabelButton from '../../../../@common/buttons/iconLabelButton/IconLabelButton';
import SpaceHeader from '../SpaceHeader';

interface IconItem {
  /** 아이콘 요소 */
  element: React.ReactNode;
  /** 아이콘 클릭 이벤트 */
  onClick: () => void;
  /** 아이콘 라벨 */
  label: string;
  /** 아이콘 비활성화 여부 */
  disabled: boolean;
}

interface ManagerHeaderProps {
  /** 헤더의 제목 */
  title: string;
  /** 헤더의 공개범위 */
  accessType?: SpaceAccessType;
  /** 헤더의 타이머 */
  timer: Timer;
  /** 헤더의 아이콘 아이템 */
  iconItems: IconItem[];
}

const ManagerHeader = ({
  title,
  accessType = 'PRIVATE',
  timer,
  iconItems,
}: ManagerHeaderProps) => {
  return (
    <SpaceHeader>
      <SpaceHeader.TitleSection>
        <SpaceHeader.TitleContainer>
          <SpaceHeader.Title>{title}</SpaceHeader.Title>
          <SpaceHeader.AccessType accessType={accessType} />
        </SpaceHeader.TitleContainer>
        <SpaceHeader.Icons>
          {iconItems.map((icon) => (
            <IconLabelButton
              key={icon.label}
              onClick={icon.onClick}
              aria-label={icon.label}
              icon={icon.element}
              variant="default"
              disabled={icon.disabled}
            />
          ))}
        </SpaceHeader.Icons>
      </SpaceHeader.TitleSection>

      <SpaceHeader.Timer timer={timer} />
    </SpaceHeader>
  );
};

export default ManagerHeader;
