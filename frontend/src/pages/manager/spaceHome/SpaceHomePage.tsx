import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AddPhotoIcon,
  UpwardArrowIcon as ArrowUpSvg,
  LinkIcon,
  DownloadIcon as SaveIcon,
  SettingIcon,
  ShareIcon,
} from '../../../@assets/icons';
import { MessageImg as messageIcon } from '../../../@assets/images';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import IconLabelButton from '../../../components/@common/buttons/iconLabelButton/IconLabelButton';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import * as C from '../../../components/@common/modal/Modal.common.styles';
import PhotoModal from '../../../components/@common/modal/photoModal/PhotoModal';
import ManagerHeader from '../../../components/layout/header/spaceHeader/managerSpaceHeader/ManagerHeader';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import NoImageBox from '../../../components/specific/noImageBox/NoImageBox';
import PhotoSelectionToolBar from '../../../components/specific/photoSelectionToolBar/PhotoSelectionToolBar';
import SpaceHomeTopActionBar from '../../../components/specific/spaceHomeTopActionBar/SpaceHomeTopActionBar';
import { ROUTES } from '../../../constants/routes';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useLeftTimer from '../../../hooks/@common/useLeftTimer';
import { useToast } from '../../../hooks/@common/useToast';
import usePhotosDomain from '../../../hooks/domain/photos/usePhotosDomain';
import useSpaceDomain from '../../../hooks/domain/space/useSpaceDomain';
import useScrollUITriggers from '../../../hooks/domain/ui/useScrollUITriggers';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea.styles';
import { theme } from '../../../styles/theme';
import { checkIsEarlyDate } from '../../../utils/checkIsEarlyTime';
import { copyLinkToClipboard } from '../../../utils/copyLinkToClipboard';
import { createShareUrl } from '../../../utils/createSpaceUrl';
import { track } from '../../../utils/googleAnalytics/track';
import { goToTop } from '../../../utils/goToTop';
import AccessDeniedPage from '../../status/accessDeniedPage/AccessDeniedPage';
import EarlyPage from '../../status/earlyPage/EarlyPage';
import ExpiredPage from '../../status/expiredPage/ExpiredPage';
import * as S from './SpaceHomePage.styles';

const SpaceHomePage = () => {
  const overlay = useOverlay();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const scrollUITriggers = useScrollUITriggers();

  const { spaceCode, spaceInfoDomain, spaceAccessDomain } = useSpaceDomain();
  const spaceName = spaceInfoDomain.spaceInfo?.name ?? '';

  const {
    photosDomain,
    photoSelectDomain,
    photosDeleteDomain,
    infiniteScroll,
    downloadDomain,
  } = usePhotosDomain({ spaceCode: spaceCode ?? '', spaceName });

  const isEarlyTime =
    spaceInfoDomain.spaceInfo?.openedAt &&
    checkIsEarlyDate(spaceInfoDomain.spaceInfo.openedAt);
  const isSpaceExpired = spaceInfoDomain.spaceInfo?.isExpired;

  const { leftTime } = useLeftTimer({
    targetTime: (spaceInfoDomain.spaceInfo?.expiredAt as string) ?? '',
  });

  const clickDashboardWithTracking = () => {
    navigate(ROUTES.MANAGER.DASHBOARD(spaceCode ?? ''));
    track.button('space_setting_button', {
      page: 'space_home',
      section: 'space_home_header',
      action: 'open_setting',
    });
  };

  const deletePhotoWithTracking = async (photoId: number) => {
    await photosDeleteDomain.tryDeleteSinglePhoto(photoId);
    track.button('single_delete_button', {
      page: 'space_home',
      section: 'photo_modal',
      action: 'delete_single',
    });
  };

  const downloadPhotoWithTracking = async (photoId: number) => {
    await downloadDomain.trySingleDownload(photoId);
    track.button('single_download_button', {
      page: 'space_home',
      section: 'photo_modal',
      action: 'download_single',
    });
  };

  const clickUploadButtonWithTracking = () => {
    navigate(ROUTES.GUEST.IMAGE_UPLOAD(spaceCode ?? ''));
    track.button('space_upload_button', {
      page: 'space_home',
      section: 'space_home_header',
      action: 'open_upload',
    });
  };

  const openPhotoModal = async (photoId: number) => {
    await overlay(
      <PhotoModal
        mode="manager"
        photoId={photoId}
        spaceCode={spaceCode ?? ''}
        onDownload={async () => await downloadPhotoWithTracking(photoId)}
        onDelete={async () => await deletePhotoWithTracking(photoId)}
      />,
      {
        clickOverlayClose: true,
      },
    );
  };

  const handleImageClick = photoSelectDomain.isSelectMode
    ? photoSelectDomain.toggleSelectedPhoto
    : openPhotoModal;

  //biome-ignore lint/correctness/useExhaustiveDependencies: isFetchSectionVisible 변경 시 호출
  useEffect(() => {
    if (
      spaceInfoDomain.spaceInfoLoadingState !== 'success' ||
      spaceAccessDomain.accessLoadingState !== 'success'
    )
      return;

    if (
      !spaceAccessDomain.hasAccess ||
      isSpaceExpired ||
      isEarlyTime ||
      photosDomain.isEndPage
    )
      return;

    if (photosDomain.photosListLoadingState === 'loading') return;

    if (infiniteScroll.isFetchSectionVisible && !photosDomain.isEndPage) {
      photosDomain.tryFetchPhotosList();
    }
  }, [
    infiniteScroll.isFetchSectionVisible,
    photosDomain.isEndPage,
    isSpaceExpired,
    isEarlyTime,
    spaceAccessDomain.hasAccess,
    spaceAccessDomain.accessLoadingState,
    spaceInfoDomain.spaceInfoLoadingState,
    photosDomain.photosListLoadingState,
  ]);

  const loadingContents = [
    {
      icon: { src: messageIcon, alt: '로딩 아이콘' },
      description: '추억 담는 중',
    },
    {
      icon: { src: messageIcon, alt: '로딩 아이콘' },
      description: '선물 상자 포장하는 중',
    },
    {
      icon: { src: messageIcon, alt: '로딩 아이콘' },
      description: '배달 가는 중',
    },
    {
      icon: { src: messageIcon, alt: '로딩 아이콘' },
      description: '당신에게 전달 중',
    },
  ];

  const toggleShareModal = async () => {
    await overlay(
      <C.Wrapper>
        <S.ModalContentContainer>
          <IconLabelButton
            icon={<LinkIcon width="20px" />}
            variant="outline"
            onClick={() => {
              copyLinkToClipboard(createShareUrl(spaceCode ?? ''));
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

  const canAddPhoto =
    spaceAccessDomain.hasAccess && !isSpaceExpired && !isEarlyTime;
  const canShare = spaceAccessDomain.hasAccess && !isSpaceExpired;
  const canChangeSetting =
    spaceInfoDomain.spaceInfo?.host.id === spaceAccessDomain.hostId;

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

  const renderBottomNavigatorContent = () => {
    return (
      <S.BottomNavigatorContainer>
        <S.TopButtonContainer $isVisible={!scrollUITriggers.isAtPageTop}>
          {!photoSelectDomain.isSelectMode && (
            <FloatingIconButton
              icon={<ArrowUpSvg fill={theme.colors.white} />}
              onClick={goToTop}
            />
          )}
        </S.TopButtonContainer>
        {photoSelectDomain.isSelectMode && (
          <PhotoSelectionToolBar
            selectedCount={photoSelectDomain.selectedPhotosCount}
            onDelete={() =>
              photosDeleteDomain.tryDeleteSelectedPhotos(
                photoSelectDomain.selectedPhotoIds,
              )
            }
            onDownload={() =>
              downloadDomain.trySelectedDownload(
                photoSelectDomain.selectedPhotoIds,
              )
            }
          />
        )}
      </S.BottomNavigatorContainer>
    );
  };

  const renderBodyContent = () => {
    if (isEarlyTime)
      return <EarlyPage openedAt={spaceInfoDomain.spaceInfo?.openedAt ?? ''} />;
    if (isSpaceExpired) return <ExpiredPage />;
    if (
      spaceAccessDomain.accessLoadingState === 'success' &&
      !spaceAccessDomain.hasAccess
    )
      return <AccessDeniedPage />;
    if (
      photosDomain.photosListLoadingState === 'success' &&
      photosDomain.photosList.length === 0
    )
      return <NoImageBox />;
    if (photosDomain.photosList.length > 0)
      return (
        <>
          <S.ImageManagementContainer>
            <SpaceHomeTopActionBar
              isSelectMode={photoSelectDomain.isSelectMode}
              isAllSelected={photoSelectDomain.isAllSelected}
              onToggleSelectMode={photoSelectDomain.toggleSelectMode}
              onToggleAllSelected={photoSelectDomain.toggleAllSelected}
            />
            <SpaceManagerImageGrid
              isSelectMode={photoSelectDomain.isSelectMode}
              selectedPhotoMap={photoSelectDomain.selectedPhotoMap}
              photoData={photosDomain.photosList}
              thumbnailUrlList={photosDomain.thumbnailPhotoMap}
              rowImageAmount={3}
              onImageClick={handleImageClick}
            />
          </S.ImageManagementContainer>
          {!photoSelectDomain.isSelectMode && (
            <S.DownloadButtonContainer>
              <FloatingActionButton
                label="모두 저장하기"
                icon={<SaveIcon fill={theme.colors.gray06} />}
                onClick={() => {
                  downloadDomain.tryAllDownload();
                  track.button('all_download_button', {
                    page: 'space_home',
                    section: 'space_home',
                    action: 'download_all',
                  });
                }}
                disabled={downloadDomain.isDownloading}
              />
            </S.DownloadButtonContainer>
          )}
          {renderBottomNavigatorContent()}
        </>
      );
  };

  return (
    <S.Wrapper>
      {downloadDomain.isDownloading && (
        <LoadingLayout
          loadingContents={loadingContents}
          totalAmount={downloadDomain.totalProgress}
          currentAmount={downloadDomain.currentProgress}
        />
      )}

      <S.InfoContainer ref={scrollUITriggers.scrollTopTriggerRef}>
        <ManagerHeader
          title={spaceName}
          accessType={spaceInfoDomain.spaceInfo?.type}
          timer={leftTime}
          iconItems={iconItems}
        />
      </S.InfoContainer>

      <S.BodyContainer>{renderBodyContent()}</S.BodyContainer>

      <S.IntersectionArea ref={scrollUITriggers.hideBlurAreaTriggerRef} />
      <S.IntersectionArea ref={infiniteScroll.fetchTriggerRef} />
      <ScrollableBlurArea
        $isHide={scrollUITriggers.isAtPageBottom}
        $position="bottom"
      />
      <ScrollableBlurArea
        $isHide={scrollUITriggers.isAtPageTop}
        $position="top"
      />
    </S.Wrapper>
  );
};

export default SpaceHomePage;
