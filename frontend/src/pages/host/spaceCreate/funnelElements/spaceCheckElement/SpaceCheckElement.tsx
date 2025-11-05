import defaultImage from '../../../../../@assets/images/default-forgather-image.png';
import InfoRow from '../../../../../components/specific/infoRow/InfoRow';
import { INFORMATION } from '../../../../../constants/messages';
import useButtonTracking from '../../../../../hooks/@common/useButtonTracking';
import { useSpaceCreate } from '../../../../../hooks/domain/space/useSpaceCreate';
import type {
  CreateFunnelForm,
  FunnelElementProps,
} from '../../../../../types/funnel.type';
import { Thumbnail } from '../../../../MainPage.common.styles';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';
import * as S from './SpaceCheckElement.styles';

interface SpaceCheckElementProps extends FunnelElementProps<boolean> {
  createFunnelForm: CreateFunnelForm;
}

const SpaceCheckElement = ({ createFunnelForm }: SpaceCheckElementProps) => {
  const { createSpace, isCreating } = useSpaceCreate();
  const { trackClick } = useButtonTracking({ userType: 'host' });

  const matchThumbnailImage =
    createFunnelForm.profileImage[0]?.previewUrl || defaultImage;

  const visibility = (() => {
    switch (createFunnelForm.visibility) {
      case 'PUBLIC':
        return '공개';
      case 'PRIVATE':
        return '비공개';
      default:
        return '알 수 없음';
    }
  })();

  const handleCreateSpace = (form: CreateFunnelForm) => {
    trackClick('space_create_funnel_complete', {
      page: '/space/create',
      spaceNameLength: form.name.length,
      visibility: form.visibility,
      descriptionLength: form.description.length,
      hasProfileImage: form.profileImage.length > 0,
      hasEmail: form.email.length > 0,
      hasInstagram: form.instagram.length > 0,
    });
    createSpace(form);
  };

  return (
    <FunnelBasePage
      title={INFORMATION.SPACE_CREATE.CHECK.TITLE}
      description={INFORMATION.SPACE_CREATE.CHECK.DESCRIPTION}
      element={
        <S.Wrapper>
          <Thumbnail src={matchThumbnailImage} />
          <S.InfoRowContainer>
            <InfoRow label="스페이스 이름" value={createFunnelForm.name} />
            <InfoRow label="방명록 공개 범위" value={visibility} />
            <InfoRow
              label="스페이스 설명"
              value={createFunnelForm.description}
            />
            <InfoRow label="E-mail" value={createFunnelForm.email} />
            <InfoRow label="Instagram" value={createFunnelForm.instagram} />
          </S.InfoRowContainer>
        </S.Wrapper>
      }
      onNextButtonClick={() => handleCreateSpace(createFunnelForm)}
      buttonText={isCreating ? '생성 중...' : '스페이스 생성하기'}
      nextButtonDisabled={isCreating}
    />
  );
};

export default SpaceCheckElement;
