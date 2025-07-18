import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import UploadBox from '../../../components/uploadBox/UploadBox';
import * as S from './ImageUploadPage.styles';
import { mockImageList, mockSpaceData } from './mockSpaceData';

const ImageUploadPage = () => {
  const hasImages = Array.isArray(mockImageList) && mockImageList.length > 0;
  const uploadBoxText = '함께한 순간을 올려주세요';

  return (
    <S.Wrapper $hasImages={hasImages}>
      <SpaceHeader
        title={`${mockSpaceData.name}`}
        description="클릭해서 불러올 수 있어요"
      />

      <S.UploadContainer $hasImages={hasImages}>
        <UploadBox text={uploadBoxText} />
      </S.UploadContainer>

      {hasImages && (
        <>
          <ImageGrid imageUrlList={mockImageList} rowImageAmount={3} />
          <S.ButtonContainer>
            <FloatingActionButton
              label={
                <HighlightText
                  text={`사진 ${mockImageList.length}장 업로드하기`}
                  fontStyle="buttonPrimary"
                  highlightColorStyle="gray04"
                  highlightTextArray={[`사진 ${mockImageList.length}장`]}
                />
              }
            />
          </S.ButtonContainer>
        </>
      )}
    </S.Wrapper>
  );
};

export default ImageUploadPage;
