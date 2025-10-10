import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import TextareaInput from '../../../components/@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import DeleteModal from '../../../components/@common/modal/deleteModal/DeleteModal';
import PhotoUploadButton from '../../../components/specific/photoUploadButton/PhotoUploadButton';
import { CONSTRAINTS } from '../../../constants/constraints';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import { useToast } from '../../../hooks/@common/useToast';
import {
  useWorkForm,
  type WorkFormData,
} from '../../../hooks/domain/useWorkForm';
import { buildThumbnailUrl } from '../../../utils/buildThumbnailUrl';
import { calculateValidLength } from '../../../utils/grapheme';
import * as S from './WorkForm.styles';
import { workFormValidators } from './workForm.validators';

const WorkForm = () => {
  const { spaceCode } = useParams<{ spaceCode: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid: isAllValid },
  } = useForm<WorkFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: '',
      designer: '',
      description: '',
    },
  });

  const {
    localFiles,
    previewFile,
    deleteFile,
    handleFilesUploadClick,
    handleFilesDrop,
  } = useLocalFile({ fileType: 'image' });

  const { isEditMode, existingPhotos, handleDeleteExistingPhoto, submitWork } =
    useWorkForm({ spaceCode, reset });

  const onValid = async (data: WorkFormData) => {
    const files = localFiles.map((file) => file.originFile);
    await submitWork(data, files);
  };

  const handleDeleteWork = async () => {
    if (!spaceCode) return;

    try {
      setIsDeleting(true);
      const response = await workService.deleteWork(spaceCode);

      if (response.success) {
        setIsDeleteModalOpen(false);
        showToast({ text: '작품을 삭제했습니다.', type: 'info' });
        navigate(-1);
      } else {
        console.error(response.error);
        showToast({ text: '작품 삭제에 실패했습니다.' });
      }
    } catch (error) {
      console.error(error);
      showToast({ text: '작품 삭제에 실패했습니다.' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!spaceCode) {
    return null;
  }

  const totalPhotos = existingPhotos.length + previewFile.length;
  const remainingSlots = 10 - totalPhotos;

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteWork}
        buttonDisabled={isDeleting}
      />
      <S.Wrapper>
        <S.TopContainer>
          <S.TitleContainer>
            {isEditMode ? '작품 소개 수정' : '작품 소개 등록'}
          </S.TitleContainer>
          {isEditMode && (
            <S.DeleteButton onClick={() => setIsDeleteModalOpen(true)}>
              삭제
            </S.DeleteButton>
          )}
        </S.TopContainer>
        <S.FormContainer onSubmit={handleSubmit(onValid)}>
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
              {existingPhotos.map((photo, index) => (
                <S.ImageGridItem key={`existing-${photo.id}`}>
                  <S.GridImage
                    src={buildThumbnailUrl(photo.path, '800')}
                    alt={`작품 사진 ${index + 1}`}
                  />
                  <S.ImageDeleteButton
                    type="button"
                    onClick={() => handleDeleteExistingPhoto(photo.id)}
                    aria-label="사진 삭제"
                  >
                    <IoClose size={20} />
                  </S.ImageDeleteButton>
                </S.ImageGridItem>
              ))}
              {previewFile.map((imageData, index) => (
                <S.ImageGridItem key={`new-${imageData.id}`}>
                  <S.GridImage
                    src={imageData.previewUrl}
                    alt={`작품 사진 ${existingPhotos.length + index + 1}`}
                  />
                  <S.ImageDeleteButton
                    type="button"
                    onClick={() => deleteFile(imageData.id)}
                    aria-label="사진 삭제"
                  >
                    <IoClose size={20} />
                  </S.ImageDeleteButton>
                </S.ImageGridItem>
              ))}
              {Array.from({ length: remainingSlots }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: index is used as a key
                <S.ImageGridItem key={`empty-${index}`}>
                  <S.EmptyGridItem>{totalPhotos + index + 1}</S.EmptyGridItem>
                </S.ImageGridItem>
              ))}
            </S.ImageGridContainer>
          </S.FormLabelContainer>
          <S.ButtonContainer>
            <Button
              type="submit"
              text={isEditMode ? '작품 소개 수정하기' : '작품 소개 등록하기'}
              variant="tertiary"
              disabled={!isAllValid}
            />
          </S.ButtonContainer>
        </S.FormContainer>
      </S.Wrapper>
    </>
  );
};

export default WorkForm;
