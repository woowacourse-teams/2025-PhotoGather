import { useNavigate } from 'react-router-dom';
import {
  UpwardArrowIcon as ArrowUpSvg,
  ExternalLinkIcon,
} from '../../../@assets/icons';
import { MessageImg as messageIcon } from '../../../@assets/images';
import Button from '../../../components/@common/buttons/button/Button';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import GuestImageGrid from '../../../components/@common/imageLayout/imageGrid/guestImageGrid/GuestImageGrid';
import PhotoModal from '../../../components/@common/modal/photoModal/PhotoModal';
import SpaceHeader from '../../../components/header/spaceHeader/SpaceHeader';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import UploadBox from '../../../components/uploadBox/UploadBox';
import UserBadge from '../../../components/userBadge/UserBadge';
import { ROUTES } from '../../../constants/routes';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import useLeftTimer from '../../../hooks/@common/useLeftTimer';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import useFileUpload from '../../../hooks/useFileUpload';
import useGuestNickName from '../../../hooks/useGuestNickName';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import useSpaceInfo from '../../../hooks/useSpaceInfo';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea.styles';
import { theme } from '../../../styles/theme';
import { checkIsEarlyDate } from '../../../utils/checkIsEarlyTime';
import { track } from '../../../utils/googleAnalytics/track';
import { goToTop } from '../../../utils/goToTop';
import EarlyPage from '../../status/earlyPage/EarlyPage';
import ExpiredPage from '../../status/expiredPage/ExpiredPage';
import * as S from './ImageUploadPage.styles';

const ImageUploadPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const { spaceInfo } = useSpaceInfo(spaceCode ?? '');
  const isNoData = !spaceInfo;
  const isSpaceExpired = spaceInfo?.isExpired;
  const isEarlyTime =
    spaceInfo?.openedAt && checkIsEarlyDate(spaceInfo.openedAt);
  const shouldShowFakeUploadBox = isNoData || isEarlyTime || isSpaceExpired;

  const overlay = useOverlay();
  const navigate = useNavigate();

  const { nickName, guestId, showNickNameEditModal, tryCreateNickName } =
    useGuestNickName({
      spaceCode: spaceCode ?? '',
      shouldShowNickNameModal: !!spaceInfo && !isEarlyTime && !isSpaceExpired,
    });

  const navigateToUploadComplete = () => {
    navigate(ROUTES.COMPLETE.UPLOAD, {
      state: {
        spaceCode: spaceCode ?? '',
      },
    });
  };

  const spaceName = spaceInfo?.name ?? '';
  const {
    localFiles,
    previewFile,
    handleFilesUploadClick,
    handleFilesDrop,
    deleteFile,
    clearFiles,
  } = useLocalFile({
    fileType: 'image',
  });

  const { submitFileUpload, isUploading, total, success } = useFileUpload({
    localFiles: localFiles,
    spaceCode: spaceCode ?? '',
    onUploadSuccess: navigateToUploadComplete,
    nickName,
    clearFiles: clearFiles,
    guestId,
    tryCreateNickName,
  });

  const hasImages = Array.isArray(previewFile) && previewFile.length > 0;
  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });
  const { leftTime } = useLeftTimer({
    targetTime: (spaceInfo?.expiredAt as string) ?? '',
  });

  const deletePhotoWithTracking = async (id: number) => {
    deleteFile(id);
    track.button('single_delete_button', {
      page: 'image_upload_page',
      section: 'photo_modal',
      action: 'delete_single',
    });
  };

  const handleImageClick = async (photoId: number) => {
    const selectedPhoto = previewFile.find((photo) => photo.id === photoId);
    if (!selectedPhoto) return;

    await overlay(
      <PhotoModal
        mode="guest"
        previewFile={selectedPhoto}
        onDelete={async () => await deletePhotoWithTracking(photoId)}
      />,
      {
        clickOverlayClose: true,
      },
    );
  };

  //TODO: 진행률 아이콘 업데이트

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

  return (
    <S.Wrapper $hasImages={hasImages}>
      {isEarlyTime && <EarlyPage openedAt={spaceInfo.openedAt} />}
      {isSpaceExpired && <ExpiredPage />}
      {isUploading && (
        <LoadingLayout
          loadingContents={loadingContents}
          totalAmount={total ?? 10}
          currentAmount={success ?? 5}
        />
      )}
      <S.ScrollTopAnchor ref={scrollTopTriggerRef} />
      <SpaceHeader
        title={spaceName}
        timer={leftTime}
        accessType={spaceInfo?.type}
      />
      <S.ToolBar>
        <UserBadge
          nickName={nickName}
          onBadgeClick={() => showNickNameEditModal()}
        />
        <Button
          variant="tertiary"
          text="스페이스 관리 페이지"
          icon={<ExternalLinkIcon fill={theme.colors.gray03} width="16px" />}
          onClick={() => navigate(ROUTES.MANAGER.SPACE_HOME(spaceCode ?? ''))}
        />
      </S.ToolBar>
      <S.UploadContainer $hasImages={hasImages}>
        {shouldShowFakeUploadBox ? (
          <UploadBox
            mainText={''}
            uploadLimitText={''}
            iconSize={hasImages ? 60 : 100}
            onChange={handleFilesUploadClick}
            onDrop={handleFilesDrop}
            disabled={true}
          />
        ) : (
          <UploadBox
            mainText={`함께한 순간을 올려주세요.${hasImages ? '' : '\n사진만 올릴 수 있습니다.'}`}
            uploadLimitText={
              hasImages ? '' : '한 번에 500장까지 올릴 수 있어요'
            }
            iconSize={hasImages ? 60 : 100}
            onChange={handleFilesUploadClick}
            onDrop={handleFilesDrop}
            disabled={isUploading}
          />
        )}
      </S.UploadContainer>

      {hasImages && (
        <>
          <S.ButtonContainer>
            <FloatingActionButton
              label={
                <HighlightText
                  text={`사진 ${previewFile.length}장 업로드하기`}
                  fontStyle="buttonPrimary"
                  highlightColorStyle="gray04"
                  highlightTextArray={[`사진 ${previewFile.length}장`]}
                />
              }
              onClick={submitFileUpload}
              disabled={isUploading}
            />
          </S.ButtonContainer>
          <GuestImageGrid
            photoData={previewFile}
            rowImageAmount={3}
            onImageClick={handleImageClick}
            onDeleteClick={(id: number) => {
              deleteFile(id);
              track.button('grid_delete_button', {
                page: 'image_upload_page',
                section: 'image_grid',
                action: 'delete_single',
              });
            }}
          />
          <S.TopButtonContainer $isVisible={!isAtPageTop}>
            <FloatingIconButton
              icon={<ArrowUpSvg fill={theme.colors.white} />}
              onClick={goToTop}
            />
          </S.TopButtonContainer>
        </>
      )}
      <S.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} $position="bottom" />
    </S.Wrapper>
  );
};

export default ImageUploadPage;
