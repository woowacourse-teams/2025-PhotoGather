import { useNavigate, useParams } from 'react-router-dom';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import useSpaceInfo from '../../../../hooks/domain/space/useSpaceInfo';
import GuestbookElement from './element/GuestbookElement';
import * as S from './GuestbookListPage.styles';

const GuestbookListPage = () => {
  const navigate = useNavigate();
  const { spaceCode } = useParams();
  const { spaceInfo } = useSpaceInfo({ spaceCode: spaceCode ?? '' });
  const { guestbookList } = useGuestbookList({
    spaceCode: spaceCode ?? '',
    options: {
      page: 1,
      size: 15,
    },
  });
  const guestbookCards = guestbookList.guestBookCards;

  return (
    <S.Wrapper>
      <S.InfoContainer>
        <S.Title>{spaceInfo.name}</S.Title>
        <S.Description>{guestbookList.totalCount}명 참여</S.Description>
      </S.InfoContainer>
      <S.ListContainer>
        {guestbookCards.map((card) => (
          <GuestbookElement
            key={card.id}
            guestName={card.nickname}
            hasPhoto={card.containsPhoto}
            isRead={card.isRead}
            onClick={() => {
              navigate(String(card.id));
            }}
          />
        ))}
      </S.ListContainer>
    </S.Wrapper>
  );
};

export default GuestbookListPage;
