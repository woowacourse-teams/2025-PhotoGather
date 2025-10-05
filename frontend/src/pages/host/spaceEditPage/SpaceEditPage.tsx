import Button from '../../../components/@common/buttons/button/Button';
import TextareaInput from '../../../components/@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import PhotoUploadButton from '../../../components/specific/photoUploadButton/PhotoUploadButton';
import { CONSTRAINTS } from '../../../constants/constraints';
import useForm from '../../../hooks/@common/useForm';
import useLocalFile from '../../../hooks/domain/useLocaleFile';
import { calculateValidLength } from '../../../utils/grapheme';
import {
  checkInputEmpty,
  checkMaxLength,
} from '../../../validators/form.validators';
import * as S from './SpaceEditPage.styles';

interface SpaceFormData {
  profileImage: File[];
  name: string;
  description: string;
  email: string;
  instagram: string;
}

const SpaceEditPage = () => {
  const initialData = {
    profileImage: [],
    name: '',
    description: '',
    email: '',
    instagram: '',
  };
  const validators = {
    profileImage: () => {},
    name: (value: string) => {
      checkMaxLength(value, CONSTRAINTS.NAME_MAX_LENGTH);
      checkInputEmpty(value);
    },
    description: (value: string) => {
      checkMaxLength(value, CONSTRAINTS.DESCRIPTION_MAX_LENGTH);
      checkInputEmpty(value);
    },
    email: () => {},
    instagram: () => {},
  };

  const { formData, handleChange, handleSubmit, errorMessage } =
    useForm<SpaceFormData>({
      initialData,
      onSubmit: () => {},
      validators,
    });

  const { previewFile, handleFilesUploadClick } = useLocalFile({
    fileType: 'image',
    maxFileCount: 1,
  });

  console.log(formData);

  return (
    <S.Wrapper>
      <S.Title>스페이스 정보 수정</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <PhotoUploadButton
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
          errorMessage={''}
        />
        <TextInput
          label="Instagram"
          placeholder="@forgather_official"
          name="instagram"
          value={formData.instagram}
          onChange={(e) => handleChange(e)}
          errorMessage={''}
        />
        {/**TODO : @ 맨 앞에 붙이기 */}
        <Button variant="primary" text="완료" />
      </S.Form>
    </S.Wrapper>
  );
};

export default SpaceEditPage;
