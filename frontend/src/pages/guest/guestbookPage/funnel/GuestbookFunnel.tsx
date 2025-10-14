import useConfirmBeforeRefresh from '../../../../hooks/@common/useConfirmBeforeRefresh';
import useFormFunnel from '../../../../hooks/domain/funnel/useFormFunnel';
import { DividerLine } from '../../../../styles/@common/DividerLine.styles';
import type { GuestbookFunnelInfo } from '../../../../types/domain/guestbook.type';
import { mockData } from '../../../mockData';
import MessageElement from '../funnelElements/messageElement/MessageElement';
import NicknameElement from '../funnelElements/nicknameElement/NicknameElement';
import * as S from './GuestbookFunnel.styles';

type STEP = 'message' | 'photos' | 'nickname';

const initialFunnelValue: GuestbookFunnelInfo = {
  message: '',
  photos: [],
  nickname: '',
};

const GuestBookFunnel = () => {
  useConfirmBeforeRefresh();
  const MOCK_RECEIVER = '방명록 주인장';

  const Funnel = useFormFunnel<STEP, GuestbookFunnelInfo>(
    'message',
    initialFunnelValue,
  );

  return (
    <S.Wrapper>
      <S.DisplayInfoContainer>
        <S.DisplayImage src={mockData.thumbnail} alt="전시 썸네일 이미지" />
        <S.DisplayName>{mockData.title}</S.DisplayName>
      </S.DisplayInfoContainer>
      <DividerLine width="15%" />
      <Funnel.Step name="message">
        <MessageElement
          receiver={MOCK_RECEIVER}
          initialValue={Funnel.form.message}
          // TODO : photos 단계로 변경
          onNext={(message) => Funnel.goNextWithData('nickname', { message })}
        />
      </Funnel.Step>
      <Funnel.Step name="nickname">
        <NicknameElement
          receiver={MOCK_RECEIVER}
          initialValue={Funnel.form.nickname}
          onNext={(nickname) => Funnel.goNextWithData('photos', { nickname })}
        />
      </Funnel.Step>
    </S.Wrapper>
  );
};

export default GuestBookFunnel;
