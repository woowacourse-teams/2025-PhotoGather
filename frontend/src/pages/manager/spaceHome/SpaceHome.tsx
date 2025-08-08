import rocketIcon from '@assets/images/rocket.png';
import { useEffect } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import { photoService } from '../../../apis/services/photo.service';
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
import { useToast } from '../../../hooks/@common/useToast';
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
  const { showToast } = useToast();

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
    spaceCode: mockSpaceData.code,
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

  const handleSinglePhotoDelete = async (photoId: number) => {
    try {
      await photoService.deletePhotos(mockSpaceData.code, {
        photoIds: [photoId],
      });
      showToast({
        text: '사진을 삭제했습니다.',
        type: 'info',
      });
      const updatedPhotos =
        photosList?.filter((photo) => photo.id !== photoId) || [];
      updatePhotos(updatedPhotos);
    } catch (error) {
      showToast({
        text: '삭제에 실패했습니다. 다시 시도해 주세요.',
        type: 'error',
      });
      console.error('삭제 실패:', error);
    }
  };

  const openPhotoModal = async (photoId: number) => {
    await overlay(
      <PhotoModal
        mode="manager"
        photoId={photoId}
        spaceCode={mockSpaceData.code}
        uploaderName="익명의 우주여행자"
        onDownload={() => {
          selectDownload([photoId]);
        }}
        onDelete={handleSinglePhotoDelete}
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
