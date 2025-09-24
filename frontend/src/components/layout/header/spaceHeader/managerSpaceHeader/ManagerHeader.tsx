import { useNavigate } from 'react-router-dom';
import {
  AddPhotoIcon,
  LinkIcon,
  SettingIcon,
  ShareIcon,
} from '../../../../../@assets/icons';
import { ROUTES } from '../../../../../constants/routes';
import { useOverlay } from '../../../../../contexts/OverlayProvider';
import useLeftTimer from '../../../../../hooks/@common/useLeftTimer';
import { useToast } from '../../../../../hooks/@common/useToast';
import type { SpaceAccessType } from '../../../../../types/space.type';
import { copyLinkToClipboard } from '../../../../../utils/copyLinkToClipboard';
import { createShareUrl } from '../../../../../utils/createSpaceUrl';
import { track } from '../../../../../utils/googleAnalytics/track';
import IconLabelButton from '../../../../@common/buttons/iconLabelButton/IconLabelButton';
import * as C from '../../../../@common/modal/Modal.common.styles';
import SpaceHeader from '../SpaceHeader';
import * as S from './ManagerHeader.styles';

interface ManagerHeaderProps {
  /** 스페이스 이름 */
  spaceName: string;
  /** 스페이스 코드 */
  spaceCode: string;
  /** 스페이스 매니저 아이디 */
  managerId: number;
  /** 스페이스 만료 시간s */
  expiredAt: string;
  /** 헤더의 공개범위 */
  hasAccess: boolean;
  /** 스페이스 접근 타입 */
  accessType: SpaceAccessType;
  /** 헤더의 공개범위 */
  isSpaceExpired: boolean;
  /** 헤더의 공개범위 */
  isEarlyTime: boolean;
  /** 접속한 사람의 id */
  loggedInUserId: number;
}

const ManagerHeader = ({
  spaceName,
  spaceCode,
  managerId,
  expiredAt,
  hasAccess,
  accessType,
  isSpaceExpired,
  isEarlyTime,
  loggedInUserId,
}: ManagerHeaderProps) => {
  // TODO : spaceInfo를 이 내부에서 불러오도록 한다면?
  // TODO : 전역에서 내려주는 loggedInUserId로 변경
  const overlay = useOverlay();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { leftTime } = useLeftTimer({
    targetTime: String(expiredAt),
  });

  const canAddPhoto = hasAccess && !isSpaceExpired && !isEarlyTime;
  const canShare = hasAccess && !isSpaceExpired;
  const canChangeSetting = managerId === loggedInUserId;

  const clickDashboardWithTracking = () => {
    navigate(ROUTES.MANAGER.DASHBOARD(spaceCode));
    track.button('space_setting_button', {
      page: 'space_home',
      section: 'space_home_header',
      action: 'open_setting',
    });
  };

  const clickUploadButtonWithTracking = () => {
    navigate(ROUTES.GUEST.IMAGE_UPLOAD(spaceCode));
    track.button('space_upload_button', {
      page: 'space_home',
      section: 'space_home_header',
      action: 'open_upload',
    });
  };

  const toggleShareModal = async () => {
    await overlay(
      <C.Wrapper>
        <S.ModalContentContainer>
          <IconLabelButton
            icon={<LinkIcon width="20px" />}
            variant="outline"
            onClick={() => {
              copyLinkToClipboard(createShareUrl(spaceCode));
              showToast({
                text: '링크가 복사되었습니다.',
                type: 'info',
                position: 'top',
              });
            }}
            label="업로드 링크"
          />
        </S.ModalContentContainer>
      </C.Wrapper>,
      {
        clickOverlayClose: true,
      },
    );
  };

  const iconItems = [
    {
      element: <AddPhotoIcon width="20px" />,
      onClick: clickUploadButtonWithTracking,
      disabled: !canAddPhoto,
      label: '업로드',
    },
    {
      element: <ShareIcon width="20px" />,
      onClick: toggleShareModal,
      disabled: !canShare,
      label: '공유',
    },
    {
      element: <SettingIcon width="20px" />,
      onClick: clickDashboardWithTracking,
      disabled: !canChangeSetting,
      label: '설정',
    },
  ];
  return (
    <SpaceHeader>
      <SpaceHeader.TitleSection>
        <SpaceHeader.TitleContainer>
          <SpaceHeader.Title>{spaceName}</SpaceHeader.Title>
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

      <SpaceHeader.Timer timer={leftTime} />
    </SpaceHeader>
  );
};

export default ManagerHeader;
