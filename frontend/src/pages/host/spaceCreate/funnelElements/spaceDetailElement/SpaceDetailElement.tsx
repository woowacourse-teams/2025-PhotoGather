import { useState } from 'react';
import TextInput from '../../../../../components/@common/inputs/textInput/TextInput';
import PhotoPreviewButton from '../../../../../components/specific/photoPreviewButton/PhotoPreviewButton';
import { INFORMATION } from '../../../../../constants/messages';
import useLocalFile from '../../../../../hooks/@common/useLocalFile';
import type {
  FunnelElementProps,
  SpaceDetailElementInfos,
} from '../../../../../types/funnel.type';
import { createErrorMessageWithValidators } from '../../../../../validators/createErrorMessageWithValidators';
import { funnelValidators } from '../../funnel/funnel.validators';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';
import * as S from './SpaceDetailElement.styles';

const SpaceDetailElement = ({
  onNext,
  initialValue = { profileImage: [], email: '', instagram: '' },
}: FunnelElementProps<SpaceDetailElementInfos>) => {
  const { localFiles, previewFile, handleFilesUploadClick } = useLocalFile({
    fileType: 'image',
    maxFileCount: 1,
  });
  const [email, setEmail] = useState(initialValue.email);
  const [instagram, setInstagram] = useState(initialValue.instagram);
  const { isError: isEmailError, errorMessage: emailErrorMessage } =
    createErrorMessageWithValidators({
      value: email,
      validators: [funnelValidators.email],
    });
  const { isError: isInstagramError, errorMessage: instagramErrorMessage } =
    createErrorMessageWithValidators({
      value: instagram,
      validators: [funnelValidators.instagram],
    });
  const isDisabled = isEmailError || isInstagramError;

  return (
    <FunnelBasePage
      title={INFORMATION.SPACE_CREATE.DETAIL.TITLE}
      description={INFORMATION.SPACE_CREATE.DETAIL.DESCRIPTION}
      element={
        <S.Wrapper>
          <S.ImageUploadContainer>
            <PhotoPreviewButton
              type="button"
              previewFile={previewFile}
              uploadImage={handleFilesUploadClick}
            />
          </S.ImageUploadContainer>
          <S.InputContainer>
            <TextInput
              label="E-mail"
              placeholder="forgather@forgather.me"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={emailErrorMessage}
            />
            <TextInput
              label="Instagram ID"
              placeholder="forgather_official"
              name="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              errorMessage={instagramErrorMessage}
            />
          </S.InputContainer>
        </S.Wrapper>
      }
      nextButtonDisabled={isDisabled}
      onNextButtonClick={() =>
        onNext({
          profileImage: localFiles,
          email,
          instagram,
        })
      }
    />
  );
};

export default SpaceDetailElement;
