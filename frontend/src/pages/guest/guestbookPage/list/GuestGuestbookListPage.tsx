import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import useIntersectionObserver from '../../../../hooks/@common/useIntersectionObserver';
import useSpaceInfoContext from '../../../../hooks/context/useSpaceInfoContext';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import type { GuestbookElement as GuestbookElementType } from '../../../../types/domain/guestbook.type';
import GuestGuestbookElement from './element/GuestGuestbookElement';
import * as S from './GuestGuestbookListPage.styles';

const GuestGuestbookListPage = () => {
  const navigate = useNavigate();
  const { spaceCode = '' } = useParams();
  const { spaceInfo } = useSpaceInfoContext();
  const { guestbookList, totalCount, fetchNextPage } =
    useGuestbookList(spaceCode);
  const { targetRef, isIntersecting } = useIntersectionObserver({});
  const { trackClick } = useButtonTracking({ userType: 'guest', spaceCode });

  // biome-ignore lint/correctness/useExhaustiveDependencies: isIntersecting에만 의존
  useEffect(() => {
    if (isIntersecting) fetchNextPage();
  }, [isIntersecting]);

  const handleClickGuestbook = (card: GuestbookElementType) => {
    trackClick('guest_guestbook_list_card_click', {
      hasPhoto: card.containsPhoto,
    });
    navigate(String(card.id));
  };

  return (
    <S.Wrapper>
      <S.InfoContainer>
        <S.Title>{spaceInfo.name}</S.Title>
        <S.Description>{totalCount}명 참여</S.Description>
      </S.InfoContainer>

      <S.ListContainer>
        {guestbookList.map((card) => (
          <GuestGuestbookElement
            key={card.id}
            guestName={card.nickname}
            hasPhoto={card.containsPhoto}
            isRead={card.isRead}
            onClick={() => handleClickGuestbook(card)}
          />
        ))}
      </S.ListContainer>
      <S.IntersectionArea ref={targetRef} />
    </S.Wrapper>
  );
};

export default GuestGuestbookListPage;
