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
import UserBadge from '../../../components/@common/userBadge/UserBadge';
import LoadingLayout from '../../../components/layout/loadingLayout/LoadingLayout';
import GuestSpaceHeader from '../../../components/specific/space/spaceHeader/guestSpaceHeader/GuestSpaceHeader';
import UploadBox from '../../../components/specific/uploadBox/UploadBox';
import { ROUTES } from '../../../constants/routes';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useLeftTimer from '../../../hooks/@common/useLeftTimer';
import useGuestNickName from '../../../hooks/domain/guest/useGuestNickName';
import useFileUpload from '../../../hooks/domain/photos/useFileUpload';
import useLocalFile from '../../../hooks/domain/photos/useLocalFile';
import useSpaceCodeFromPath from '../../../hooks/domain/space/useSpaceCodeFromPath';
import useSpaceInfo from '../../../hooks/domain/space/useSpaceInfo';
import useScrollUITriggers from '../../../hooks/domain/ui/useScrollUITriggers';
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
  const { spaceInfo, spaceInfoLoadingState } = useSpaceInfo(spaceCode ?? '');
  const isNoData = !spaceInfo;
  const isSpaceExpired = spaceInfo ? spaceInfo.isExpired : false;
  const isEarlyTime = spaceInfo
    ? spaceInfo.openedAt && checkIsEarlyDate(spaceInfo.openedAt)
    : false;
  const shouldShowFakeUploadBox = isNoData || isEarlyTime || isSpaceExpired;

  const overlay = useOverlay();
  const navigate = useNavigate();

  const { nickName, guestId, showNickNameEditModal, tryCreateNickName } =
    useGuestNickName({
      spaceCode: spaceCode ?? '',
      shouldShowNickNameModal:
        spaceInfoLoadingState === 'success' && !isEarlyTime && !isSpaceExpired,
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
  const scrollUITriggers = useScrollUITriggers();
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
      {isEarlyTime && (
        <EarlyPage openedAt={spaceInfo ? spaceInfo.openedAt : ''} />
      )}
      {isSpaceExpired && <ExpiredPage />}
      {isUploading && (
        <LoadingLayout
          loadingContents={loadingContents}
          totalAmount={total ?? 10}
          currentAmount={success ?? 5}
        />
      )}
      <S.ScrollTopAnchor ref={scrollUITriggers.scrollTopTriggerRef} />
      <GuestSpaceHeader
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
          <S.TopButtonContainer $isVisible={!scrollUITriggers.isAtPageTop}>
            <FloatingIconButton
              icon={<ArrowUpSvg fill={theme.colors.white} />}
              onClick={goToTop}
            />
          </S.TopButtonContainer>
        </>
      )}
      <S.IntersectionArea ref={scrollUITriggers.hideBlurAreaTriggerRef} />
      <ScrollableBlurArea
        $isHide={scrollUITriggers.isAtPageBottom}
        $position="bottom"
      />
    </S.Wrapper>
  );
};

export default ImageUploadPage;
