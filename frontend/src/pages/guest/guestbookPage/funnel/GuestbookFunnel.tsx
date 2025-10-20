import { useParams } from 'react-router-dom';
import LoadingModal from '../../../../components/specific/modal/loadingModal/LoadingModal';
import useConfirmBeforeRefresh from '../../../../hooks/@common/useConfirmBeforeRefresh';
import useFormFunnel from '../../../../hooks/domain/funnel/useFormFunnel';
import usePostGuestbook from '../../../../hooks/domain/guestbook/usePostGuestbook';
import { DividerLine } from '../../../../styles/@common/DividerLine.styles';
import type { GuestbookFunnelInfo } from '../../../../types/domain/guestbook.type';
import { mockData } from '../../../mockData';
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
  const MOCK_RECEIVER = '방명록 주인장';

  const Funnel = useFormFunnel<STEP, GuestbookFunnelInfo>(
    'nickname',
    initialFunnelValue,
  );

  const { spaceCode } = useParams<{ spaceCode: string }>();

  const { submitForm, isLoading } = usePostGuestbook({
    spaceCode: spaceCode ?? '',
    receiver: MOCK_RECEIVER,
    formData: {
      nickname: Funnel.form.nickname,
      message: Funnel.form.message,
      photos: Funnel.form.photos,
    },
  });

  return (
    <>
      <LoadingModal isOpen={isLoading} text="전송 중..." />
      <S.Wrapper>
        <S.DisplayInfoContainer>
          <S.DisplayImage src={mockData.thumbnail} alt="전시 썸네일 이미지" />
          <S.DisplayName>{mockData.title}</S.DisplayName>
        </S.DisplayInfoContainer>
        <DividerLine width="15%" />
        <Funnel.Step name="nickname">
          <NicknameElement
            receiver={MOCK_RECEIVER}
            initialValue={Funnel.form.nickname}
            onNext={(nickname) => Funnel.goNextWithData('message', { nickname })}
          />
        </Funnel.Step>
        <Funnel.Step name="message">
          <MessageElement
            receiver={MOCK_RECEIVER}
            initialValue={Funnel.form.message}
            onNext={(message) => Funnel.goNextWithData('photos', { message })}
          />
        </Funnel.Step>
        <Funnel.Step name="photos">
          <PhotosElement
            receiver={MOCK_RECEIVER}
            onNextButtonClick={(photos) => submitForm(photos)}
            initialLocalFiles={Funnel.form.photos}
          />
        </Funnel.Step>
      </S.Wrapper>
    </>
  );
};

export default GuestBookFunnel;
