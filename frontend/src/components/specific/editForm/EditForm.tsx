import { useForm } from 'react-hook-form';
import * as C from '../../../components/@common/inputs/input.common.styles';
import { CONSTRAINTS } from '../../../constants/constraints';
import useLocalFile from '../../../hooks/domain/useLocaleFile';
import { calculateValidLength } from '../../../utils/grapheme';
import Button from '../../@common/buttons/button/Button';
import TextareaInput from '../../@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../@common/inputs/textInput/TextInput';
import PhotoPreviewButton from '../photoPreviewButton/PhotoPreviewButton';
import * as S from './EditForm.styles';
import { editFormValidators } from './editForm.validators';

type visibilityType = 'public' | 'private';

interface SpaceFormData {
  profileImage: File[];
  name: string;
  description: string;
  visibility: visibilityType;
  email: string;
  instagram: string;
}

const EditForm = () => {
  const initialData: SpaceFormData = {
    profileImage: [],
    name: '',
    description: '',
    visibility: 'public',
    email: '',
    instagram: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid: isAllValid },
  } = useForm<SpaceFormData>({
    mode: 'onChange',
    defaultValues: initialData,
  });

  const { previewFile, handleFilesUploadClick } = useLocalFile({
    fileType: 'image',
    maxFileCount: 1,
    appendForm: (file: File[]) => setValue('profileImage', file),
  });

  return (
    <S.Form onSubmit={() => handleSubmit}>
      <PhotoPreviewButton
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
            variant={watch('visibility') === 'public' ? 'primary' : 'secondary'}
            onClick={() => setValue('visibility', 'public')}
          />
          <Button
            text="비공개"
            type="button"
            variant={
              watch('visibility') === 'private' ? 'primary' : 'secondary'
            }
            onClick={() => setValue('visibility', 'private')}
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
        {...register('instagram')}
        label="Instagram ID"
        placeholder="forgather_official"
        errorMessage={errors.instagram?.message}
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
