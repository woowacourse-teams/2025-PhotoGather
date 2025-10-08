import { IoClose } from 'react-icons/io5';
import Button from '../../../components/@common/buttons/button/Button';
import Textarea from '../../../components/@common/inputs/textArea/Textarea';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import PhotoUploadButton from '../../../components/host/photoUploadButton/PhotoUploadButton';
import useForm from '../../../hooks/@common/useForm';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import { calculateValidLength } from '../../../utils/grapheme';
import * as S from './WorkForm.styles';

//TODO: react-hook-form 도입 이후 삭제 예정
interface WorkFormData {
  title: string;
  category: string;
  designer: string;
  description: string;
}

const MAX_LENGTH = {
  title: 50,
  category: 20,
  designer: 20,
  description: 1000,
} as const;

const WorkForm = () => {
  const { formData, handleChange } = useForm<WorkFormData>({
    initialData: {
      title: '',
      category: '',
      designer: '',
      description: '',
    },
    validators: {
      title: (value: string) => {
        if (calculateValidLength(value) > MAX_LENGTH.title) {
          throw new Error(`작품명은 ${MAX_LENGTH.title}자 이내로 입력해주세요`);
        }
      },
      category: (value: string) => {
        if (calculateValidLength(value) > MAX_LENGTH.category) {
          throw new Error(
            `카테고리는 ${MAX_LENGTH.category}자 이내로 입력해주세요`,
          );
        }
      },
      designer: (value: string) => {
        if (calculateValidLength(value) > MAX_LENGTH.designer) {
          throw new Error(
            `작가명은 ${MAX_LENGTH.designer}자 이내로 입력해주세요`,
          );
        }
      },
      description: (value: string) => {
        if (calculateValidLength(value) > MAX_LENGTH.description) {
          throw new Error(
            `작품 설명은 ${MAX_LENGTH.description}자 이내로 입력해주세요`,
          );
        }
      },
    },
    onSubmit: () => {
      // TODO: 작품 소개 등록 로직
    },
  });

  const { previewFile, deleteFile, handleFilesUploadClick, handleFilesDrop } =
    useLocalFile({ fileType: 'image' });

  const isFormValid =
    formData.title.trim() !== '' && formData.description.trim() !== '';

  return (
    <S.Wrapper>
      <S.TitleContainer>작품 소개 등록</S.TitleContainer>
      <S.FormContainer>
        <S.FormLabelContainer>
          <TextInput
            label="작품명"
            isRequired
            name="title"
            maxCount={MAX_LENGTH.title}
            value={formData.title}
            validLength={calculateValidLength(formData.title)}
            onChange={handleChange}
            placeholder="작품명을 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <TextInput
            label="카테고리"
            name="category"
            maxCount={MAX_LENGTH.category}
            value={formData.category}
            validLength={calculateValidLength(formData.category)}
            onChange={handleChange}
            placeholder="카테고리를 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <TextInput
            label="작가명"
            name="designer"
            maxCount={MAX_LENGTH.designer}
            value={formData.designer}
            validLength={calculateValidLength(formData.designer)}
            onChange={handleChange}
            placeholder="작가명을 입력하세요"
          />
        </S.FormLabelContainer>

        <S.FormLabelContainer>
          <S.LabelContainer>작품 설명 *</S.LabelContainer>
          <Textarea
            name="description"
            maxCount={MAX_LENGTH.description}
            value={formData.description}
            validLength={calculateValidLength(formData.description)}
            onChange={handleChange}
            placeholder="작품 설명을 입력하세요"
            rows={6}
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
