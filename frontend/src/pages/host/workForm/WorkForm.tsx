import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import Checkbox from '../../../components/@common/checkBox/CheckBox';
import TextareaInput from '../../../components/@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import DeleteModal from '../../../components/@common/modal/deleteModal/DeleteModal';
import LoadingModal from '../../../components/specific/modal/loadingModal/LoadingModal';
import PhotoUploadButton from '../../../components/specific/photoUploadButton/PhotoUploadButton';
import { CONSTRAINTS } from '../../../constants/constraints';
import { createWorkListRoute } from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import { useToast } from '../../../hooks/@common/useToast';
import {
  useWorkForm,
  type WorkFormData,
} from '../../../hooks/domain/useWorkForm';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { calculateValidLength } from '../../../utils/grapheme';
import * as S from './WorkForm.styles';
import { workFormValidators } from './workForm.validators';

const WorkForm = () => {
  const { spaceCode, workId } = useParams<{
    spaceCode: string;
    workId: string;
  }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { trackClick } = useButtonTracking({
    userType: 'host',
    spaceCode,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid: isAllValid },
  } = useForm<WorkFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: '',
      designer: '',
      description: '',
      videoUrl: '',
      isVideoAfterPhoto: false,
    },
  });

  const {
    isEditMode,
    existingPhotos,
    deleteExistingPhoto,
    submitWork,
    isSubmitting,
  } = useWorkForm({ spaceCode, workId, reset });

  const {
    localFiles,
    previewFiles,
    deleteFile,
    handleFilesUploadClick,
    handleFilesDrop,
  } = useLocalFile({
    fileType: 'image',
    maxFileCount: Math.max(0, 10 - existingPhotos.length),
  });

  const onValid = async (data: WorkFormData) => {
    trackClick(
      isEditMode ? 'work_form_edit_submit' : 'work_form_create_submit',
      {
        page: '/work/form',
        photoCount: existingPhotos.length + localFiles.length,
        hasCategory: data.category,
        hasDesigner: data.designer,
      },
    );
    const files = localFiles.map((file) => file.originFile);
    await submitWork(data, files);
  };

  const handleDeleteWork = async () => {
    if (!spaceCode || !workId) return;

    trackClick('work_form_confirm_delete', {
      page: '/work/form',
    });

    try {
      setIsDeleting(true);
      const response = await workService.deleteWork(spaceCode, workId);

      if (response.success) {
        setIsDeleteModalOpen(false);
        showToast({ text: '작품을 삭제했습니다.', type: 'info' });
        navigate(createWorkListRoute(spaceCode));
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

  const onDeleteButtonClick = () => {
    trackClick('host_work_delete_button');
    setIsDeleteModalOpen(true);
  };

  const handlePhotoUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    trackClick('work_form_photo_upload', {
      page: '/work/form',
      currentPhotoCount: totalPhotos,
    });
    handleFilesUploadClick(event);
  };

  const handlePhotoUploadDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    trackClick('work_form_photo_drop', {
      page: '/work/form',
      currentPhotoCount: totalPhotos,
    });
    handleFilesDrop(event);
  };

  const handleDeleteExistingPhoto = (photoId: number) => {
    trackClick('work_form_delete_existing_photo', {
      page: '/work/form',
      photoId,
    });
    deleteExistingPhoto(photoId);
  };

  const handleDeleteNewPhoto = (fileId: number) => {
    trackClick('work_form_delete_new_photo', {
      page: '/work/form',
    });
    deleteFile(fileId);
  };

  const totalPhotos = existingPhotos.length + previewFiles.length;
  const isVideoAfterPhoto = watch('isVideoAfterPhoto');

  return (
    <>
      <LoadingModal
        isOpen={isSubmitting}
        text={isEditMode ? '수정중 ...' : '등록중 ...'}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={() => {
          trackClick('work_form_cancel_delete', {
            page: '/work/form',
          });
          setIsDeleteModalOpen(false);
        }}
        onDelete={handleDeleteWork}
        buttonDisabled={isDeleting}
      />
      <S.Wrapper>
        <S.TopContainer>
          <S.TitleContainer>
            {isEditMode ? '작품 소개 수정' : '작품 소개 등록'}
          </S.TitleContainer>
          {isEditMode && (
            <S.DeleteButton onClick={onDeleteButtonClick}>삭제</S.DeleteButton>
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
              errorMessage={errors.category?.message}
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
              errorMessage={errors.designer?.message}
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
              errorMessage={errors.description?.message}
            />
          </S.FormLabelContainer>

          <S.FormLabelContainer>
            <TextInput
              {...register('videoUrl', {
                validate: workFormValidators.videoUrl,
              })}
              label="작품 영상"
              subLabel="공개 업로드 된 유튜브 영상의 링크를 첨부해주세요"
              placeholder="유튜브 링크를 입력하세요"
              maxCount={CONSTRAINTS.MAX_LENGTH.WORK.VIDEO_URL}
              validLength={calculateValidLength(watch('videoUrl'))}
              errorMessage={errors.videoUrl?.message}
            />
          </S.FormLabelContainer>

          <S.FormLabelContainer>
            <S.LabelContainer>미디어 배치 순서</S.LabelContainer>
            <Checkbox
              label="영상이 사진보다 앞에 노출되도록 설정"
              checked={Boolean(isVideoAfterPhoto)}
              onChange={() =>
                setValue('isVideoAfterPhoto', !isVideoAfterPhoto, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
          </S.FormLabelContainer>

          <S.FormLabelContainer>
            <S.LabelContainer>작품 사진</S.LabelContainer>
            <PhotoUploadButton
              mainText="사진을 선택해주세요"
              disabled={false}
              onChange={handlePhotoUploadClick}
              onDrop={handlePhotoUploadDrop}
            />
            <S.ImageCount>{`${totalPhotos}/10`}</S.ImageCount>
            <S.ImageGridContainer>
              {existingPhotos.map((photo, index) => (
                <S.ImageGridItem key={`existing-${photo.id}`}>
                  <S.GridImage
                    src={buildThumbnailUrl({
                      path: photo.path,
                      replacePath: 'product',
                      preset: '800',
                    })}
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
              {previewFiles.map((imageData, index) => (
                <S.ImageGridItem key={`new-${imageData.id}`}>
                  <S.GridImage
                    src={imageData.previewUrl}
                    alt={`작품 사진 ${existingPhotos.length + index + 1}`}
                  />
                  <S.ImageDeleteButton
                    type="button"
                    onClick={() => handleDeleteNewPhoto(imageData.id)}
                    aria-label="사진 삭제"
                  >
                    <IoClose size={20} />
                  </S.ImageDeleteButton>
                </S.ImageGridItem>
              ))}
            </S.ImageGridContainer>
          </S.FormLabelContainer>
          <S.ButtonContainer>
            <Button
              type="submit"
              text={isEditMode ? '수정하기' : '등록하기'}
              variant="fixed"
              disabled={!isAllValid || isSubmitting}
            />
          </S.ButtonContainer>
        </S.FormContainer>
      </S.Wrapper>
    </>
  );
};

export default WorkForm;
