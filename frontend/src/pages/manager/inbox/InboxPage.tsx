import { useEffect } from 'react';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import PhotoModal from '../../../components/@common/modal/photoModal/PhotoModal';
import NoImageBox from '../../../components/specific/noImageBox/NoImageBox';
import InboxHeader from '../../../components/specific/space/spaceHeader/inboxHeader/InboxHeader';
import SpaceHomeTopActionBar from '../../../components/specific/spaceHomeTopActionBar/SpaceHomeTopActionBar';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import usePhotosBySpaceCode from '../../../hooks/domain/photos/usePhotosBySpaceCode';
import useSpaceDomain from '../../../hooks/domain/space/useSpaceDomain';
import useScrollUITriggers from '../../../hooks/domain/ui/useScrollUITriggers';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea.styles';
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
  } = usePhotosBySpaceCode({
    reObserve,
    spaceCode: spaceInfo?.spaceCode ?? '',
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
        onDelete={() => {}}
      />,
      {
        clickOverlayClose: true,
      },
    );
  };

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
          <C.ImageManagementContainer>
            <SpaceHomeTopActionBar
              isSelectMode={false}
              isAllSelected={false}
              onToggleSelectMode={() => {}}
              onToggleAllSelected={() => {}}
            />
            <SpaceManagerImageGrid
              isSelectMode={false}
              selectedPhotoMap={new Map()}
              photoData={photosList}
              thumbnailUrlList={thumbnailPhotoMap}
              rowImageAmount={3}
              onImageClick={openPhotoModal}
            />
          </C.ImageManagementContainer>
          {/** Inbox footer 자리 */}
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
