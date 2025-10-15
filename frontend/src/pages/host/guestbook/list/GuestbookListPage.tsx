import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/@common/buttons/button/Button';
import useGuestbookList from '../../../../hooks/domain/guestbook/useGuestbookList';
import useSpaceInfo from '../../../../hooks/domain/space/useSpaceInfo';
import GuestbookElement from './element/GuestbookElement';
import * as S from './GuestbookListPage.styles';

const GuestbookListPage = () => {
  const navigate = useNavigate();
  const { spaceCode = '' } = useParams();
  const { spaceInfo } = useSpaceInfo({ spaceCode });
  const { guestbookList, totalCount, fetchNextPage } =
    useGuestbookList(spaceCode);

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
            onClick={() => navigate(String(card.id))}
          />
        ))}
      </S.ListContainer>

      <Button text="다음" variant="primary" onClick={() => fetchNextPage()} />
    </S.Wrapper>
  );
};

export default GuestbookListPage;
