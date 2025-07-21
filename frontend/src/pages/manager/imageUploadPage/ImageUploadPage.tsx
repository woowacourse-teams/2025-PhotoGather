import { useState } from 'react';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import UploadBox from '../../../components/uploadBox/UploadBox';
import * as S from './ImageUploadPage.styles';
import { mockSpaceData } from './mockSpaceData';

const ImageUploadPage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const hasImages = Array.isArray(previewUrls) && previewUrls.length > 0;
  const uploadBoxText = '함께한 순간을 올려주세요';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: 파일 업로드 최대 용량 제한 | 업로드 최대 개수 제한?
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(e.dataTransfer.files || []);
    setImageFiles((prev) => [...prev, ...files]);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const clearImageFiles = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImageFiles([]);
    setPreviewUrls([]);
  };

  return (
    <S.Wrapper $hasImages={hasImages}>
      <SpaceHeader
        title={`${mockSpaceData.name}`}
        description="클릭해서 불러올 수 있어요"
      />

      <S.UploadContainer $hasImages={hasImages}>
        <UploadBox
          text={uploadBoxText}
          iconSize={hasImages ? 60 : 100}
          onChange={handleImageUpload}
          onDrop={handleImageDrop}
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
              onClick={clearImageFiles}
            />
          </S.ButtonContainer>
        </>
      )}
    </S.Wrapper>
  );
};

export default ImageUploadPage;
