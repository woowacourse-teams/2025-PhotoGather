import { ReactComponent as LinkIcon } from '@assets/icons/link.svg';
import { ReactComponent as ShareIcon } from '@assets/icons/share.svg';
import messageIcon from '@assets/images/message.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import IconLabelButton from '../../../components/@common/buttons/iconLabelButton/IconLabelButton';
import SpaceManagerImageGrid from '../../../components/@common/imageLayout/imageGrid/spaceManagerImageGrid/SpaceManagerImageGrid';
import * as C from '../../../components/@common/modal/Modal.common.styles';
import PhotoModal from '../../../components/@common/modal/photoModal/PhotoModal';
import SpaceHeader from '../../../components/header/spaceHeader/SpaceHeader';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import PhotoSelectionToolBar from '../../../components/photoSelectionToolBar/PhotoSelectionToolBar';
import SpaceHomeTopActionBar from '../../../components/spaceHomeTopActionBar/SpaceHomeTopActionBar';
import { INFORMATION } from '../../../constants/messages';
import { ROUTES } from '../../../constants/routes';
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
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea.styles';
import { theme } from '../../../styles/theme';
import { checkIsEarlyDate } from '../../../utils/checkIsEarlyTime';
import { copyLinkToClipboard } from '../../../utils/copyLinkToClipboard';
import { createShareUrl, createSpaceUrl } from '../../../utils/createSpaceUrl';
import { track } from '../../../utils/googleAnalytics/track';
import { goToTop } from '../../../utils/goToTop';
import EarlyPage from '../../status/earlyPage/EarlyPage';
import ExpiredPage from '../../status/expiredPage/ExpiredPage';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const { spaceInfo } = useSpaceInfo(spaceCode ?? '');
  const isEarlyTime =
    spaceInfo?.openedAt && checkIsEarlyDate(spaceInfo.openedAt);
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
    tryFetchPhotosList,
    updatePhotos,
  } = usePhotosBySpaceCode({
    reObserve,
    spaceCode: spaceCode ?? '',
  });

  const navigate = useNavigate();

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

  const { tryDeleteSelectedPhotos, tryDeleteSinglePhoto, isDeleting } =
    usePhotosDelete({
      spaceCode: spaceCode ?? '',
      toggleSelectMode,
      updatePhotos,
      tryFetchPhotosList,
      extractUnselectedPhotos,
      photosList,
    });

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
        spaceCode={spaceCode ?? ''}
        uploaderName="익명의 우주여행자"
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
    if (!isFetchSectionVisible || isEndPage || isLoading) return;
    tryFetchPhotosList();
  }, [isFetchSectionVisible, isEndPage]);

  const loadingContents = [
    {
      icon: { src: messageIcon, alt: '데모 페이지 아이콘' },
      description: '추억 담는 중',
    },
    {
      icon: { src: messageIcon, alt: '데모 페이지 아이콘' },
      description: '선물 상자 포장하는 중',
    },
    {
      icon: { src: messageIcon, alt: '데모 페이지 아이콘' },
      description: '배달 가는 중',
    },
    {
      icon: { src: messageIcon, alt: '데모 페이지 아이콘' },
      description: '당신에게 전달 중',
    },
  ];

  const toggleShareModal = async () => {
    try {
      await overlay(
        <C.Wrapper>
          <S.ModalContentContainer>
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
            <IconLabelButton
              icon={<LinkIcon fill={theme.colors.white} width="20px" />}
              onClick={() => {
                copyLinkToClipboard(createSpaceUrl(spaceCode ?? ''));
                showToast({
                  text: '링크가 복사되었습니다.',
                  type: 'info',
                  position: 'top',
                });
              }}
              label="스페이스 링크"
            />
          </S.ModalContentContainer>
        </C.Wrapper>,
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
      {isEarlyTime && <EarlyPage openedAt={spaceInfo.openedAt} />}
      {(isDownloading || isDeleting) && (
        <LoadingLayout
          loadingContents={loadingContents}
          totalAmount={totalProgress}
          currentAmount={currentProgress}
        />
      )}
      {isSpaceExpired && <ExpiredPage />}
      <S.InfoContainer ref={scrollTopTriggerRef}>
        <SpaceHeader
          title={spaceName}
          timer={leftTime}
          icons={[
            {
              element: <SettingSvg fill={theme.colors.white} width="20px" />,
              onClick: () => {
                track.button('space_setting_button', {
                  page: 'space_home',
                  section: 'space_home_header',
                  action: 'open_setting',
                });
              },
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
                  onDelete={() => tryDeleteSelectedPhotos(selectedPhotoIds)}
                  onDownload={() => trySelectedDownload(selectedPhotoIds)}
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
