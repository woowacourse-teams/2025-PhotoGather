import { useState } from 'react';
import TextInput from '../../../../../components/@common/inputs/textInput/TextInput';
import PhotoPreviewButton from '../../../../../components/specific/photoPreviewButton/PhotoPreviewButton';
import { CONSTRAINTS } from '../../../../../constants/constraints';
import { INFORMATION } from '../../../../../constants/messages';
import useButtonTracking from '../../../../../hooks/@common/useButtonTracking';
import useLocalFile from '../../../../../hooks/@common/useLocalFile';
import type {
  FunnelElementProps,
  SpaceDetailElementInfos,
} from '../../../../../types/funnel.type';
import { clearFiles } from '../../../../../utils/clearFiles';
import { createErrorMessageWithValidators } from '../../../../../validators/createErrorMessageWithValidators';
import { funnelValidators } from '../../funnel/funnel.validators';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';
import * as S from './SpaceDetailElement.styles';

const SpaceDetailElement = ({
  onNext,
  initialValue = { profileImage: [], email: '', instagram: '' },
}: FunnelElementProps<SpaceDetailElementInfos>) => {
  const { localFiles, previewFiles, handleFilesUploadClick, clearLocalFiles } =
    useLocalFile({
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
  const { trackClick } = useButtonTracking({ userType: 'host' });
  const isDisabled = isEmailError || isInstagramError;

  const handlePhotoUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    trackClick('crate_space_photo_upload', {
      page: '/host/create-space',
    });
    handleFilesUploadClick(event);
  };

  return (
    <FunnelBasePage
      title={INFORMATION.SPACE_CREATE.DETAIL.TITLE}
      description={INFORMATION.SPACE_CREATE.DETAIL.DESCRIPTION}
      element={
        <S.Wrapper>
          <S.ImageUploadContainer>
            <PhotoPreviewButton
              type="button"
              previewFile={previewFiles}
              uploadImage={handlePhotoUploadClick}
              clearFiles={() => {
                trackClick('create_space_photo_delete', {
                  page: '/host/create-space',
                });
                clearFiles(localFiles);
                clearLocalFiles();
              }}
              deleteImage={() => {}}
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
              maxLength={CONSTRAINTS.MAX_LENGTH.SPACE.EMAIL}
            />
            <TextInput
              label="Instagram ID"
              placeholder="forgather_official"
              name="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              errorMessage={instagramErrorMessage}
              maxLength={CONSTRAINTS.MAX_LENGTH.SPACE.INSTAGRAM_USERNAME}
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
