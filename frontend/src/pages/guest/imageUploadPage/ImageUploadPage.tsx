import { useEffect } from 'react';
import { ReactComponent as ArrowUpSvg } from '../../../@assets/icons/upwardArrow.svg';
import { photoService } from '../../../apis/services/photo.service';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import FloatingIconButton from '../../../components/@common/buttons/floatingIconButton/FloatingIconButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import UploadBox from '../../../components/uploadBox/UploadBox';
import useFileUpload from '../../../hooks/@common/useFileUpload';
import useIntersectionObserver from '../../../hooks/@common/useIntersectionObserver';
import { ScrollableBlurArea } from '../../../styles/@common/ScrollableBlurArea';
import { theme } from '../../../styles/theme';
import { goToTop } from '../../../utils/goToTop';
import * as S from './ImageUploadPage.styles';
import { mockSpaceData } from './mockSpaceData';

const ImageUploadPage = () => {
  const {
    files,
    previewUrls,
    errorMessage,
    handleFilesUpload,
    handleFilesDrop,
    clearFiles,
  } = useFileUpload({ fileType: 'image' });
  const hasImages = Array.isArray(previewUrls) && previewUrls.length > 0;
  const uploadBoxText = '함께한 순간을 올려주세요';
  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });

  const handleUpload = async () => {
    try {
      await photoService.uploadFiles('1234567890', files);
      //TODO: 완성 페이지로 이동
      alert('사진 업로드가 완료되었습니다.');
      clearFiles();
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('사진 업로드에 실패했습니다.');
    }
  };

  //TODO: 에러 토스트 구현 후 사라질 로직
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <S.Wrapper $hasImages={hasImages}>
      <div ref={scrollTopTriggerRef} />
      <SpaceHeader
        title={`${mockSpaceData.name}`}
        description="클릭해서 불러올 수 있어요"
      />
      <S.UploadContainer $hasImages={hasImages}>
        <UploadBox
          text={uploadBoxText}
          iconSize={hasImages ? 60 : 100}
          onChange={handleFilesUpload}
          onDrop={handleFilesDrop}
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
              onClick={handleUpload}
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
