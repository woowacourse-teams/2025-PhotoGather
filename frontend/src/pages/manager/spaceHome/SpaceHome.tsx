import { ReactComponent as LinkIcon } from '@assets/icons/link.svg';
import { ReactComponent as ShareIcon } from '@assets/icons/share.svg';
import rocketIcon from '@assets/images/rocket.png';
import { useEffect, useState } from 'react';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import { photoService } from '../../../apis/services/photo.service';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import IconLabelButton from '../../../components/@common/buttons/iconLabelButton/IconLabelButton';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import BaseModal from '../../../components/@common/modal/baseModal/BaseModal';
import PhotoModal from '../../../components/@common/modal/PhotoModal';
import SpaceHeader from '../../../components/header/spaceHeader/SpaceHeader';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import PhotoSelectionToolBar from '../../../components/photoSelectionToolBar/PhotoSelectionToolBar';
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
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import useSpaceInfo from '../../../hooks/useSpaceInfo';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea';
import { theme } from '../../../styles/theme';
import { checkIsEarlyDate } from '../../../utils/checkIsEarlyTime';
import { copyLinkToClipboard } from '../../../utils/copyLinkToClipboard';
import { createShareUrl } from '../../../utils/createSpaceUrl';
import { goToTop } from '../../../utils/goToTop';
import EarlyPage from '../../status/earlyPage/EarlyPage';
import ExpiredPage from '../../status/expiredPage/ExpiredPage';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const { spaceInfo } = useSpaceInfo(spaceCode ?? '');
  const isEarlyTime = checkIsEarlyDate((spaceInfo?.openedAt as string) ?? '');
  // TODO: NoData 시 표시할 Layout 필요
  const _isNoData = !spaceInfo;
  const isSpaceExpired = spaceInfo?.isExpired;
  const spaceName = spaceInfo?.name ?? '';
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
    targetTime: (spaceInfo?.expiredAt as string) ?? '',
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
    spaceCode: spaceCode ?? '',
  });

  const { isDownloading, downloadAll, selectDownload } = useDownload({
    spaceCode: spaceCode ?? '',
    spaceName,
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

  const { submitDeletePhotos, isDeleting } = usePhotosDelete({
    spaceCode: spaceCode ?? '',
    toggleSelectMode,
    updatePhotos,
    fetchPhotosList,
    extractUnselectedPhotos,
  });

  const handleSinglePhotoDelete = async (photoId: number) => {
    try {
      await photoService.deletePhotos(spaceCode ?? '', {
        photoIds: [photoId],
      });
      showToast({
        text: '사진을 삭제했습니다.',
        type: 'info',
        position: 'top',
      });
      const updatedPhotos =
        photosList?.filter((photo) => photo.id !== photoId) || [];
      updatePhotos(updatedPhotos);
    } catch (error) {
      showToast({
        text: '삭제에 실패했습니다. 다시 시도해 주세요.',
        type: 'error',
        position: 'top',
      });
      console.error('삭제 실패:', error);
    }
  };

  const openPhotoModal = async (photoId: number) => {
    await overlay(
      <PhotoModal
        mode="manager"
        photoId={photoId}
        spaceCode={spaceCode ?? ''}
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

  const [isClicked, setIsClicked] = useState(false);

  const toggleShareModal = async () => {
    try {
      await overlay(
        <BaseModal>
          <IconLabelButton
            icon={<LinkIcon fill={theme.colors.white} width="20px" />}
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
        </BaseModal>,
        {
          clickOverlayClose: true,
        },
      );
    } catch (error) {
      console.error(`모달 실패 : ${error}`);
    }
  };

  return (
    <S.Wrapper>
      {/* TODO: 버튼 지우기 */}
      {isEarlyTime && !isClicked && (
        <>
          <EarlyPage openedAt={spaceInfo?.openedAt ?? ''} />
          <button
            style={{ zIndex: 10000 }}
            type="button"
            onClick={() => setIsClicked((prev) => !prev)}
          >
            닫기
          </button>
        </>
      )}
      {(isDownloading || isDeleting) && (
        <LoadingLayout loadingContents={loadingContents} percentage={0} />
      )}
      {isSpaceExpired && <ExpiredPage />}
      <S.InfoContainer ref={scrollTopTriggerRef}>
        <SpaceHeader
          title={spaceName}
          timer={leftTime}
          icons={[
            {
              element: <SettingSvg fill={theme.colors.white} width="20px" />,
              onClick: () => {},
              label: '설정',
            },
            {
              element: <ShareIcon fill={theme.colors.white} width="20px" />,
              onClick: toggleShareModal,
              label: '공유',
            },
          ]}
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
