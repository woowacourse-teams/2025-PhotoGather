import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadIcon } from '../../../@assets/icons';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import PhotoModal from '../../../components/@common/modal/photoModal/PhotoModal';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import NoImageBox from '../../../components/specific/noImageBox/NoImageBox';
import SpaceFooter from '../../../components/specific/space/spaceFooter/SpaceFooter';
import ManagerHeader from '../../../components/specific/space/spaceHeader/managerSpaceHeader/ManagerHeader';
import SpaceHomeTopActionBar from '../../../components/specific/spaceHomeTopActionBar/SpaceHomeTopActionBar';
import { loadingContents } from '../../../constants/loadingContents';
import { ROUTES } from '../../../constants/routes';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import useDownload from '../../../hooks/domain/photos/useDownload';
import usePhotoSelect from '../../../hooks/domain/photos/usePhotoSelect';
import usePhotosBySpaceCode from '../../../hooks/domain/photos/usePhotosBySpaceCode';
import usePhotosDelete from '../../../hooks/domain/photos/usePhotosDelete';
import useSpaceDomain from '../../../hooks/domain/space/useSpaceDomain';
import useScrollUITriggers from '../../../hooks/domain/ui/useScrollUITriggers';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea.styles';
import { theme } from '../../../styles/theme';
import { checkIsEarlyDate } from '../../../utils/checkIsEarlyTime';
import { track } from '../../../utils/googleAnalytics/track';
import AccessDeniedPage from '../../status/accessDeniedPage/AccessDeniedPage';
import EarlyPage from '../../status/earlyPage/EarlyPage';
import ExpiredPage from '../../status/expiredPage/ExpiredPage';
import * as S from './SpaceHomePage.styles';

const SpaceHomePage = () => {
  const overlay = useOverlay();
  const navigate = useNavigate();

  const {
    isAtPageBottom,
    isAtPageTop,
    scrollTopTriggerRef,
    hideBlurAreaTriggerRef,
  } = useScrollUITriggers();

  const {
    targetRef: fetchTriggerRef,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({ rootMargin: '200px' });

  const { spaceInfoDomain, spaceAccessDomain } = useSpaceDomain();
  const { spaceInfo, spaceInfoLoadingState } = spaceInfoDomain;
  const { hasAccess, accessLoadingState, loggedInUserId } = spaceAccessDomain;

  const {
    photosList,
    photosListLoadingState,
    tryFetchPhotosList,
    updatePhotos,
    isEndPage,
    thumbnailPhotoMap,
  } = usePhotosBySpaceCode({
    reObserve,
    spaceCode: spaceInfo?.spaceCode ?? '',
  });

  const {
    toggleSelectMode,
    toggleAllSelected,
    isAllSelected,
    isSelectMode,
    toggleSelectedPhoto,
    selectedPhotoMap,
    selectedPhotosCount,
    selectedPhotoIds,
    extractUnselectedPhotos,
  } = usePhotoSelect({
    photosList: photosList ?? [],
  });

  const { tryDeleteSinglePhoto, tryDeleteSelectedPhotos } = usePhotosDelete({
    spaceCode: spaceInfo?.spaceCode ?? '',
    toggleSelectMode: toggleSelectMode,
    updatePhotos: updatePhotos,
    tryFetchPhotosList: tryFetchPhotosList,
    extractUnselectedPhotos: extractUnselectedPhotos,
    photosList: photosList,
  });

  const {
    trySingleDownload,
    trySelectedDownload,
    tryAllDownload,
    isDownloading,
    totalProgress,
    currentProgress,
  } = useDownload({
    spaceCode: spaceInfo?.spaceCode ?? '',
    spaceName: spaceInfo?.name ?? '',
    onDownloadSuccess: () => {
      navigate(ROUTES.COMPLETE.DOWNLOAD, {
        state: {
          spaceCode: spaceInfo?.spaceCode ?? '',
        },
      });
    },
  });

  const isEarlyTime = checkIsEarlyDate(spaceInfo?.openedAt ?? '');
  const isSpaceExpired = spaceInfo?.isExpired;

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

  const openPhotoModal = async (photoId: number) => {
    await overlay(
      <PhotoModal
        mode="manager"
        photoId={photoId}
        spaceCode={spaceInfo?.spaceCode ?? ''}
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
    if (spaceInfoLoadingState !== 'success' || accessLoadingState !== 'success')
      return;

    if (!hasAccess || isSpaceExpired || isEarlyTime || isEndPage) return;

    if (photosListLoadingState === 'loading') return;

    if (isFetchSectionVisible && !isEndPage) {
      tryFetchPhotosList();
    }
  }, [
    isFetchSectionVisible,
    isEndPage,
    isSpaceExpired,
    isEarlyTime,
    hasAccess,
    accessLoadingState,
    spaceInfoLoadingState,
    photosListLoadingState,
  ]);

  const renderBodyContent = () => {
    if (isEarlyTime) return <EarlyPage openedAt={spaceInfo?.openedAt ?? ''} />;
    if (isSpaceExpired) return <ExpiredPage />;
    if (accessLoadingState === 'success' && !hasAccess)
      return <AccessDeniedPage />;
    if (photosListLoadingState === 'success' && photosList?.length === 0)
      return <NoImageBox />;
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

          <SpaceFooter
            isAtPageTop={isAtPageTop}
            isSelectMode={isSelectMode}
            selectedPhotosCount={selectedPhotosCount}
            selectedPhotoIds={selectedPhotoIds}
            tryDeleteSelectedPhotos={tryDeleteSelectedPhotos}
            trySelectedDownload={trySelectedDownload}
          />
          {!isSelectMode && (
            <S.DownloadButtonContainer>
              <FloatingActionButton
                label="모두 저장하기"
                icon={<DownloadIcon fill={theme.colors.gray06} />}
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

      <S.HeaderContainer ref={scrollTopTriggerRef}>
        <ManagerHeader
          spaceName={spaceInfo?.name ?? ''}
          spaceCode={spaceInfo?.spaceCode ?? ''}
          expiredAt={spaceInfo?.expiredAt ?? ''}
          accessType={spaceInfo?.type ?? 'PRIVATE'}
          hasAccess={hasAccess}
          isSpaceExpired={isSpaceExpired ?? false}
          isEarlyTime={isEarlyTime ?? false}
          managerId={spaceInfo?.host.id ?? 0}
          loggedInUserId={loggedInUserId ?? 0}
        />
      </S.HeaderContainer>

      <S.BodyContainer>{renderBodyContent()}</S.BodyContainer>

      <S.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <S.IntersectionArea ref={fetchTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} $position="bottom" />
      <ScrollableBlurArea $isHide={isAtPageTop} $position="top" />
    </S.Wrapper>
  );
};

export default SpaceHomePage;
