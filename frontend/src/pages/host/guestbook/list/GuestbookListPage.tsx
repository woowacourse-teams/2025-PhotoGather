import { mockGuestbookCards } from '../../../mockData';
import GuestbookElement from './element/GuestbookElement';
import * as S from './GuestbookListPage.styles';

const GuestbookListPage = () => {
  const guestbookCardsResponse = mockGuestbookCards;

  return (
    <S.Wrapper>
      <S.InfoContainer>
        <S.Title>밍고의 전시회 방명록</S.Title>
        <S.Description>
          {guestbookCardsResponse.guestBookCards.length}명 참여
        </S.Description>
      </S.InfoContainer>
      <S.ListContainer>
        {guestbookCardsResponse.guestBookCards.map((card) => (
          <GuestbookElement
            key={card.id}
            guestName={card.nickname}
            hasPhoto={card.containsPhoto}
            isRead={card.isRead}
          />
        ))}
      </S.ListContainer>
    </S.Wrapper>
  );
};

export default GuestbookListPage;
