import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as C from '../../../components/@common/inputs/input.common.styles';
import { CONSTRAINTS } from '../../../constants/constraints';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import usePatchSpaceInfo from '../../../hooks/domain/space/usePatchSpaceInfo';
import useSpaceInfo from '../../../hooks/domain/space/useSpaceInfo';
import type { SpaceInfoFormData } from '../../../types/domain/space.type';
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
  const { isLoading: isSpaceInfoLoading, spaceInfo } = useSpaceInfo({
    spaceCode: spaceCode ?? '',
  });

  const initialData: SpaceInfoFormData = {
    name: '',
    description: '',
    isPublic: false,
    email: '',
    instagramUsername: '',
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
      });
    }
  }, [isSpaceInfoLoading, spaceInfo]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid: isAllValid, dirtyFields },
  } = useForm<SpaceInfoFormData>({
    mode: 'onChange',
    defaultValues: initialData,
  });

  const { localFiles, previewFile, handleFilesUploadClick, clearFiles } =
    useLocalFile({
      fileType: 'image',
      maxFileCount: 1,
    });
  const { patchSpaceInfo } = usePatchSpaceInfo({
    spaceCode: spaceCode ?? '',
    dirtyFields,
    afterPatch: clearFiles,
  });

  const onSubmit = (data: SpaceInfoFormData) => {
    if (localFiles.length !== 0 && localFiles[0].originFile) {
      patchSpaceInfo(data, localFiles[0].originFile);
      return;
    }
    patchSpaceInfo(data);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <PhotoPreviewButton
        originalSrc={`${import.meta.env.VITE_IMAGE_BASE_URL}${spaceInfo?.spacePhoto.path}`}
        previewFile={previewFile}
        uploadImage={handleFilesUploadClick}
      />
      <TextInput
        {...register('name', {
          validate: editFormValidators.name,
        })}
        isRequired
        validLength={calculateValidLength(watch('name'))}
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
            onClick={() => setValue('isPublic', true, { shouldDirty: true })}
          />
          <Button
            text="비공개"
            type="button"
            variant={watch('isPublic') === false ? 'primary' : 'secondary'}
            onClick={() => setValue('isPublic', false, { shouldDirty: true })}
          />
        </S.PublicButtonContainer>
      </S.ContentContainer>
      <TextareaInput
        {...register('description', {
          validate: editFormValidators.description,
        })}
        isRequired
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
      />
      <TextInput
        {...register('instagramUsername')}
        label="Instagram ID"
        placeholder="forgather_official"
        errorMessage={errors.instagramUsername?.message}
      />
      <Button
        variant="primary"
        type="submit"
        text="완료"
        disabled={!isAllValid}
      />
    </S.Form>
  );
};

export default EditForm;
