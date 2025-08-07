import rocketIcon from '@assets/images/rocket.png';
import { useEffect } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import PhotoModal from '../../../components/modal/PhotoModal';
import PhotoSelectionToolBar from '../../../components/photoSelectionToolBar/PhotoSelectionToolBar';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import SpaceHomeTopActionBar from '../../../components/spaceHomeTopActionBar/SpaceHomeTopActionBar';
import { INFORMATION } from '../../../constants/messages';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import useLeftTimer from '../../../hooks/@common/useLeftTimer';
import useDownload from '../../../hooks/useDownload';
import usePhotoSelect from '../../../hooks/usePhotoSelect';
import usePhotosBySpaceCode from '../../../hooks/usePhotosBySpaceCode';
import usePhotosDelete from '../../../hooks/usePhotosDelete';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea';
import { theme } from '../../../styles/theme';
import { goToTop } from '../../../utils/goToTop';
import { mockSpaceData } from './mockSpaceData';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });
  const {
    targetRef: fetchTriggerRef,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({ rootMargin: '200px' });

  const { leftTime } = useLeftTimer({
    targetTime: mockSpaceData.expirationDate,
  });

  const overlay = useOverlay();

  const {
    photosList,
    isLoading,
    thumbnailPhotoMap,
    isEndPage,
    fetchPhotosList,
    updatePhotos,
  } = usePhotosBySpaceCode({
    reObserve,
    spaceCode: mockSpaceData.code,
  });

  const { isDownloading, downloadAll, selectDownload } = useDownload({
    spaceName: mockSpaceData.name,
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

  const { submitDeletePhotos } = usePhotosDelete({
    toggleSelectMode,
    updatePhotos,
    fetchPhotosList,
    extractUnselectedPhotos,
  });

  const openPhotoModal = async (photoId: number) => {
    await overlay(
      <PhotoModal
        mode="manager"
        photoId={photoId}
        spaceCode={mockSpaceData.code}
        uploaderName="알 수 없음"
        onDownload={() => {
          // 다운로드 로직 구현
          console.log('Download photo:', photoId);
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
    if (!isFetchSectionVisible || isEndPage || isLoading) return;
    fetchPhotosList();
  }, [isFetchSectionVisible, isEndPage]);

  const loadingContents = [
    {
      icon: { src: rocketIcon, alt: '데모 페이지 아이콘' },
      description: '로딩 텍스트 1',
    },
    {
      icon: { src: rocketIcon, alt: '데모 페이지 아이콘' },
      description: '로딩 텍스트 2',
    },
    {
      icon: { src: rocketIcon, alt: '데모 페이지 아이콘' },
      description: '로딩 텍스트 2',
    },
    {
      icon: { src: rocketIcon, alt: '데모 페이지 아이콘' },
      description: '로딩 텍스트 2',
    },
  ];

  if (isDownloading) {
    return (
      <S.Wrapper>
        <LoadingLayout loadingContents={loadingContents} percentage={0} />
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.InfoContainer ref={scrollTopTriggerRef}>
        <SpaceHeader
          title={mockSpaceData.name}
          timer={leftTime}
          icon={
            <SettingSvg
              fill={theme.colors.primary20}
              width="24px"
              height="24px"
            />
          }
        />
      </S.InfoContainer>

      {photosList &&
        (photosList.length > 0 ? (
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
                  onClick={downloadAll}
                  disabled={isDownloading}
                />
              </S.DownloadButtonContainer>
            )}

            <S.BottomNavigatorContainer>
              <S.TopButtonContainer $isVisible={!isAtPageTop}>
                <FloatingIconButton
                  icon={<ArrowUpSvg fill={theme.colors.white} />}
                  onClick={goToTop}
                />
              </S.TopButtonContainer>
              {isSelectMode && (
                <PhotoSelectionToolBar
                  selectedCount={selectedPhotosCount}
                  onDelete={() => submitDeletePhotos(selectedPhotoIds)}
                  onDownload={() => selectDownload(selectedPhotoIds)}
                />
              )}
            </S.BottomNavigatorContainer>
          </>
        ) : (
          <S.NoImageContainer>
            <S.Icon />
            <S.NoImageText>{INFORMATION.NO_IMAGE}</S.NoImageText>
          </S.NoImageContainer>
        ))}

      <S.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <S.IntersectionArea ref={fetchTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} $position="bottom" />
      <ScrollableBlurArea $isHide={isAtPageTop} $position="top" />
    </S.Wrapper>
  );
};

export default SpaceHome;
