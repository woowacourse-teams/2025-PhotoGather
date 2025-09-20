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
import {
  GiftImg as GiftIcon,
  MessageImg as messageIcon,
} from '../../../@assets/images';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import IconLabelButton from '../../../components/@common/buttons/iconLabelButton/IconLabelButton';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import * as C from '../../../components/@common/modal/Modal.common.styles';
import PhotoModal from '../../../components/@common/modal/photoModal/PhotoModal';
import SpaceManagerSpaceHeader from '../../../components/header/spaceHeader/spaceManagerSpaceHeader/SpaceManagerSpaceHeader';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import PhotoSelectionToolBar from '../../../components/photoSelectionToolBar/PhotoSelectionToolBar';
import SpaceHomeTopActionBar from '../../../components/spaceHomeTopActionBar/SpaceHomeTopActionBar';
import { INFORMATION } from '../../../constants/messages';
import { ROUTES } from '../../../constants/routes';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import useLeftTimer from '../../../hooks/@common/useLeftTimer';
import { useToast } from '../../../hooks/@common/useToast';
import useSpaceAccess from '../../../hooks/domain/useSpaceAccess';
import useDownload from '../../../hooks/useDownload';
import usePhotoSelect from '../../../hooks/usePhotoSelect';
import usePhotosBySpaceCode from '../../../hooks/usePhotosBySpaceCode';
import usePhotosDelete from '../../../hooks/usePhotosDelete';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import useSpaceInfo from '../../../hooks/useSpaceInfo';
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

  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });
  const {
    targetRef: fetchTriggerRef,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({ rootMargin: '200px' });

  const { spaceCode } = useSpaceCodeFromPath();

  const { spaceInfo } = useSpaceInfo(spaceCode ?? '');
  const spaceName = spaceInfo?.name ?? '';
  const isEarlyTime =
    spaceInfo?.openedAt && checkIsEarlyDate(spaceInfo.openedAt);
  const isSpaceExpired = spaceInfo?.isExpired;

  const { hasAccess, isLoadingAccess } = useSpaceAccess(spaceInfo?.host.id);

  const {
    photosList,
    thumbnailPhotoMap,
    isEndPage,
    tryFetchPhotosList,
    updatePhotos,
  } = usePhotosBySpaceCode({
    reObserve,
    spaceCode: spaceCode ?? '',
  });

  const {
    isDownloading,
    tryAllDownload,
    trySelectedDownload,
    trySingleDownload,
    totalProgress,
    currentProgress,
  } = useDownload({
    spaceCode: spaceCode ?? '',
    spaceName,
    onDownloadSuccess: () => {
      navigate(ROUTES.COMPLETE.DOWNLOAD, {
        state: {
          spaceCode: spaceCode ?? '',
        },
      });
    },
  });

  const { leftTime } = useLeftTimer({
    targetTime: (spaceInfo?.expiredAt as string) ?? '',
  });

  const {
    isSelectMode,
    toggleSelectMode,
    selectedPhotoMap,
    selectedPhotosCount,
    toggleSelectedPhoto,
    extractUnselectedPhotos,
    selectedPhotoIds,
    isAllSelected,
    toggleAllSelected,
  } = usePhotoSelect({ photosList: photosList ?? [] });

  const { tryDeleteSelectedPhotos, tryDeleteSinglePhoto } = usePhotosDelete({
    spaceCode: spaceCode ?? '',
    toggleSelectMode,
    updatePhotos,
    tryFetchPhotosList,
    extractUnselectedPhotos,
    photosList,
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
    await tryDeleteSinglePhoto(photoId);
    track.button('single_delete_button', {
      page: 'space_home',
      section: 'photo_modal',
      action: 'delete_single',
    });
  };

  const downloadPhotoWithTracking = async (photoId: number) => {
    await trySingleDownload(photoId);
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

  const handleImageClick = isSelectMode ? toggleSelectedPhoto : openPhotoModal;

  //biome-ignore lint/correctness/useExhaustiveDependencies: isFetchSectionVisible 변경 시 호출
  useEffect(() => {
    if (isSpaceExpired || isEarlyTime || !hasAccess) return;
    if (!isFetchSectionVisible || isEndPage) return;

    tryFetchPhotosList();
  }, [
    isFetchSectionVisible,
    isEndPage,
    isSpaceExpired,
    isEarlyTime,
    hasAccess,
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

  const canAddPhoto = hasAccess && !isSpaceExpired && !isEarlyTime;
  const canShare = hasAccess && !isSpaceExpired;
  const canChangeSetting = hasAccess;

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
        <S.TopButtonContainer $isVisible={!isAtPageTop}>
          {!isSelectMode && (
            <FloatingIconButton
              icon={<ArrowUpSvg fill={theme.colors.white} />}
              onClick={goToTop}
            />
          )}
        </S.TopButtonContainer>
        {isSelectMode && (
          <PhotoSelectionToolBar
            selectedCount={selectedPhotosCount}
            onDelete={() => tryDeleteSelectedPhotos(selectedPhotoIds)}
            onDownload={() => trySelectedDownload(selectedPhotoIds)}
          />
        )}
      </S.BottomNavigatorContainer>
    );
  };

  const renderBodyContent = () => {
    if (isEarlyTime) return <EarlyPage openedAt={spaceInfo.openedAt} />;
    if (!hasAccess && !isLoadingAccess) return <AccessDeniedPage />;
    if (isSpaceExpired) return <ExpiredPage />;
    if (photosList.length === 0)
      return (
        <S.NoImageContainer>
          <S.GiftIconImage src={GiftIcon} />
          <S.NoImageText>{INFORMATION.NO_IMAGE}</S.NoImageText>
        </S.NoImageContainer>
      );
    if (photosList.length > 0)
      return (
        <>
          <S.ImageManagementContainer>
            <SpaceHomeTopActionBar
              isSelectMode={isSelectMode}
              isAllSelected={isAllSelected}
              onToggleSelectMode={toggleSelectMode}
              onToggleAllSelected={toggleAllSelected}
            />
            <SpaceManagerImageGrid
              isSelectMode={isSelectMode}
              selectedPhotoMap={selectedPhotoMap}
              photoData={photosList}
              thumbnailUrlList={thumbnailPhotoMap}
              rowImageAmount={3}
              onImageClick={handleImageClick}
            />
          </S.ImageManagementContainer>
          {!isSelectMode && (
            <S.DownloadButtonContainer>
              <FloatingActionButton
                label="모두 저장하기"
                icon={<SaveIcon fill={theme.colors.gray06} />}
                onClick={() => {
                  tryAllDownload();
                  track.button('all_download_button', {
                    page: 'space_home',
                    section: 'space_home',
                    action: 'download_all',
                  });
                }}
                disabled={isDownloading}
              />
            </S.DownloadButtonContainer>
          )}
          {renderBottomNavigatorContent()}
        </>
      );
  };

  return (
    <S.Wrapper>
      {isDownloading && (
        <LoadingLayout
          loadingContents={loadingContents}
          totalAmount={totalProgress}
          currentAmount={currentProgress}
        />
      )}

      <S.InfoContainer ref={scrollTopTriggerRef}>
        <SpaceManagerSpaceHeader
          title={spaceName}
          accessType={spaceInfo?.type}
          timer={leftTime}
          iconItems={iconItems}
        />
      </S.InfoContainer>

      <S.BodyContainer>{renderBodyContent()}</S.BodyContainer>

      <S.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <S.IntersectionArea ref={fetchTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} $position="bottom" />
      <ScrollableBlurArea $isHide={isAtPageTop} $position="top" />
    </S.Wrapper>
  );
};

export default SpaceHomePage;
