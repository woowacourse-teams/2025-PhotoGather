import { Activity } from 'react';
import { useParams } from 'react-router-dom';
import LoadingModal from '../../../../components/specific/modal/loadingModal/LoadingModal';
import useConfirmBeforeRefresh from '../../../../hooks/@common/useConfirmBeforeRefresh';
import useFormFunnel from '../../../../hooks/domain/funnel/useFormFunnel';
import usePostGuestbook from '../../../../hooks/domain/guestbook/usePostGuestbook';
import useSpaceInfo from '../../../../hooks/domain/space/useSpaceInfo';
import { DividerLine } from '../../../../styles/@common/DividerLine.styles';
import type { GuestbookFunnelInfo } from '../../../../types/domain/guestbook.type';
import { buildOriginalImageUrl } from '../../../../utils/buildImageUrl';
import MessageElement from '../funnelElements/messageElement/MessageElement';
import NicknameElement from '../funnelElements/nicknameElement/NicknameElement';
import PhotosElement from '../funnelElements/photosElement/PhotosElement';
import * as S from './GuestbookFunnel.styles';

type STEP = 'nickname' | 'message' | 'photos';

const initialFunnelValue: GuestbookFunnelInfo = {
  nickname: '',
  message: '',
  photos: [],
};

const GuestBookFunnel = () => {
  useConfirmBeforeRefresh();

  const Funnel = useFormFunnel<STEP, GuestbookFunnelInfo>(
    'nickname',
    initialFunnelValue,
  );

  const { spaceCode } = useParams<{ spaceCode: string }>();
  const { spaceInfo, isLoading: isLoadingSpaceInfo } = useSpaceInfo({
    spaceCode: spaceCode ?? '',
  });

  const receiver = spaceInfo.name || '방명록 주인장';
  const thumbnailUrl = spaceInfo.spacePhoto.isExists
    ? buildOriginalImageUrl(spaceInfo.spacePhoto.path)
    : '';

  const { submitForm, isLoading } = usePostGuestbook({
    spaceCode: spaceCode ?? '',
    receiver: receiver,
    formData: {
      nickname: Funnel.form.nickname,
      message: Funnel.form.message,
      photos: Funnel.form.photos,
    },
  });

  if (isLoadingSpaceInfo) {
    return <LoadingModal isOpen={true} text="로딩 중..." />;
  }

  return (
    <>
      <LoadingModal isOpen={isLoading} text="전송 중..." />
      <S.Wrapper>
        <S.DisplayInfoContainer>
          <S.DisplayImage src={thumbnailUrl} alt="전시 썸네일 이미지" />
          <S.DisplayName>{spaceInfo.name}</S.DisplayName>
        </S.DisplayInfoContainer>
        <DividerLine width="15%" />
        <Activity
          mode={Funnel.funnelStep === 'nickname' ? 'visible' : 'hidden'}
        >
          <NicknameElement
            receiver={receiver}
            initialValue={Funnel.form.nickname}
            onNext={(nickname) =>
              Funnel.goNextWithData('message', { nickname })
            }
          />
        </Activity>
        <Activity mode={Funnel.funnelStep === 'message' ? 'visible' : 'hidden'}>
          <MessageElement
            receiver={receiver}
            initialValue={Funnel.form.message}
            onNext={(message) => Funnel.goNextWithData('photos', { message })}
          />
        </Activity>
        <Activity mode={Funnel.funnelStep === 'photos' ? 'visible' : 'hidden'}>
          <PhotosElement
            receiver={receiver}
            onNextButtonClick={(photos) => submitForm(photos)}
            initialLocalFiles={Funnel.form.photos}
          />
        </Activity>
      </S.Wrapper>
    </>
  );
};

export default GuestBookFunnel;
