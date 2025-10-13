import GuestbookCard from './card/GuestbookCard';
import * as S from './GuestbookListPage.styles';

const GuestbookListPage = () => {
  return (
    <S.Wrapper>
      <S.InfoContainer>
        <S.Title>밍고의 전시회 방명록</S.Title>
        <S.Description>28명 참여</S.Description>
      </S.InfoContainer>
      <S.ListContainer>
        <GuestbookCard guestName={'밍고'} hasPhoto={true} isNew={true} />
        <GuestbookCard guestName={'블루블루'} hasPhoto={true} isNew={true} />
        <GuestbookCard guestName={'퐁퐁쥬'} hasPhoto={true} isNew={true} />
        <GuestbookCard guestName={'루나'} hasPhoto={true} isNew={true} />
      </S.ListContainer>
    </S.Wrapper>
  );
};

export default GuestbookListPage;
