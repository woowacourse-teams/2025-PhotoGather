import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as C from '../../../components/@common/inputs/input.common.styles';
import { CONSTRAINTS } from '../../../constants/constraints';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import useSpaceInfoContext from '../../../hooks/context/useSpaceInfoContext';
import usePatchSpaceInfo from '../../../hooks/domain/space/usePatchSpaceInfo';
import type { SpaceInfoFormData } from '../../../types/domain/space.type';
import { clearFiles } from '../../../utils/clearFiles';
import { calculateValidLength } from '../../../utils/grapheme';
import Button from '../../@common/buttons/button/Button';
import TextareaInput from '../../@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../@common/inputs/textInput/TextInput';
import PhotoPreviewButton from '../photoPreviewButton/PhotoPreviewButton';
import * as S from './EditForm.styles';
import { editFormValidators } from './editForm.validators';

const EditForm = () => {
  // TODO : 변경사항이 없을 경우 막기
  const { spaceCode } = useParams();

  const { spaceInfo, isLoading: isSpaceInfoLoading } = useSpaceInfoContext();
  const { trackClick } = useButtonTracking({
    userType: 'host',
    spaceCode,
  });

  const initialData: SpaceInfoFormData = {
    name: '',
    description: '',
    isPublic: false,
    email: '',
    instagramUsername: '',
    isDeletePhoto: false,
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: isSpaceInfoLoading, spaceInfo 변경 시에만 리셋
  useEffect(() => {
    if (!isSpaceInfoLoading && spaceInfo) {
      reset({
        name: spaceInfo.name,
        description: spaceInfo.description,
        isPublic: spaceInfo.isPublic,
        email: spaceInfo.email,
        instagramUsername: spaceInfo.instagramUsername,
        isDeletePhoto: false,
      });
    }
  }, [isSpaceInfoLoading, spaceInfo]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid: isAllValid, dirtyFields },
  } = useForm<SpaceInfoFormData>({
    mode: 'onChange',
    defaultValues: initialData,
  });

  const { localFiles, previewFiles, handleFilesUploadClick, clearLocalFiles } =
    useLocalFile({
      fileType: 'image',
      maxFileCount: 1,
    });

  const { patchSpaceInfo, isPatching } = usePatchSpaceInfo({
    spaceCode: spaceCode ?? '',
    isImageExisted: spaceInfo?.spacePhoto.isExists,
    dirtyFields,
    afterPatch: () => {
      clearFiles(localFiles);
      clearLocalFiles();
    },
  });

  const onSubmit = (data: SpaceInfoFormData) => {
    trackClick('edit_form_submit_button', {
      page: '/space/edit',
      hasPhoto: localFiles.length !== 0,
      isPublic: data.isPublic,
      hasEmail: !!data.email,
      hasInstagram: !!data.instagramUsername,
    });

    if (localFiles.length !== 0 && localFiles[0].originFile) {
      patchSpaceInfo(data, localFiles[0].originFile);
      return;
    }
    patchSpaceInfo(data);
  };

  const handleDeleteImage = () => {
    setValue('isDeletePhoto', true, { shouldDirty: true });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('email', e.target.value, {
      shouldValidate: false,
      shouldDirty: true,
    });
    if (errors.email) {
      trigger('email');
    }
  };

  const handleVisibilityButtonClick = (isPublic: boolean) => {
    trackClick(
      isPublic ? 'edit_form_public_button' : 'edit_form_private_button',
      {
        page: '/space/edit',
        action: isPublic ? 'set_public' : 'set_private',
      },
    );

    setValue('isPublic', isPublic, { shouldDirty: true });
  };

  const handlePhotoUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    trackClick('edit_form_photo_upload', {
      page: `/host/${spaceCode}/space-info/edit`,
    });
    handleFilesUploadClick(event);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <PhotoPreviewButton
        originalSrc={
          watch('isDeletePhoto') ? undefined : spaceInfo?.spacePhoto.path
        }
        previewFile={previewFiles}
        uploadImage={handlePhotoUploadClick}
        clearFiles={() => {
          clearFiles(localFiles);
          clearLocalFiles();
        }}
        deleteImage={handleDeleteImage}
      />
      <TextareaInput
        {...register('name', {
          validate: editFormValidators.name,
        })}
        isRequired
        validLength={calculateValidLength(watch('name'))}
        style={{ minHeight: '50px' }}
        label="스페이스 이름"
        placeholder="전시명"
        errorMessage={errors.name?.message}
        maxCount={CONSTRAINTS.MAX_LENGTH.SPACE.NAME}
      />
      <S.ContentContainer>
        <C.Label>스페이스 공개 범위</C.Label>
        <S.PublicButtonContainer>
          <Button
            text="공개"
            type="button"
            variant={watch('isPublic') === true ? 'primary' : 'secondary'}
            onClick={() => handleVisibilityButtonClick(true)}
          />
          <Button
            text="비공개"
            type="button"
            variant={watch('isPublic') === false ? 'primary' : 'secondary'}
            onClick={() => handleVisibilityButtonClick(false)}
          />
        </S.PublicButtonContainer>
      </S.ContentContainer>
      <TextareaInput
        {...register('description', {
          validate: editFormValidators.description,
        })}
        validLength={calculateValidLength(watch('description'))}
        label="스페이스 설명"
        placeholder="매일 1시부터 6시까지 상주합니다."
        errorMessage={errors.description?.message}
        maxCount={CONSTRAINTS.MAX_LENGTH.SPACE.DESCRIPTION}
      />
      <TextInput
        {...register('email', {
          validate: editFormValidators.email,
        })}
        label="E-mail"
        placeholder="forgather@forgather.me"
        errorMessage={errors.email?.message}
        maxLength={CONSTRAINTS.MAX_LENGTH.SPACE.EMAIL}
        onChange={handleEmailChange}
        onBlur={() => trigger('email')}
        inputMode="email"
      />
      <TextInput
        {...register('instagramUsername', {
          validate: editFormValidators.instagramUsername,
        })}
        label="Instagram ID"
        placeholder="forgather_official"
        errorMessage={errors.instagramUsername?.message}
        maxLength={CONSTRAINTS.MAX_LENGTH.SPACE.INSTAGRAM_USERNAME}
      />
      <Button
        variant="primary"
        type="submit"
        text={isPatching ? '수정 중...' : '완료'}
        disabled={!isAllValid || isPatching}
      />
    </S.Form>
  );
};

export default EditForm;
