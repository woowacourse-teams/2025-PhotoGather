import { useEffect } from 'react';
import { CheckIcon, TrashCanIcon } from '../../../@assets/icons';
import { photoService } from '../../../apis/services/photo.service';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import PhotoModal from '../../../components/@common/modal/photoModal/PhotoModal';
import EmptySpaceBox from '../../../components/specific/emptySpaceBox/EmptySpaceBox';
import SpaceFooter from '../../../components/specific/space/spaceFooter/SpaceFooter';
import InboxHeader from '../../../components/specific/space/spaceHeader/inboxHeader/InboxHeader';
import SpaceHomeTopActionBar from '../../../components/specific/spaceHomeTopActionBar/SpaceHomeTopActionBar';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import usePhotoSelect from '../../../hooks/domain/photos/usePhotoSelect';
import usePhotosBySpaceCode from '../../../hooks/domain/photos/usePhotosBySpaceCode';
import usePhotosDelete from '../../../hooks/domain/photos/usePhotosDelete';
import useSpaceDomain from '../../../hooks/domain/space/useSpaceDomain';
import useScrollUITriggers from '../../../hooks/domain/ui/useScrollUITriggers';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea.styles';
import { theme } from '../../../styles/theme';
import { checkIsEarlyDate } from '../../../utils/checkIsEarlyTime';
import AccessDeniedPage from '../../status/accessDeniedPage/AccessDeniedPage';
import EarlyPage from '../../status/earlyPage/EarlyPage';
import ExpiredPage from '../../status/expiredPage/ExpiredPage';
import * as C from '../Manager.common.styles';

const InboxPage = () => {
  const overlay = useOverlay();

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
  const { hasAccess, accessLoadingState } = spaceAccessDomain;

  const {
    photosList,
    photosListLoadingState,
    tryFetchPhotosList,
    isEndPage,
    thumbnailPhotoMap,
    updatePhotos,
  } = usePhotosBySpaceCode({
    reObserve,
    spaceCode: spaceInfo?.spaceCode ?? '',
    // TODO:  API 개발 후 수정
    fetchFunc: photoService.getBySpaceCode,
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

  const { tryDeleteSelectedPhotos, tryDeleteSinglePhoto } = usePhotosDelete({
    spaceCode: spaceInfo?.spaceCode ?? '',
    toggleSelectMode: toggleSelectMode,
    updatePhotos: updatePhotos,
    tryFetchPhotosList: tryFetchPhotosList,
    extractUnselectedPhotos: extractUnselectedPhotos,
    photosList: photosList,
  });

  const isEarlyTime = checkIsEarlyDate(spaceInfo?.openedAt ?? '');
  const isSpaceExpired = spaceInfo?.isExpired;

  const openPhotoModal = async (photoId: number) => {
    await overlay(
      <PhotoModal
        mode="manager"
        photoId={photoId}
        spaceCode={spaceInfo?.spaceCode ?? ''}
        onDownload={() => {}}
        onDelete={() => {
          tryDeleteSinglePhoto(photoId);
        }}
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
      return <EmptySpaceBox />;
    if (photosList.length > 0)
      return (
        <>
          <C.ImageManagementContainer>
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
          </C.ImageManagementContainer>
          {/** TODO: onClick 함수 추후 구현 */}
          <SpaceFooter
            isAtPageTop={isAtPageTop}
            isSelectMode={isSelectMode}
            selectedPhotosCount={selectedPhotosCount}
            leftIconAction={{
              icon: <TrashCanIcon fill={theme.colors.white} width={16} />,
              onClick: () => tryDeleteSelectedPhotos(selectedPhotoIds),
            }}
            rightIconAction={{
              icon: <CheckIcon fill={theme.colors.white} width={24} />,
              onClick: () => {},
            }}
          />
        </>
      );
  };

  return (
    <C.Wrapper>
      <C.HeaderContainer ref={scrollTopTriggerRef}>
        <InboxHeader spaceName={spaceInfo?.name ?? ''} />
      </C.HeaderContainer>

      <C.BodyContainer>{renderBodyContent()}</C.BodyContainer>

      <C.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <C.IntersectionArea ref={fetchTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} $position="bottom" />
      <ScrollableBlurArea $isHide={isAtPageTop} $position="top" />
    </C.Wrapper>
  );
};

export default InboxPage;
