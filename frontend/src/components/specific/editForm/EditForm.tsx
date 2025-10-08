import * as C from '../../../components/@common/inputs/input.common.styles';
import { CONSTRAINTS } from '../../../constants/constraints';
import useForm from '../../../hooks/@common/useForm';
import useLocalFile from '../../../hooks/@common/useLocalFile';
import { calculateValidLength } from '../../../utils/grapheme';
import Button from '../../@common/buttons/button/Button';
import TextareaInput from '../../@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../@common/inputs/textInput/TextInput';
import PhotoUploadButton from '../photoUploadButton/PhotoUploadButton';
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

  const { formData, changeFormData, handleChange, handleSubmit, errorMessage } =
    useForm<SpaceFormData>({
      initialData,
      onSubmit: () => alert('제출됨'),
      validators: editFormValidators,
    });

  const { previewFile, handleFilesUploadClick } = useLocalFile({
    fileType: 'image',
    maxFileCount: 1,
  });

  const isAllValid = Object.values(errorMessage).every(
    (message) => message.length === 0,
  );

  return (
    <S.Form onSubmit={handleSubmit}>
      <PhotoUploadButton
        type="button"
        previewFile={previewFile}
        uploadImage={handleFilesUploadClick}
      />
      <TextInput
        isRequired={true}
        validLength={calculateValidLength(formData.name)}
        label="스페이스 이름"
        placeholder="전시명"
        name="name"
        value={formData.name}
        onChange={(e) => handleChange(e)}
        errorMessage={errorMessage.name}
        maxCount={CONSTRAINTS.NAME_MAX_LENGTH}
      />
      <S.ContentContainer>
        <C.Label>스페이스 공개 범위</C.Label>
        <S.PublicButtonContainer>
          <Button
            text="공개"
            type="button"
            variant={formData.visibility === 'public' ? 'primary' : 'secondary'}
            onClick={() => changeFormData('visibility', 'public')}
          />
          <Button
            text="비공개"
            type="button"
            variant={
              formData.visibility === 'private' ? 'primary' : 'secondary'
            }
            onClick={() => changeFormData('visibility', 'private')}
          />
        </S.PublicButtonContainer>
      </S.ContentContainer>
      <TextareaInput
        isRequired={true}
        validLength={calculateValidLength(formData.description)}
        label="스페이스 설명"
        name="description"
        value={formData.description}
        placeholder="매일 1시부터 6시까지 상주합니다."
        onChange={(e) => handleChange(e)}
        errorMessage={errorMessage.description}
        maxCount={CONSTRAINTS.DESCRIPTION_MAX_LENGTH}
      />
      <TextInput
        label="E-mail"
        placeholder="forgather@forgather.me"
        name="email"
        value={formData.email}
        onChange={(e) => handleChange(e)}
        errorMessage={errorMessage.email}
      />
      <TextInput
        label="Instagram ID"
        placeholder="forgather_official"
        name="instagram"
        value={formData.instagram}
        onChange={(e) => handleChange(e)}
        errorMessage={errorMessage.instagram}
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
