import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import useSpaceInfo from '../../../../hooks/domain/space/useSpaceInfo';
import GuestbookElement from './element/GuestbookElement';
import * as S from './GuestbookListPage.styles';

const GuestbookListPage = () => {
  const spaceCode = '3ad5eae6fb';
  const { spaceInfo } = useSpaceInfo({ spaceCode: spaceCode ?? '' });
  const { guestbookList } = useGuestbookList({
    spaceCode: spaceCode ?? '',
    options: {
      page: 1,
      size: 15,
    },
  });

  return (
    <S.Wrapper>
      <S.InfoContainer>
        <S.Title>{spaceInfo.name}</S.Title>
        <S.Description>{guestbookList.length}명 참여</S.Description>
      </S.InfoContainer>
      <S.ListContainer>
        {guestbookList.map((card) => (
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
