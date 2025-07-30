import downloadLoadingSpinner from '@assets/loading-spinner.gif';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import UploadBox from '../../../components/uploadBox/UploadBox';
import { ROUTES } from '../../../constants/routes';
import useFileUpload from '../../../hooks/@common/useFileUpload';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea';
import { theme } from '../../../styles/theme';
import { goToTop } from '../../../utils/goToTop';
import * as S from './ImageUploadPage.styles';
import { mockSpaceData } from './mockSpaceData';

const ImageUploadPage = () => {
  const {
    previewUrls,
    errorMessage,
    isUploading,
    handleFilesUploadClick,
    handleFilesDrop,
    handleUpload,
  } = useFileUpload({ fileType: 'image' });
  const hasImages = Array.isArray(previewUrls) && previewUrls.length > 0;
  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });
  const navigate = useNavigate();

  const handleUploadClick = async () => {
    await handleUpload();
    navigate(ROUTES.COMPLETE.UPLOAD);
  };

  //TODO: 에러 토스트 구현 후 사라질 로직
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <S.Wrapper $hasImages={hasImages}>
      {isUploading && (
        <S.LoadingSpinnerContainer>
          <img src={downloadLoadingSpinner} alt="loading" />
        </S.LoadingSpinnerContainer>
      )}

      <S.ScrollTopAnchor ref={scrollTopTriggerRef} />
      <SpaceHeader
        title={`${mockSpaceData.name}`}
        description="클릭해서 불러올 수 있어요"
      />
      <S.UploadContainer $hasImages={hasImages}>
        <UploadBox
          mainText={`함께한 순간을 올려주세요.${hasImages ? '' : '\n사진만 올릴 수 있습니다.'}`}
          uploadLimitText={hasImages ? '' : '한 번에 500장까지 올릴 수 있어요'}
          iconSize={hasImages ? 60 : 100}
          onChange={handleFilesUploadClick}
          onDrop={handleFilesDrop}
          disabled={isUploading}
        />
      </S.UploadContainer>

      {hasImages && (
        <>
          <ImageGrid imageUrlList={previewUrls} rowImageAmount={3} />
          <S.ButtonContainer>
            <FloatingActionButton
              label={
                <HighlightText
                  text={`사진 ${previewUrls.length}장 업로드하기`}
                  fontStyle="buttonPrimary"
                  highlightColorStyle="gray04"
                  highlightTextArray={[`사진 ${previewUrls.length}장`]}
                />
              }
              onClick={handleUploadClick}
              disabled={isUploading}
            />
          </S.ButtonContainer>
          <S.TopButtonContainer $isVisible={!isAtPageTop}>
            <FloatingIconButton
              icon={<ArrowUpSvg fill={theme.colors.white} />}
              onClick={goToTop}
            />
          </S.TopButtonContainer>
        </>
      )}
      <S.IntersectionArea ref={hideBlurAreaTriggerRef} />
      <ScrollableBlurArea $isHide={isAtPageBottom} />
    </S.Wrapper>
  );
};

export default ImageUploadPage;
