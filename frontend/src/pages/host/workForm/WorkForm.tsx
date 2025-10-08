import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import Button from '../../../components/@common/buttons/button/Button';
import TextareaInput from '../../../components/@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import PhotoUploadButton from '../../../components/specific/photoUploadButton/PhotoUploadButton';
import { CONSTRAINTS } from '../../../constants/constraints';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import { calculateValidLength } from '../../../utils/grapheme';
import * as S from './WorkForm.styles';
import { workFormValidators } from './workForm.validators';

interface WorkFormData {
  title: string;
  category: string;
  designer: string;
  description: string;
}

const WorkForm = () => {
  const initialData: WorkFormData = {
    title: '',
    category: '',
    designer: '',
    description: '',
  };

  const {
    register,
    // handleSubmit,
    watch,
    formState: { errors, isValid: isAllValid },
  } = useForm<WorkFormData>({
    mode: 'onChange',
    defaultValues: initialData,
  });

  const { previewFile, deleteFile, handleFilesUploadClick, handleFilesDrop } =
    useLocalFile({ fileType: 'image' });

  return (
    <S.Wrapper>
      <S.TitleContainer>작품 소개 등록</S.TitleContainer>
      {/* <S.FormContainer onSubmit={handleSubmit(onValid)}> */}
      <S.FormContainer onSubmit={() => {}}>
        <S.FormLabelContainer>
          <TextInput
            {...register('title', {
              validate: workFormValidators.title,
            })}
            label="작품명"
            isRequired
            validLength={calculateValidLength(watch('title'))}
            maxCount={CONSTRAINTS.MAX_LENGTH.WORK.TITLE}
            placeholder="작품명을 입력하세요"
            errorMessage={errors.title?.message}
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <TextInput
            {...register('category', {
              validate: workFormValidators.category,
            })}
            label="카테고리"
            maxCount={CONSTRAINTS.MAX_LENGTH.WORK.CATEGORY}
            placeholder="카테고리를 입력하세요"
            validLength={calculateValidLength(watch('category'))}
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <TextInput
            {...register('designer', {
              validate: workFormValidators.designer,
            })}
            label="작가명"
            maxCount={CONSTRAINTS.MAX_LENGTH.WORK.DESIGNER}
            validLength={calculateValidLength(watch('designer'))}
            placeholder="작가명을 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <TextareaInput
            {...register('description', {
              validate: workFormValidators.description,
            })}
            label="작품 설명"
            isRequired
            maxCount={CONSTRAINTS.MAX_LENGTH.WORK.DESCRIPTION}
            placeholder="작품 설명을 입력하세요"
            rows={6}
            validLength={calculateValidLength(watch('description'))}
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작품 사진</S.LabelContainer>
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
                        alt={`작품 사진 ${index + 1}`}
                      />
                      <S.DeleteButton
                        type="button"
                        onClick={() => deleteFile(imageData.id)}
                        aria-label="사진 삭제"
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
          type="submit"
          text="작품 소개 등록하기"
          variant="tertiary"
          disabled={!isAllValid}
        />
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default WorkForm;
