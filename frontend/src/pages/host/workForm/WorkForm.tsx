import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Button from '../../../components/@common/buttons/button/Button';
import Textarea from '../../../components/@common/inputs/textArea/Textarea';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import UploadBox from '../../../components/host/uploadBox/UploadBox';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import * as S from './WorkForm.styles';

const WorkForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [designer, setDesigner] = useState('');
  const [description, setDescription] = useState('');

  const { previewFile, deleteFile, handleFilesUploadClick, handleFilesDrop } =
    useLocalFile({ fileType: 'image' });

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  return (
    <S.Wrapper>
      <S.TitleContainer>작품 소개 등록</S.TitleContainer>
      <S.FormContainer>
        <S.FormLabelContainer>
          <S.LabelContainer>작품명 *</S.LabelContainer>
          <TextInput
            maxCount={50}
            value={title}
            validLength={title.length}
            onChange={(e) => setTitle(e.target.value.slice(0, 50))}
            placeholder="작품명을 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>카테고리</S.LabelContainer>
          <TextInput
            maxCount={20}
            value={category}
            validLength={category.length}
            onChange={(e) => setCategory(e.target.value.slice(0, 20))}
            placeholder="카테고리를 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작가명</S.LabelContainer>
          <TextInput
            maxCount={20}
            value={designer}
            validLength={designer.length}
            onChange={(e) => setDesigner(e.target.value.slice(0, 20))}
            placeholder="작가명을 입력하세요"
          />{' '}
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작품 설명 *</S.LabelContainer>
          <Textarea
            maxCount={1000}
            value={description}
            validLength={description.length}
            onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
            placeholder="작품 설명을 입력하세요"
            rows={6}
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작품 이미지</S.LabelContainer>
          <UploadBox
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
