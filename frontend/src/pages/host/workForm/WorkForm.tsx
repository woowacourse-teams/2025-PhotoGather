import { IoClose } from 'react-icons/io5';
import Button from '../../../components/@common/buttons/button/Button';
import Textarea from '../../../components/@common/inputs/textArea/Textarea';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import PhotoUploadButton from '../../../components/host/photoUploadButton/PhotoUploadButton';
import useGraphemeInput from '../../../hooks/@common/useGraphemeInput';
import useLocalFile from '../../../hooks/@common/useLocalFileTmp';
import * as S from './WorkForm.styles';

const WorkForm = () => {
  const titleInput = useGraphemeInput({ initialValue: '' });
  const categoryInput = useGraphemeInput({ initialValue: '' });
  const designerInput = useGraphemeInput({ initialValue: '' });
  const descriptionInput = useGraphemeInput({ initialValue: '' });

  const { previewFile, deleteFile, handleFilesUploadClick, handleFilesDrop } =
    useLocalFile({ fileType: 'image' });

  const isFormValid =
    titleInput.validValue.trim() !== '' &&
    descriptionInput.validValue.trim() !== '';

  return (
    <S.Wrapper>
      <S.TitleContainer>작품 소개 등록</S.TitleContainer>
      <S.FormContainer>
        <S.FormLabelContainer>
          <S.LabelContainer>작품명 *</S.LabelContainer>
          <TextInput
            maxCount={50}
            value={titleInput.validValue}
            validLength={titleInput.validLength}
            onChange={titleInput.handleChange}
            placeholder="작품명을 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>카테고리</S.LabelContainer>
          <TextInput
            maxCount={20}
            value={categoryInput.validValue}
            validLength={categoryInput.validLength}
            onChange={categoryInput.handleChange}
            placeholder="카테고리를 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작가명</S.LabelContainer>
          <TextInput
            maxCount={20}
            value={designerInput.validValue}
            validLength={designerInput.validLength}
            onChange={designerInput.handleChange}
            placeholder="작가명을 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작품 설명 *</S.LabelContainer>
          <Textarea
            maxCount={1000}
            value={descriptionInput.validValue}
            validLength={descriptionInput.validLength}
            onChange={descriptionInput.handleChange}
            placeholder="작품 설명을 입력하세요"
            rows={6}
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작품 이미지</S.LabelContainer>
          <PhotoUploadButton
            mainText="사진을 선택해주세요"
            disabled={false}
            onChange={handleFilesUploadClick}
            onDrop={handleFilesDrop}
          />
          <S.ImageGridContainer>
            {Array.from({ length: 10 }).map((_, index) => {
              const imageData = previewFile[index];
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: index 무시
                <S.ImageGridItem key={index}>
                  {imageData ? (
                    <>
                      <S.GridImage
                        src={imageData.previewUrl}
                        alt={`작품 이미지 ${index + 1}`}
                      />
                      <S.DeleteButton
                        type="button"
                        onClick={() => deleteFile(imageData.id)}
                        aria-label="이미지 삭제"
                      >
                        <IoClose size={20} />
                      </S.DeleteButton>
                    </>
                  ) : (
                    <S.EmptyGridItem>{index + 1}</S.EmptyGridItem>
                  )}
                </S.ImageGridItem>
              );
            })}
          </S.ImageGridContainer>
        </S.FormLabelContainer>
      </S.FormContainer>
      <S.ButtonContainer>
        <Button
          text="작품 소개 등록하기"
          onClick={() => {}}
          variant="tertiary"
          disabled={!isFormValid}
        />
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default WorkForm;
