import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import useIntersectionObserver from '../../../../hooks/@common/useIntersectionObserver';
import useSpaceInfoContext from '../../../../hooks/context/useSpaceInfoContext';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import type { GuestbookElement as GuestbookElementType } from '../../../../types/domain/guestbook.type';
import GuestbookElement from './element/GuestbookElement';
import * as S from './GuestbookListPage.styles';

const GuestbookListPage = () => {
  const navigate = useNavigate();
  const { spaceCode = '' } = useParams();
  const { spaceInfo } = useSpaceInfoContext();
  const { guestbookList, totalCount, fetchNextPage } =
    useGuestbookList(spaceCode);
  const { targetRef, isIntersecting } = useIntersectionObserver({});
  const { trackClick } = useButtonTracking({ userType: 'host', spaceCode });

  // biome-ignore lint/correctness/useExhaustiveDependencies: isIntersecting에만 의존
  useEffect(() => {
    if (isIntersecting) fetchNextPage();
  }, [isIntersecting]);

  const handleClickAddGuestbook = (card: GuestbookElementType) => {
    trackClick('host_guestbook_list_add_click', {
      hasPhoto: card.containsPhoto,
      isRead: card.isRead,
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
          <GuestbookElement
            key={card.id}
            guestName={card.nickname}
            hasPhoto={card.containsPhoto}
            isRead={card.isRead}
            onClick={() => handleClickAddGuestbook(card)}
          />
        ))}
      </S.ListContainer>
      <S.IntersectionArea ref={targetRef} />
    </S.Wrapper>
  );
};

export default GuestbookListPage;
